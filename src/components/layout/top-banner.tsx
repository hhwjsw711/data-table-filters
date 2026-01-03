import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "@/components/custom/link";

export function TopBanner() {
  return (
    <div className="group bg-muted/50 text-foreground border-b">
      <div className="container mx-auto px-4 py-2 sm:px-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <p className="flex items-center justify-center gap-2">
            <Link href="/infinite" className="no-underline">
              <span className="font-semibold">新示例：</span>
              <span className="underline underline-offset-4 decoration-muted-foreground group-hover:decoration-foreground">
                无限滚动
              </span>{" "}
              <span className="mr-1">现已上线，灵感来自Vercel</span>
              <ArrowRight className="relative mb-[1px] inline h-4 w-0 transition-all group-hover:w-4" />
              <ChevronRight className="relative mb-[1px] inline h-4 w-4 transition-all group-hover:w-0" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
