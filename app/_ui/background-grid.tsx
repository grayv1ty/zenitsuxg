import { DotPattern } from "@/components/ui/dot-pattern";

import { cn } from "@/lib/utils";

export function BackgroundGrid() {
  return (
     <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden">
      <DotPattern
        glow={true}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  )
}
