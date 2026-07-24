import {
  Search,
  FlaskConical,
  ShieldCheck,
} from "lucide-react";

import ProcessPath from "./ProcessPath";
import ProcessStep from "./ProcessStep";

export default function ProcessTimeline() {
  return (
    <div className="relative h-[520px]">
      <ProcessPath />

      <div className="absolute left-[40px] top-[250px]">
        <ProcessStep
          number="01"
          icon={Search}
          title="Discovery & Planning"
          description="We understand your product, users, risks and quality goals before writing a single test."
        />
      </div>

      <div className="absolute left-[430px] top-[20px]">
        <ProcessStep
          number="02"
          icon={FlaskConical}
          title="Test Execution"
          description="Manual, automation, API and performance testing executed with detailed reporting."
        />
      </div>

      <div className="absolute left-[820px] top-[240px]">
        <ProcessStep
          number="03"
          icon={ShieldCheck}
          title="Continuous Quality"
          description="Regression testing, release validation and continuous QA support as your product evolves."
        />
      </div>
    </div>
  );
}