"use client";

import { CopyToClipboardContainer } from "@/components/custom/copy-to-clipboard-container";
import { KVTabs } from "@/components/custom/kv-tabs";
import { DataTableColumnRegion } from "@/components/data-table/data-table-column/data-table-column-region";
import type {
  DataTableFilterField,
  Option,
  SheetField,
} from "@/components/data-table/types";
import { LEVELS } from "@/constants/levels";
import { METHODS } from "@/constants/method";
import { REGIONS } from "@/constants/region";
import { formatMilliseconds } from "@/lib/format";
import { getLevelColor, getLevelLabel } from "@/lib/request/level";
import { getStatusColor } from "@/lib/request/status-code";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { PopoverPercentile } from "./_components/popover-percentile";
import { SheetTimingPhases } from "./_components/sheet-timing-phases";
import type { LogsMeta } from "./query-options";
import { type ColumnSchema } from "./schema";

// instead of filterFields, maybe just 'fields' with a filterDisabled prop?
// that way, we could have 'message' or 'headers' field with label and value as well as type!
export const filterFields = [
  {
    label: "时间范围",
    value: "date",
    type: "timerange",
    defaultOpen: true,
    commandDisabled: true,
  },
  {
    label: "级别",
    value: "level",
    type: "checkbox",
    defaultOpen: true,
    options: LEVELS.map((level) => ({ label: level, value: level })),
    component: (props: Option) => {
      // TODO: type `Option` with `options` values via Generics
      const value = props.value as (typeof LEVELS)[number];
      return (
        <div className="flex w-full max-w-28 items-center justify-between gap-2 font-mono">
          <span className="capitalize text-foreground/70 group-hover:text-accent-foreground">
            {props.label}
          </span>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "h-2.5 w-2.5 rounded-[2px]",
                getLevelColor(value).bg,
              )}
            />
            <span className="text-xs text-muted-foreground/70">
              {getLevelLabel(value)}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    label: "主机",
    value: "host",
    type: "input",
  },
  {
    label: "路径",
    value: "pathname",
    type: "input",
  },
  {
    label: "状态码",
    value: "status",
    type: "checkbox",
    options: [
      { label: "200", value: 200 },
      { label: "400", value: 400 },
      { label: "404", value: 404 },
      { label: "500", value: 500 },
    ], // REMINDER: this is a placeholder to set the type in the client.tsx
    component: (props: Option) => {
      if (typeof props.value === "boolean") return null;
      if (typeof props.value === "undefined") return null;
      if (typeof props.value === "string") return null;
      return (
        <span className={cn("font-mono", getStatusColor(props.value).text)}>
          {props.value}
        </span>
      );
    },
  },
  {
    label: "请求方法",
    value: "method",
    type: "checkbox",
    options: METHODS.map((region) => ({ label: region, value: region })),
    component: (props: Option) => {
      return <span className="font-mono">{props.value}</span>;
    },
  },
  {
    label: "地区",
    value: "regions",
    type: "checkbox",
    options: REGIONS.map((region) => ({ label: region, value: region })),
    component: (props: Option) => {
      return <span className="font-mono">{props.value}</span>;
    },
  },
  {
    label: "延迟",
    value: "latency",
    type: "slider",
    min: 0,
    max: 5000,
  },
  {
    label: "DNS",
    value: "timing.dns",
    type: "slider",
    min: 0,
    max: 5000,
  },
  {
    label: "连接",
    value: "timing.connection",
    type: "slider",
    min: 0,
    max: 5000,
  },
  {
    label: "TLS",
    value: "timing.tls",
    type: "slider",
    min: 0,
    max: 5000,
  },
  {
    label: "TTFB",
    value: "timing.ttfb",
    type: "slider",
    min: 0,
    max: 5000,
  },
  {
    label: "传输",
    value: "timing.transfer",
    type: "slider",
    min: 0,
    max: 5000,
  },
] satisfies DataTableFilterField<ColumnSchema>[];

export const sheetFields = [
  {
    id: "uuid",
    label: "请求ID",
    type: "readonly",
    skeletonClassName: "w-64",
  },
  {
    id: "date",
    label: "日期",
    type: "timerange",
    component: (props) => format(new Date(props.date), "LLL dd, y HH:mm:ss"),
    skeletonClassName: "w-36",
  },
  {
    id: "status",
    label: "状态",
    type: "checkbox",
    component: (props) => {
      return (
        <span className={cn("font-mono", getStatusColor(props.status).text)}>
          {props.status}
        </span>
      );
    },
    skeletonClassName: "w-12",
  },
  {
    id: "method",
    label: "方法",
    type: "checkbox",
    component: (props) => {
      return <span className="font-mono">{props.method}</span>;
    },
    skeletonClassName: "w-10",
  },
  {
    id: "host",
    label: "主机",
    type: "input",
    skeletonClassName: "w-24",
  },
  {
    id: "pathname",
    label: "路径",
    type: "input",
    skeletonClassName: "w-56",
  },
  {
    id: "regions",
    label: "地区",
    type: "checkbox",
    skeletonClassName: "w-12",
    component: (props) => (
      <DataTableColumnRegion value={props.regions[0]} reverse showFlag />
    ),
  },
  {
    id: "latency",
    label: "延迟",
    type: "slider",
    component: (props) => (
      <>
        {formatMilliseconds(props.latency)}
        <span className="text-muted-foreground">ms</span>
      </>
    ),
    skeletonClassName: "w-16",
  },
  {
    id: "percentile",
    label: "百分位数",
    type: "readonly",
    component: (props) => {
      return (
        <PopoverPercentile
          data={props}
          percentiles={props.metadata?.currentPercentiles}
          filterRows={props.metadata?.filterRows as number}
          className="ml-auto"
        />
      );
    },
    skeletonClassName: "w-12",
  },
  {
    id: "timing.dns", // REMINDER: cannot be 'timing' as it is a property of the object
    label: "时序阶段",
    type: "readonly",
    component: (props) => (
      <SheetTimingPhases latency={props.latency} timing={props} />
    ),
    className: "flex-col items-start w-full gap-1",
  },
  {
    id: "headers",
    label: "请求头",
    type: "readonly",
    component: (props) => (
      // REMINDER: negative margin to make it look like the header is on the same level of the tab triggers
      <KVTabs data={props.headers} className="-mt-[22px]" />
    ),
    className: "flex-col items-start w-full gap-1",
  },
  {
    id: "message",
    label: "消息",
    type: "readonly",
    condition: (props) => props.message !== undefined,
    component: (props) => (
      <CopyToClipboardContainer variant="destructive">
        {JSON.stringify(props.message, null, 2)}
      </CopyToClipboardContainer>
    ),
    className: "flex-col items-start w-full gap-1",
  },
] satisfies SheetField<ColumnSchema, LogsMeta>[];
