import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function FeaturedCard() {
  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-muted p-6">
      <div>
        <span className="mb-3 inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          Free Consultation
        </span>

        <h3 className="mt-3 text-xl font-semibold tracking-tight">
          Not sure which QA service fits your needs?
        </h3>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Speak with our team and get expert guidance on choosing the right testing
          strategy for your product.
        </p>
      </div>

      <Button className="mt-6 w-full">
        Book Consultation
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}