import { Kbd } from "@/components/custom/kbd";
import { Link } from "@/components/custom/link";
import { Bluesky } from "@/components/icons/bluesky";
import { Github } from "@/components/icons/github";
import { X } from "@/components/icons/x";
import { ModeToggle } from "@/components/theme/toggle-mode";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Book, Command } from "lucide-react";
import NextLink from "next/link";

export function SocialsFooter() {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid w-full grid-cols-3 items-center justify-center gap-2 p-1 md:grid-cols-6">
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0" asChild>
          <NextLink href="https://github.com/openstatusHQ/data-table-filters">
            <Github className="h-4 w-4" />
          </NextLink>
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0" asChild>
          <NextLink href="https://twitter.com/openstatusHQ">
            <X className="h-4 w-4" />
          </NextLink>
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0" asChild>
          <NextLink href="https://bsky.app/profile/openstatus.dev">
            <Bluesky className="h-4 w-4" />
          </NextLink>
        </Button>
        <ModeToggle className="h-8 w-8 [&>svg]:h-4 [&>svg]:w-4" />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
              <Command className="h-4 w-4" />
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
        技术支持：{" "}
        <Link href="https://openstatus.dev" hideArrow>
          OpenStatus
        </Link>
      </p>
      <p className="text-center text-[10px] text-muted-foreground">
        本项目正在积极开发中。如有任何反馈，请在GitHub上{" "}
        <Link
          href="https://github.com/openstatusHQ/data-table-filters/issues/new"
          className="text-muted-foreground"
          hideArrow
        >
          提交问题
        </Link>
        。
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
        return (
          <li key={props.key} className="grid grid-cols-4 gap-2 py-0.5">
            <span className="col-span-1 text-left">
              <Kbd className="ml-1">
                <span className="mr-1">⌘</span>
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
