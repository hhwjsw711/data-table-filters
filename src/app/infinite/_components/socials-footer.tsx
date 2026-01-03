import { Kbd } from "@/components/custom/kbd";
import { ModeToggle } from "@/components/theme/toggle-mode";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Book, Keyboard } from "lucide-react";
import NextLink from "next/link";

export function SocialsFooter() {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid w-full grid-cols-3 items-center justify-center gap-2 p-1">
        <ModeToggle className="h-8 w-8 [&>svg]:h-4 [&>svg]:w-4" />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
              <Keyboard className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto px-2 py-1">
            <HotkeyOverview />
          </PopoverContent>
        </Popover>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0" asChild>
          <NextLink href="/guide">
            <Book className="h-4 w-4" />
          </NextLink>
        </Button>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        开发人员：胡洪伟
      </p>
      <p className="text-center text-[10px] text-muted-foreground">
        联系电话：19905880291
      </p>
    </div>
  );
}

const hotkeys = [
  { key: "K", description: "切换命令输入" },
  { key: "B", description: "切换侧边栏控制" },
  {
    key: "U",
    description: "撤销列状态（顺序、可见性）",
  },
  {
    key: "J",
    description: "切换实时模式",
  },
  { key: "Esc", description: "重置表格过滤器" },
  {
    key: ".",
    description: "重置元素焦点到起始位置",
  },
];

function HotkeyOverview() {
  return (
    <ul className="divide-y">
      {hotkeys.map((props) => {
        const isEsc = props.key === "Esc";
        return (
          <li key={props.key} className="grid grid-cols-4 gap-2 py-0.5">
            <span className="col-span-1 text-left">
              <Kbd className="ml-1">
                {!isEsc && <span className="mr-1">Ctrl</span>}
                <span>{props.key}</span>
              </Kbd>
            </span>
            <span className="col-span-3 place-content-center text-xs text-muted-foreground">
              {props.description}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
