---
name: architecture-diagram-generator
description: 根据系统架构描述生成专业的暗色主题架构图（单HTML文件，含SVG矢量图形）。使用场景：(1) 用户请求创建系统架构图 (2) 需要可视化系统组件和连接关系 (3) 云计算、微服务、基础设施等架构设计 (4) 生成后可迭代修改
---

# Architecture Diagram Generator

根据文本描述生成专业的暗色主题架构图，输出为独立的 HTML 文件，可在任何浏览器中打开。

## 快速开始

用户描述架构后，生成对应 HTML 文件：

1. 解析用户提供的架构描述（组件、技术、连接关系）
2. 基于 `assets/template.html` 模板生成 HTML
3. 用 SVG 绘制组件和连接线
4. 保存为 `.html` 文件供用户下载

## 设计规范

### 色彩系统

| 组件类型    | 填充色                    | 描边色             |
| ----------- | ------------------------- | ------------------ |
| Frontend    | `rgba(8, 51, 68, 0.4)`    | `#22d3ee` (青色)   |
| Backend     | `rgba(6, 78, 59, 0.4)`    | `#34d399` (翠绿)   |
| Database    | `rgba(76, 29, 149, 0.4)`  | `#a78bfa` (紫罗兰) |
| Cloud/AWS   | `rgba(120, 53, 15, 0.3)`  | `#fbbf24` (琥珀)   |
| Security    | `rgba(136, 19, 55, 0.4)`  | `#fb7185` (玫瑰)   |
| Message Bus | `rgba(251, 146, 60, 0.3)` | `#fb923c` (橙色)   |
| External    | `rgba(30, 41, 59, 0.5)`   | `#94a3b8` (石板灰) |

### 排版

- 字体：JetBrains Mono (Google Fonts)
- 组件名：11px 白色
- 副标签：9px 灰色
- 注解：7-8px

### 布局规则

**背景**：`#020617` + 40px 网格图案

**组件间距**：

- 标准组件高度：60px（服务）、80-120px（大型组件）
- 垂直组件间最小间距：40px
- Message bus 放在间隙中央

**图层顺序**：先画连接箭头，再画组件盒子（箭头在底层）

**安全组/区域边界**：

- 安全组：虚线 `#fb7185`，透明填充
- 区域边界：虚线 `#fbbf24`，`rx="12"`

## 模板文件

使用 `assets/template.html` 作为基础模板，关键占位符：

- `[PROJECT NAME]` - 项目标题
- `[Subtitle description]` - 副标题
- SVG viewBox: `1000 x 680`（根据需要调整）

## 输出要求

生成自包含的 `.html` 文件：

- 内联 CSS（除 Google Fonts 外无外部样式表）
- 内联 SVG（无外部图片）
- 无需 JavaScript（纯 CSS 动画）

## 使用示例

用户输入：

```
创建一个架构图：React前端 + Node.js/Express API + PostgreSQL数据库 + Redis缓存 + JWT认证
```

生成对应的架构图，包含：

- 前端组件（青色）
- 后端API服务器（翠绿）
- 数据库（紫罗兰）
- 缓存层
- 认证组件（玫瑰）
- 连接箭头和标注
