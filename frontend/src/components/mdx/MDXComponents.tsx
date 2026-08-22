import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import Link from "next/link";
import ZoomableImage from "@/components/blog/ZoomableImage";

type MDXComponentsMap = NonNullable<MDXRemoteProps["components"]>;

export const mdxComponents: MDXComponentsMap = {
  h2: (props) => (
    <h2
      className="mt-12 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 first:mt-0 md:text-3xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-10 text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-2xl"
      {...props}
    />
  ),
  p: (props) => (
    <p className="mt-6 text-[17px] leading-8 text-slate-600 dark:text-slate-400" {...props} />
  ),
  a: (props) => (
    <Link
      href={props.href ?? "#"}
      className="font-semibold text-indigo-600 dark:text-indigo-400 underline decoration-indigo-200 underline-offset-4 transition-colors hover:text-indigo-700 dark:hover:text-indigo-300 hover:decoration-indigo-400"
    >
      {props.children}
    </Link>
  ),
  ul: (props) => (
    <ul
      className="mt-6 list-disc space-y-3 pl-5 text-[17px] leading-8 text-slate-600 dark:text-slate-400 marker:text-indigo-400"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-6 list-decimal space-y-3 pl-6 text-[17px] leading-8 text-slate-600 dark:text-slate-400 marker:font-semibold marker:text-indigo-500 dark:text-indigo-400"
      {...props}
    />
  ),
  li: (props) => <li className="pl-1.5 [&>p]:mt-0" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-8 rounded-2xl border-l-4 border-indigo-500 bg-indigo-50/60 px-6 py-5 text-lg font-medium italic leading-8 text-slate-700 dark:text-slate-300"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-slate-900 dark:text-slate-100" {...props} />,
  code: (props) => (
    <code
      className="rounded-md bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-mono text-[15px] text-indigo-700 dark:text-indigo-300"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto rounded-2xl bg-slate-900 p-6 font-mono text-sm leading-7 text-slate-100 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-slate-100"
      {...props}
    />
  ),
  img: (props) => (
    <span className="mt-8 block">
      <ZoomableImage src={props.src ?? ""} alt={props.alt ?? ""} variant="natural" />
    </span>
  ),
  hr: () => <hr className="my-12 border-slate-200 dark:border-slate-800" />,
  table: (props) => (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
      <table className="w-full border-collapse text-left text-[15px]" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 font-semibold text-slate-900 dark:text-slate-100"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border-b border-slate-100 dark:border-slate-800 px-4 py-3 text-slate-600 dark:text-slate-400" {...props} />
  ),
};
