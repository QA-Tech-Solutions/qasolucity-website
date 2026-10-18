// Mirror of qasolucity-automation's scripts/summarize-error.mjs - keep the
// two in step. The automation repo summarizes every failure before
// reporting it; this copy runs over stored history on read, so runs
// reported before that change (raw Playwright errors with code frames,
// runner paths, selectors and call logs) never reach the public dashboard
// either. Summaries are idempotent, so already-clean messages pass through
// unchanged. The behaviour is pinned by that repo's fixture-based tests
// (scripts/summarize-error.test.mjs).

const ANSI_PATTERN = /\x1b\[[0-9;]*m/g;
const MAX_LENGTH = 300;

/** `errors`: every error Playwright recorded for the result, in order. */
export function summarizeError(errors: string[] | string): string {
  const list = (Array.isArray(errors) ? errors : [errors])
    .filter((e) => typeof e === "string" && e.trim())
    .map((e) => e.replace(ANSI_PATTERN, ""));
  if (list.length === 0) return "Test failed without an error message.";

  let summary: string;
  const testTimeout = list[0].match(/^Test timeout of (\d+)ms exceeded\.?\s*$/);
  if (testTimeout) {
    // Playwright follows a test timeout with the error from whatever step
    // was still running - that's the useful part.
    const stuckOn = list[1] ? describeStuckStep(list[1]) : null;
    summary = `Test did not finish within ${formatMs(testTimeout[1])}${stuckOn ? ` - ${stuckOn}` : ""}.`;
  } else {
    summary = summarizeOne(list[0]);
  }
  if (list.length > 1 && !testTimeout) {
    summary = `${stripPeriod(summary)} (+${list.length - 1} more ${list.length === 2 ? "failure" : "failures"} in this test).`;
  }
  return finalize(summary);
}

function summarizeOne(raw: string): string {
  const text = raw.trim();
  const lines = text.split("\n");
  const header = lines[0].replace(/^Error:\s*/, "").trim();
  const fields = parseFields(lines);

  // Accessibility (accessibility.spec.ts): the custom message is one line
  // per violation, "rule (impact): help — N node(s)".
  const axe = [...text.matchAll(/^(?:Error:\s*)?[\w-]+ \((minor|moderate|serious|critical)\): (.+?) — (\d+) node\(s\)$/gm)];
  if (axe.length > 0) {
    const [, impact, help, count] = axe[0];
    const more = axe.length > 1 ? ` (+${axe.length - 1} more accessibility ${axe.length === 2 ? "issue" : "issues"})` : "";
    return `Accessibility (${impact}): ${stripPeriod(help)} - ${plural(Number(count), "element")} affected${more}.`;
  }

  // Locator assertions: expect(locator).toBeVisible() failed, expect(page).toHaveURL(...) failed
  const locatorAssertion = header.match(/^expect\((locator|page)\)\.(not\.)?(\w+)\(.*?\) failed$/);
  if (locatorAssertion) {
    return describeLocatorAssertion(locatorAssertion[3], Boolean(locatorAssertion[2]), fields, text);
  }

  // Value assertions without a custom message: expect(received).toBe(expected)
  const valueAssertion = header.match(/^expect\(received\)\.(not\.)?(\w+)\(/);
  if (valueAssertion) {
    return (
      describeValueAssertion(valueAssertion[2], Boolean(valueAssertion[1]), fields, lines, text) ??
      `${stripPeriod(sanitize(header))}.`
    );
  }

  // Value assertions with a custom message: the message is the header and
  // the matcher line follows it.
  const matcherLine = lines.find((l) => /^\s*expect\(received\)\./.test(l));
  if (matcherLine) {
    const m = matcherLine.match(/expect\(received\)\.(not\.)?(\w+)\(/);
    const message = stripPeriod(sanitize(header));
    let detail = m ? describeValueAssertion(m[2], Boolean(m[1]), fields, lines, text, true) : null;
    // seo.spec.ts builds its message from the very items it lists - don't say it twice.
    if (detail && message.startsWith(stripPeriod(detail).replace(/…$/, "").slice(0, 40))) detail = null;
    return `${message}${detail ? ` (${detail})` : ""}.`;
  }

  // Actions: locator.click / page.goto / apiRequestContext.get ...
  const action = header.match(/^(?:TimeoutError:\s*)?(locator|page|frame|apiRequestContext|elementHandle)\.(\w+): (.*)$/);
  if (action) return describeAction(action[1], action[2], action[3], text);

  if (/strict mode violation/.test(header)) return describeStrictMode(header);
  if (/Target page, context or browser has been closed/.test(text)) {
    return "The browser page closed before the test finished.";
  }
  if (/browserType\.launch|Executable doesn't exist/.test(text)) {
    return "The browser could not be started on the test runner.";
  }
  if (/worker process exited unexpectedly|Worker (?:process )?crashed/i.test(text)) {
    return "The test runner crashed while running this test.";
  }
  if (/toHaveScreenshot|Screenshot comparison failed/.test(text)) {
    const px = text.match(/(\d+) pixels/);
    return `The page no longer matches its approved screenshot${px ? ` (${px[1]} pixels differ)` : ""}.`;
  }

  // A JavaScript error inside the test itself - a test bug, not a site bug.
  const jsError = lines[0].match(/^(TypeError|ReferenceError|SyntaxError|RangeError):/);
  if (jsError) {
    return `The test code itself crashed (${jsError[1]}) - most likely a problem in the test, not the site.`;
  }

  // A custom thrown Error or anything unrecognised: keep the first line,
  // cleaned up. Messages the team writes are meant to be read.
  return `${stripPeriod(sanitize(header)) || "Test failed"}.`;
}

// ---- locator assertions -------------------------------------------------

function describeLocatorAssertion(matcher: string, negated: boolean, fields: Fields, text: string): string {
  const target = fields.Locator ? describeLocator(fields.Locator) : "the element";
  const Target = capitalize(target);
  const waited = fields.Timeout ? ` (waited ${formatMs(fields.Timeout)})` : "";
  const expected = fields["Expected substring"] ?? fields["Expected pattern"] ?? fields.Expected;
  const received = fields["Received string"] ?? fields.Received;
  const notFound = /element\(s\) not found/.test(text);

  if (matcher === "toHaveURL") {
    const actual = pathOnly(received);
    return `Page address should ${negated ? "not " : ""}match ${quoteish(expected)}, but was ${actual === "a blank page" ? actual : quoteish(actual)}${waited}.`;
  }
  if (matcher === "toHaveTitle") {
    return `Page title should ${negated ? "not " : ""}be ${quoteish(expected)}, but was ${quoteish(received)}.`;
  }

  if (notFound) {
    if (negated || matcher === "toBeHidden") return `${Target} was expected to be absent - it was not found, so this check should normally pass.`;
    return `${Target} was not found on the page${waited}.`;
  }

  switch (matcher) {
    case "toBeVisible":
      return negated
        ? `${Target} should be hidden, but it is visible.`
        : `${Target} is on the page but not visible${waited}.`;
    case "toBeHidden":
      return `${Target} should be hidden, but it is visible.`;
    case "toBeEnabled":
    case "toBeDisabled":
    case "toBeChecked":
    case "toBeEditable":
    case "toBeFocused":
    case "toBeEmpty":
    case "toBeAttached":
    case "toBeInViewport": {
      const state = STATE_WORDS[matcher];
      const actual = received ? humanizeState(received) : `not ${state}`;
      return negated
        ? `${Target} should not be ${state}, but it is.`
        : `${Target} should be ${state}, but it is ${actual}.`;
    }
    case "toContainText":
      return `${Target} should ${negated ? "not " : ""}contain ${quoteish(expected)}, but shows ${quoteish(received)}.`;
    case "toHaveText":
      return `${Target} should ${negated ? "not " : ""}read ${quoteish(expected)}, but reads ${quoteish(received)}.`;
    case "toHaveCount":
      return `Expected ${expected} of ${target}, but found ${received}.`;
    case "toHaveAttribute":
      if (/link/.test(target) && /^"?[/#]/.test(expected ?? "")) {
        return `${Target} should link to ${quoteish(expected)}, but links to ${quoteish(received)}.`;
      }
      return `${Target} has the wrong attribute value: expected ${quoteish(expected)}, got ${quoteish(received)}.`;
    case "toHaveValue":
      if (expected === '""') return `${Target} should be empty, but contains ${quoteish(received)}.`;
      return `${Target} should contain ${quoteish(expected)}, but contains ${quoteish(received)}.`;
    case "toHaveCSS":
      return `${Target} has the wrong style: expected ${quoteish(expected)}, got ${quoteish(received)}.`;
    case "toHaveClass":
      return `${Target} has the wrong CSS class: expected ${quoteish(expected)}, got ${quoteish(received)}.`;
    case "toHaveAccessibleName":
    case "toHaveAccessibleDescription":
      return `${Target} has the wrong accessible label: expected ${quoteish(expected)}, got ${quoteish(received)}.`;
    default:
      return expected !== undefined && received !== undefined
        ? `${Target}: expected ${quoteish(expected)}, got ${quoteish(received)}.`
        : `${Target} did not pass the "${matcher}" check${waited}.`;
  }
}

const STATE_WORDS: Record<string, string> = {
  toBeEnabled: "enabled",
  toBeDisabled: "disabled",
  toBeChecked: "checked",
  toBeEditable: "editable",
  toBeFocused: "focused",
  toBeEmpty: "empty",
  toBeAttached: "attached to the page",
  toBeInViewport: "scrolled into view",
};

function humanizeState(received: string): string {
  if (/viewport ratio/.test(received)) return "outside the visible area";
  return received.replace(/^"|"$/g, "");
}

// ---- value assertions ---------------------------------------------------

function describeValueAssertion(
  matcher: string,
  negated: boolean,
  fields: Fields,
  lines: string[],
  text: string,
  hasCustomMessage = false,
): string | null {
  const expected = fields.Expected;
  const received = fields.Received;
  const polled = /waiting on the predicate/.test(text) ? " after retrying" : "";

  // toEqual([]) with a list received - the list IS the finding (broken
  // links, console errors, duplicate titles...). Show its items.
  const items = receivedArrayItems(lines);
  if (items && (matcher === "toEqual" || matcher === "toStrictEqual")) {
    if (items.objects) {
      return hasCustomMessage ? plural(items.count, "issue") + " found" : `Expected no issues, but found ${items.count}`;
    }
    const shown = items.values.slice(0, 3).map((v) => describeListItem(v)).join("; ");
    const rest = items.values.length > 3 ? `; +${items.values.length - 3} more` : "";
    return hasCustomMessage ? `${shown}${rest}` : `Expected no items, but found ${items.values.length}: ${shown}${rest}.`;
  }

  const comparison = {
    toBeGreaterThan: "greater than",
    toBeGreaterThanOrEqual: "at least",
    toBeLessThan: "less than",
    toBeLessThanOrEqual: "at most",
  }[matcher];
  if (comparison && received !== undefined) {
    const limit = (expected ?? "").replace(/^[<>]=?\s*/, "");
    // The smoke/redirect/link specs compare HTTP status codes against 400.
    if (hasCustomMessage && /^[1-5]\d\d$/.test(received) && limit === "400") return `got HTTP ${received}`;
    if (hasCustomMessage) return `got ${received}, expected ${comparison} ${limit}`;
    return `Expected a value ${comparison} ${limit}, but got ${received}${polled}.`;
  }

  if ((matcher === "toBeNull" || matcher === "toBeTruthy" || matcher === "toBeDefined") && received !== undefined) {
    const want = negated && matcher === "toBeNull" ? "a value" : matcher === "toBeTruthy" ? "a value" : "nothing";
    if (hasCustomMessage) return `got ${received}`;
    return `Expected ${want}, but got ${received}.`;
  }
  if (matcher === "toBeFalsy" && received !== undefined) {
    return hasCustomMessage ? `got ${received}` : `Expected no value, but got ${quoteish(received)}.`;
  }

  if (matcher === "toHaveLength" && received !== undefined) {
    const got = fields["Received length"] ?? received;
    return hasCustomMessage ? `length ${got}, expected ${fields["Expected length"] ?? expected}` : `Expected ${fields["Expected length"] ?? expected} items, but got ${got}.`;
  }

  if (expected !== undefined && received !== undefined) {
    const e = quoteish(fields["Expected substring"] ?? fields["Expected pattern"] ?? expected);
    const r = quoteish(received);
    if (hasCustomMessage) return `expected ${e}, got ${r}`;
    const verb = negated ? "Expected anything but" : "Expected";
    return `${verb} ${e}, but got ${r}${polled}.`;
  }

  if (hasCustomMessage) return null;
  return `The "${matcher}" check failed${polled}.`;
}

/** Items of a "+ Array [ ... ]" received block, from a Jest-style diff. */
function receivedArrayItems(
  lines: string[],
): { objects: true; count: number } | { objects: false; values: string[] } | null {
  const start = lines.findIndex((l) => /^\+\s*Array \[/.test(l.trim()));
  if (start === -1) return null;
  const values: string[] = [];
  let objects = 0;
  let depth = 0;
  for (const line of lines.slice(start + 1)) {
    const body = line.trim().replace(/^\+\s?/, "").trim();
    if (!line.trim().startsWith("+")) break;
    if (depth === 0 && body === "]") break;
    if (/^Object \{$/.test(body)) {
      if (depth === 0) objects += 1;
      depth += 1;
      continue;
    }
    if (/^\},?$/.test(body)) {
      depth -= 1;
      continue;
    }
    if (depth === 0) {
      const str = body.match(/^"(.*)",?$/);
      if (str) values.push(str[1].replace(/\\"/g, '"'));
    }
  }
  if (objects > 0) return { objects: true, count: objects };
  return values.length > 0 ? { objects: false, values } : null;
}

function describeListItem(value: string): string {
  // "Error: Minified React error #418; visit https://react.dev/errors/418..."
  const react = value.match(/Minified React error #(\d+)/);
  if (react) return `React error #${react[1]}${REACT_ERRORS[react[1]] ? `: ${REACT_ERRORS[react[1]]}` : ""}`;
  return truncate(sanitize(value.replace(/^Error:\s*/, "")), 120);
}

// The minified React errors a production build can realistically throw.
const REACT_ERRORS: Record<string, string> = {
  418: "server and browser rendered different content",
  419: "server rendering failed, fell back to the browser",
  421: "content updated before the page finished loading",
  422: "server and browser rendered different content",
  423: "server and browser rendered different content",
  425: "server and browser rendered different text",
  185: "infinite update loop",
  301: "too many re-renders",
  310: "components rendered in an unexpected order",
};

// ---- actions ------------------------------------------------------------

const NET_ERRORS: Record<string, string> = {
  ERR_NAME_NOT_RESOLVED: "the address could not be found",
  ERR_CONNECTION_REFUSED: "the server refused the connection",
  ERR_CONNECTION_RESET: "the connection was reset",
  ERR_CONNECTION_CLOSED: "the connection was closed",
  ERR_CONNECTION_TIMED_OUT: "the connection timed out",
  ERR_TIMED_OUT: "the request timed out",
  ERR_INTERNET_DISCONNECTED: "the test runner had no internet connection",
  ERR_NETWORK_CHANGED: "the network changed mid-request",
  ERR_TOO_MANY_REDIRECTS: "the page redirects in a loop",
  ERR_ABORTED: "the page load was interrupted",
  ERR_EMPTY_RESPONSE: "the server sent an empty response",
  ERR_HTTP2_PROTOCOL_ERROR: "the server sent a malformed response",
  ERR_SSL_PROTOCOL_ERROR: "there was an SSL/HTTPS problem",
  ERR_UNSAFE_PORT: "the address uses a blocked port",
  ENOTFOUND: "the address could not be found",
  ECONNREFUSED: "the server refused the connection",
  ECONNRESET: "the connection was reset",
  ETIMEDOUT: "the request timed out",
  EPIPE: "the connection was closed",
  "socket hang up": "the server closed the connection",
};

const ACTION_VERBS: Record<string, string> = {
  click: "click",
  dblclick: "double-click",
  fill: "fill in",
  type: "type into",
  pressSequentially: "type into",
  press: "press a key on",
  check: "tick",
  uncheck: "untick",
  setChecked: "tick",
  selectOption: "choose an option in",
  hover: "hover over",
  focus: "focus",
  tap: "tap",
  setInputFiles: "upload a file to",
  dragTo: "drag",
  scrollIntoViewIfNeeded: "scroll to",
  textContent: "read the text of",
  innerText: "read the text of",
  getAttribute: "read",
  waitFor: "wait for",
  screenshot: "screenshot",
};

function describeAction(object: string, method: string, rest: string, text: string): string {
  const url = text.match(/(?:navigating to|→ \w+) "?(\S+?)"?(?:,|\s|$)/)?.[1] ?? rest.match(/ at (\S+)$/)?.[1];
  const where = url ? pathOnly(url) : null;

  if (object === "page" && /^(goto|reload|goBack|goForward|waitForURL|waitForNavigation|waitForLoadState)$/.test(method)) {
    const timeout = rest.match(/Timeout (\d+)ms exceeded/);
    if (method === "waitForURL" || method === "waitForNavigation") {
      return timeout
        ? `The page did not reach the expected address within ${formatMs(timeout[1])}.`
        : `The page did not reach the expected address.`;
    }
    if (timeout) return `${where ? `${where} ` : "The page "}did not finish loading within ${formatMs(timeout[1])}.`;
    const reason = networkReason(rest);
    return `Could not load ${where ?? "the page"}${reason ? `: ${reason}` : ""}.`;
  }

  if (object === "apiRequestContext") {
    const verb = method.toUpperCase();
    const timeout = rest.match(/Timeout (\d+)ms exceeded/);
    const reason = timeout ? `no response within ${formatMs(timeout[1])}` : networkReason(rest);
    return `${verb} request${where ? ` to ${where}` : ""} failed${reason ? `: ${reason}` : ""}.`;
  }

  if (/strict mode violation/.test(rest)) return describeStrictMode(rest);

  const locatorText = text.match(/waiting for (.+?)\s*$/m)?.[1];
  const target = locatorText ? describeLocator(locatorText) : "the element";
  const verb = ACTION_VERBS[method] ?? method;
  const timeout = rest.match(/Timeout (\d+)ms exceeded/);
  const waited = timeout ? ` (waited ${formatMs(timeout[1])})` : "";
  return `Could not ${verb} ${target}: ${actionBlocker(text)}${waited}.`;
}

/** What stopped an action, read from Playwright's call log. */
function actionBlocker(text: string): string {
  if (/element is not enabled|element is disabled/.test(text)) return "it stayed disabled";
  if (/element is not visible/.test(text)) return "it was not visible";
  if (/element is outside of the viewport/.test(text)) return "it was outside the visible area";
  if (/intercepts pointer events/.test(text)) return "another element was covering it";
  if (/element is not stable/.test(text)) return "it kept moving (still animating)";
  if (/element is not editable|readonly/.test(text)) return "it is read-only";
  if (/not an <input>|Element is not an <input>/.test(text)) return "it is not a form field";
  if (/element is detached|not attached to the DOM/.test(text)) return "it disappeared from the page";
  if (/locator resolved to/.test(text)) return "it never became ready";
  return "it was not found on the page";
}

function networkReason(text: string): string | null {
  for (const [code, reason] of Object.entries(NET_ERRORS)) {
    if (text.includes(code)) return reason;
  }
  const cert = text.match(/ERR_CERT_\w+|CERT_\w+|self[- ]signed certificate/);
  if (cert) return "the site's HTTPS certificate was rejected";
  return null;
}

function describeStrictMode(text: string): string {
  const m = text.match(/strict mode violation: (.+?) resolved to (\d+) elements/);
  if (!m) return "The test matched more than one element and could not tell which to use.";
  return `${capitalize(describeLocator(m[1]))} matched ${m[2]} elements, so the test could not tell which one to use.`;
}

/** Test-timeout follow-up error -> "it was stuck ..." clause. */
function describeStuckStep(raw: string): string | null {
  const text = raw.trim();
  const header = text.split("\n")[0].replace(/^(?:Error|TimeoutError):\s*/, "");
  const action = header.match(/^(locator|page|frame|apiRequestContext)\.(\w+):/);
  if (action) {
    const [, object, method] = action;
    if (object === "page" && method === "goto") {
      const url = text.match(/navigating to "(\S+?)"/)?.[1];
      return `it was still loading ${url ? pathOnly(url) : "the page"}`;
    }
    if (object === "page" && method === "waitForURL") return "it was waiting for the page to change address";
    if (object === "apiRequestContext") return `it was waiting on a ${method.toUpperCase()} request`;
    const locatorText = text.match(/waiting for (.+?)\s*$/m)?.[1];
    const target = locatorText ? describeLocator(locatorText) : "an element";
    const verb = ACTION_VERBS[method] ?? method;
    return `it was stuck trying to ${verb} ${target} (${actionBlocker(text)})`;
  }
  const assertion = header.match(/^expect\((?:locator|page)\)\.(not\.)?(\w+)\(/);
  if (assertion) {
    const locatorText = text.match(/Locator:\s*(.+)$/m)?.[1];
    const target = locatorText ? describeLocator(locatorText) : "the page";
    return `it was still checking ${target}`;
  }
  return null;
}

// ---- locators -----------------------------------------------------------

const ROLE_NOUNS: Record<string, string> = {
  link: "link",
  button: "button",
  heading: "heading",
  textbox: "field",
  searchbox: "search field",
  combobox: "dropdown",
  listbox: "list",
  checkbox: "checkbox",
  radio: "option",
  switch: "toggle",
  tab: "tab",
  tabpanel: "tab panel",
  dialog: "dialog",
  alertdialog: "dialog",
  menu: "menu",
  menuitem: "menu item",
  navigation: "navigation menu",
  img: "image",
  list: "list",
  listitem: "list item",
  region: "section",
  article: "article",
  banner: "page header",
  contentinfo: "page footer",
  main: "main content",
  form: "form",
  table: "table",
  row: "table row",
  cell: "table cell",
  alert: "alert message",
  status: "status message",
  progressbar: "progress bar",
  slider: "slider",
  option: "option",
  group: "group",
};

const TAG_NOUNS: Record<string, string> = {
  h1: "the page heading (h1)",
  h2: "a section heading",
  h3: "a heading",
  main: "the main content",
  nav: "the navigation menu",
  header: "the page header",
  footer: "the page footer",
  form: "the form",
  img: "an image",
  a: "a link",
  button: "a button",
  input: "a form field",
  textarea: "a text area",
  select: "a dropdown",
  table: "a table",
  li: "list items",
  ul: "a list",
  ol: "a list",
  iframe: "an embedded frame",
  video: "a video",
  dialog: "a dialog",
  section: "a page section",
  article: "an article",
  aside: "a sidebar",
};

/**
 * Playwright's locator string -> a phrase a visitor understands. Names
 * visible text where the locator has it; never repeats CSS selectors,
 * test ids or regexes.
 */
export function describeLocator(locator: string): string {
  // Only the last step of a chain names the element: locator('main').getByRole(...)
  const steps = locator.trim().split(/\.(?=(?:getBy\w+|locator|filter|first|last|nth|and|or)\()/);
  const meaningful = steps.filter((s) => !/^(?:first|last|nth|filter|and|or)\(/.test(s));
  const step = (meaningful.at(-1) ?? locator).trim();

  const role = step.match(/getByRole\('(\w+)'(?:,\s*\{(.*)\})?\)/);
  if (role) {
    const noun = ROLE_NOUNS[role[1]] ?? role[1];
    const opts = role[2] ?? "";
    const name = opts.match(/name:\s*'((?:[^'\\]|\\.)*)'/)?.[1];
    if (name) return `the "${name}" ${noun}`;
    const level = opts.match(/level:\s*(\d)/)?.[1];
    if (role[1] === "heading" && level) return level === "1" ? "the page heading (h1)" : `a level-${level} heading`;
    return /^[aeiou]/.test(noun) ? `an ${noun}` : `a ${noun}`;
  }
  const byText = step.match(/getBy(Text|Label|Placeholder|AltText|Title)\('((?:[^'\\]|\\.)*)'/);
  if (byText) {
    const [, kind, value] = byText;
    if (kind === "Text") return `the text "${value}"`;
    if (kind === "Label") return `the "${value}" field`;
    if (kind === "Placeholder") return `the field with placeholder "${value}"`;
    if (kind === "AltText") return `the "${value}" image`;
    return `the "${value}" element`;
  }
  if (/getBy(Text|Label|Placeholder|AltText|Title|TestId)\(/.test(step)) return "a page element";

  const css = step.match(/locator\('([^']*)'\)/)?.[1];
  if (css !== undefined) {
    const tag = css.trim().match(/^([a-z][a-z0-9]*)(?:$|[.#:[\s>])/i)?.[1]?.toLowerCase();
    if (tag && css.trim().toLowerCase() === tag && TAG_NOUNS[tag]) return TAG_NOUNS[tag];
    if (tag && TAG_NOUNS[tag]) return TAG_NOUNS[tag].replace(/^the /, "a ");
  }
  return "a page element";
}

// ---- helpers ------------------------------------------------------------

/** "Key: value" lines from a Playwright assertion message. */
type Fields = Partial<Record<string, string>>;

function parseFields(lines: string[]): Fields {
  const fields: Fields = {};
  for (const line of lines) {
    const m = line.match(/^\s*(Locator|Expected(?: substring| pattern| string| length)?|Received(?: string| length)?|Timeout):\s+(.*?)\s*$/);
    if (m && !(m[1] in fields)) fields[m[1]] = m[2];
  }
  return fields;
}

/**
 * Scrubs details that don't belong on a public page: absolute file paths,
 * the host of any URL (the runner's localhost, preview hosts), tokens and
 * other secrets that could end up in a message.
 */
export function sanitize(text: string): string {
  return text
    .replace(/(?:[A-Za-z]:)?[\\/](?:home|Users|runner|tmp|private|var|opt|github|__w|work)[\\/][^\s'")\]]*/g, (p) => {
      const file = p.split(/[\\/]/).pop()?.replace(/:\d+(?::\d+)?$/, "");
      return file && /\.\w+$/.test(file) ? file : "[path]";
    })
    .replace(/\bhttps?:\/\/(?:localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\]|[\w.-]+\.vercel\.app|[\w.-]+\.internal)(?::\d+)?(\/[^\s'"]*)?/gi, (_, p) => p || "/")
    .replace(/\b(Bearer|Basic)\s+[\w.~+/=-]+/gi, "$1 [redacted]")
    .replace(/\b([\w-]*(?:token|secret|password|passwd|api[_-]?key|auth)[\w-]*)(["']?\s*[:=]\s*["']?)(?!(?:Bearer|Basic)\b)[^\s"',&]+/gi, "$1$2[redacted]")
    .replace(/\b(?:gh[pousr]_|sk-|xox[baprs]-|AKIA)[\w-]{10,}/g, "[redacted]")
    .replace(/\s+/g, " ")
    .trim();
}

function pathOnly(value: string): string;
function pathOnly(value: string | undefined): string | undefined;
function pathOnly(value: string | undefined): string | undefined {
  if (value === undefined) return value;
  const unquoted = value.replace(/^"|"$/g, "");
  if (unquoted === "about:blank") return "a blank page";
  try {
    const url = new URL(unquoted);
    return `${url.pathname}${url.search}` || "/";
  } catch {
    return unquoted;
  }
}

function quoteish(value: string | null | undefined): string {
  if (value === undefined || value === null) return "nothing";
  const v = String(value).trim();
  if (/^".*"$/.test(v) || /^\/.*\/[a-z]*$/.test(v)) return truncate(sanitize(v), 80);
  if (/^-?\d+(\.\d+)?$/.test(v) || /^(true|false|null|undefined)$/.test(v)) return v;
  return `"${truncate(sanitize(v), 78)}"`;
}

function formatMs(ms: string | number): string {
  const n = Number(String(ms).replace(/ms$/, ""));
  if (!Number.isFinite(n)) return String(ms);
  if (n < 1000) return `${n}ms`;
  const s = n / 1000;
  return Number.isInteger(s) ? `${s}s` : `${s.toFixed(1)}s`;
}

function plural(n: number, noun: string): string {
  return `${n} ${noun}${n === 1 ? "" : "s"}`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function stripPeriod(s: string): string {
  return s.trim().replace(/[.\s]+$/, "");
}

function truncate(s: string, max: number): string {
  return s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s;
}

function finalize(summary: string): string {
  return truncate(sanitize(summary), MAX_LENGTH);
}
