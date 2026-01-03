import { ModeToggle } from "@/components/theme/toggle-mode";

export function SocialsFooter() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-center items-center gap-2 p-1">
        <ModeToggle className="[&>svg]:h-4 [&>svg]:w-4" />
      </div>
      <p className="text-muted-foreground text-center text-sm">
        开发人员：胡洪伟
      </p>
      <p className="text-muted-foreground text-center text-xs">
        联系电话：19905880291
      </p>
    </div>
  );
}
