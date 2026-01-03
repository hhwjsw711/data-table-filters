## 关于本项目

本项目是一个独立的数据表格演示应用，将应用于[OpenStatus](https://openstatus.dev)控制台。

![Data Table with Infinite Scroll](https://data-table.openstatus.dev/assets/data-table-infinite.png)

访问[data-table.openstatus.dev](https://data-table.openstatus.dev)了解更多信息。

为了使您更便捷地使用数据表格，并可基于此开展概念验证/最小可行产品开发工作，我们创建了本代码仓库。我们将持续维护并定期增加新的示例。

当前包含两个核心功能：

- [简单分页数据表格](https://data-table.openstatus.dev/default)（客户端分页）
- [无限滚动及点击详情数据表格](https://data-table.openstatus.dev/infinite)（服务端分页）

用户界面设计参考了Datadog和Vercel日志表格。

> [!NOTE]
> 我们正在编写[使用指南](https://data-table.openstatus.dev/guide)，帮助您快速上手，减少试错成本。

更多示例：

- [OpenStatus轻量级查看器](https://data-table.openstatus.dev/light)（[`vercel-edge-ping`](https://github.com/OpenStatusHQ/vercel-edge-ping)的用户界面）

## 技术栈

本项目采用以下技术：

- [nextjs](https://nextjs.org)
- [tanstack-query](https://tanstack.com/query/latest)
- [tanstack-table](https://tanstack.com/table/latest)
- [shadcn/ui](https://ui.shadcn.com)
- [cmdk](http://cmdk.paco.me)
- [nuqs](http://nuqs.47ng.com)
- [dnd-kit](https://dndkit.com)

我们将考虑为React开发者提供基于[vitejs](https://vitejs.dev)的示例。**欢迎贡献代码！**

## 快速开始

无需配置环境变量。运行开发服务器：

```bash
pnpm dev
```

在浏览器中打开[http://localhost:3000](http://localhost:3000)查看应用。

## 需要更多支持？

如果您有特定的使用场景需求，或对我们的工作感兴趣并希望寻求合作，请发送邮件至[hire@openstatus.dev](mailto:hire@openstatus.dev)，或通过[cal.com](https://cal.com/team/openstatus/30min)预约会议。

## 致谢

- [sadmann17](https://x.com/sadmann17)提供基于`@dnd-kit`的优秀`<Sortable />`组件（参见[sortable.sadmn.com](https://sortable.sadmn.com)）
- [shelwin\_](https://x.com/shelwin_)提供可拖拽图表设计灵感（参见[zoom-chart-demo.vercel.app](https://zoom-chart-demo.vercel.app)）
