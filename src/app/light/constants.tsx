"use client";

import { CopyToClipboardContainer } from "@/components/custom/copy-to-clipboard-container";
import { KVTabs } from "@/components/custom/kv-tabs";
import { DataTableColumnLatency } from "@/components/data-table/data-table-column/data-table-column-latency";
import { DataTableColumnLevelIndicator } from "@/components/data-table/data-table-column/data-table-column-level-indicator";
import { DataTableColumnRegion } from "@/components/data-table/data-table-column/data-table-column-region";
import { DataTableColumnStatusCode } from "@/components/data-table/data-table-column/data-table-column-status-code";
import type {
  DataTableFilterField,
  Option,
  SheetField,
} from "@/components/data-table/types";
import { _LEVELS, LEVELS } from "@/constants/levels";
import { METHODS } from "@/constants/method";
import { VERCEL_EDGE_REGIONS } from "@/constants/region";
import { isJSON } from "@/lib/is-json";
import { getLevelLabel } from "@/lib/request/level";
import { format } from "date-fns";
import type { ColumnType } from "./columns";

export const filterFields = [
  {
    label: "时间范围",
    value: "timestamp",
    type: "timerange",
    defaultOpen: true,
    commandDisabled: true,
  },
  {
    label: "级别",
    value: "level",
    type: "checkbox",
    defaultOpen: true,
    options: LEVELS.map((level) => ({ value: level, label: level })),
    component: (props: Option) => (
      <div className="flex items-center justify-between gap-2 font-mono md:w-[106px]">
        <div className="flex items-center gap-1">
          <DataTableColumnLevelIndicator
            value={props.value as (typeof _LEVELS)[number]}
          />
          <div className="capitalize text-foreground/70">{props.value}</div>
        </div>
        <div className="text-xs text-muted-foreground/70">
          {getLevelLabel(props.value as (typeof _LEVELS)[number])}
        </div>
      </div>
    ),
  },
  {
    label: "网址",
    value: "url",
    type: "input",
  },
  {
    label: "状态码",
    value: "status",
    type: "checkbox",
    // REMINDER: will be injected by the client.tsx
    options: [
      { label: "200", value: 200 },
      { label: "400", value: 400 },
      { label: "500", value: 500 },
    ],
    component: (props: Option) => (
      <DataTableColumnStatusCode value={props.value as number} />
    ),
  },
  {
    label: "请求方法",
    value: "method",
    type: "checkbox",
    // REMINDER: will be injected by the client.tsx
    options: METHODS.map((region) => ({ label: region, value: region })),
  },
  {
    label: "地区",
    value: "region",
    type: "checkbox",
    options: VERCEL_EDGE_REGIONS.map((region) => ({
      label: region,
      value: region,
    })),
  },
  {
    label: "延迟",
    value: "latency",
    type: "slider",
    min: 0,
    max: 5000,
    // REMINDER: will be injected by the client.tsx
    options: [{ label: "0", value: 0 }],
  },
] satisfies DataTableFilterField<ColumnType>[];

export const sheetFields = [
  {
    id: "level",
    label: "级别",
    type: "checkbox",
    component: (props) => (
      <div className="flex items-center justify-end gap-1.5">
        <span className="capitalize">{props.level}</span>
        <DataTableColumnLevelIndicator value={props.level} />
      </div>
    ),
    skeletonClassName: "w-2.5",
  },
  {
    id: "timestamp",
    label: "时间戳",
    type: "timerange",
    component: (props) =>
      format(new Date(props.timestamp), "LLL dd, y HH:mm:ss"),
    skeletonClassName: "w-36",
  },
  {
    id: "status",
    label: "状态",
    type: "checkbox",
    component: (props) => <DataTableColumnStatusCode value={props.status} />,
    skeletonClassName: "w-12",
  },
  {
    id: "method",
    label: "请求方法",
    type: "checkbox",
    skeletonClassName: "w-10",
  },
  {
    id: "url",
    label: "网址",
    type: "input",
    skeletonClassName: "w-24",
  },
  {
    id: "region",
    label: "地区",
    type: "checkbox",
    component: (props) => (
      <DataTableColumnRegion value={props.region} reverse showFlag />
    ),
    skeletonClassName: "w-12",
  },
  {
    id: "latency",
    label: "延迟",
    type: "slider",
    component: (props) => <DataTableColumnLatency value={props.latency} />,
    skeletonClassName: "w-16",
  },
  {
    id: "headers",
    label: "请求头",
    type: "readonly",
    condition: (props) => props.headers && JSON.parse(props.headers),
    component: (props) => (
      // REMINDER: negative margin to make it look like the header is on the same level of the tab triggers
      <KVTabs data={JSON.parse(props.headers)} className="-mt-[22px]" />
    ),
    className: "flex-col items-start w-full gap-1",
  },
  {
    id: "body",
    label: "消息体",
    type: "readonly",
    condition: (props) => props.body !== undefined,
    component: (props) => (
      <CopyToClipboardContainer
        key={props.body}
        variant="default"
        maxHeight={200}
      >
        {isJSON(props.body) ? JSON.stringify(props.body, null, 2) : props.body}
      </CopyToClipboardContainer>
    ),
    className: "flex-col items-start w-full gap-1",
  },
] satisfies SheetField<ColumnType, unknown>[];
