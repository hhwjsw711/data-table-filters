import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { DataTableFilterControls } from "./data-table-filter-controls";
import { useHotKey } from "@/hooks/use-hot-key";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd } from "@/components/custom/kbd";
import { useMediaQuery } from "@/hooks/use-media-query";

export function DataTableFilterControlsDrawer() {
  const triggerButtonRef = React.useRef<HTMLButtonElement>(null);
  const isMobile = useMediaQuery("(max-width: 640px)");

  useHotKey(() => {
    triggerButtonRef.current?.click();
  }, "b");

  return (
    <Drawer>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DrawerTrigger asChild>
              <Button
                ref={isMobile ? triggerButtonRef : null}
                variant="ghost"
                size="icon"
                className="h-9 w-9"
              >
                <FilterIcon className="w-4 h-4" />
              </Button>
            </DrawerTrigger>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>
              切换控制面板{" "}
              <Kbd className="ml-1 text-muted-foreground group-hover:text-accent-foreground">
                <span>Ctrl+B</span>
              </Kbd>
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DrawerContent className="max-h-[calc(100dvh-4rem)]">
        <VisuallyHidden>
          <DrawerHeader>
            <DrawerTitle>过滤器</DrawerTitle>
            <DrawerDescription>调整表格过滤条件</DrawerDescription>
          </DrawerHeader>
        </VisuallyHidden>
        <div className="px-4 flex-1 overflow-y-auto">
          <DataTableFilterControls />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              关闭
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
