"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <DotPattern
        className={cn(
          "h-full w-full",
    "[mask-image:radial-gradient(2400px_circle_at_center,transparent,white)]"
        )}
      />
    </div>
  );
}
