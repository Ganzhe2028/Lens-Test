# 哲学辩论透镜 (Philosophy Debate Lens) 开发规约与 Agent 指南

本文档是为所有参与本系统（Demo 实施规约 v5.0）开发、重构或 UI 调整的 AI Agents 编写的**最高优先级指令集**。在修改任何代码前，必须强制阅读并遵循以下所有的物理定律、UI/UX 规范与架构拆分要求。

---

## 1. 核心产品哲学：从混沌到秩序的降维打击

本项目不是一个单纯的“聊天界面排版”，也不是静态的“折叠面板树”。它的核心在于**视觉上的物理对象永久性**和**信息熵的断崖式降低**。

- **双态对立**：应用分为高熵的“态 A：混沌聊天场”和低熵的“态 B：图谱涌现场”。
- **物理守恒**：从态 A 到态 B 的转换过程中，元素的位移和形变必须由物理动画引擎严格接管，**绝对禁止 UI 突变**。
- **语义压缩（结晶）**：不仅是空间的平移，必须伴随着长文内容（`raw_text`）向核心逻辑（`distilled_core`）的溶解褪去。
- **信息溯源**：压缩必须是双向可逆的，必须保留锚点允许用户随时回退至原始聊天气泡以查证语境。

---

## 2. 强制技术栈配置

- **UI 框架**：React
- **动画引擎**：Framer Motion (高度依赖 `layout`, `AnimatePresence`, `layoutId`)
- **样式方案**：Tailwind CSS
- **字体系统**：必须全局绑定无衬线体 `Inter` 与 `PingFang SC`。依赖字重（Font Weight）区分层级，**严禁使用花哨的颜色**。

---

## 3. 架构拆分与 DOM 结构指令

**全面收回 Agent 的架构设计权。严禁输出单文件的“Spaghetti Code”。必须输出以下物理隔离的文件矩阵：**

1. **`MockData.js`**：底层数据源。必须包含双重颗粒度字段：`raw_text`（原始语录）和 `distilled_core`（提炼内核）。
   - **强制数据结构**：数据必须包含 `arguments` 数组，内部嵌套带有唯一 `id` 的 `thesis` (正方) 与 `antithesis` (反方) 结构。这是后续 `layoutId` 绑定的核心标识符来源。
   ```json
   {
     "arguments": [
       {
         "id": "arg_1",
         "parent_title": "论点一：同理心的生物学起源",
         "thesis": {
           "speaker": "正方辩手",
           "avatar": "🟦",
           "raw_text": "...",
           "distilled_core": "..."
         },
         "antithesis": {
           "speaker": "反方辩手",
           "avatar": "🟥",
           "raw_text": "...",
           "distilled_core": "..."
         }
       }
     ]
   }
   ```
2. **`MessageBubble.jsx`**：仅负责“态 A”。
   - **正方对齐**：强制应用 `flex-row items-end self-start`。底色 `bg-gray-100`。
   - **反方对齐**：强制应用 `flex-row-reverse items-end self-end`。底色 `bg-gray-800`。
   - **视觉细节**：中等圆角 `12px`；头像必须滚出气泡内部，紧贴气泡外侧并与底部对齐。刻意拉长气泡垂直高度。
3. **`TopologyNode.jsx`**：负责“态 B”父子节点组合逻辑。
   - **根节点轨道**：钉死为 `<div className="relative flex flex-col md:flex-row w-full gap-6 pl-10">`。
   - **父节点涌现**：当 `isLensActive === false` 时，DOM 中销毁不留痕迹。当激活时，必须设置 `delay`（如 `0.2s`）从左侧延时滑入。
   - **父节点样式**：纯白背景，灰色边框 `border-gray-200`，大面积柔和弥散阴影，圆角增至 `16px`。
   - **子节点样式**：保留态 A 气泡底色以维持认知连贯性，透明度降至 `80%`。
   - **连线绘制**：**彻底废除原生的 `border-left` 连线**！必须在叶子节点群左侧暴击插入独立的绝对定位线段 `<div className="absolute left-[-1.5rem] top-8 bottom-8 w-px bg-gray-200" />`。
4. **`ArgumentCard.jsx`**：深度封装态 B 叶子节点核心。承载 **600ms 延迟结晶状态机** 和微型控制台（溯源穿梭按钮）。内部必须预留足够的纵向 Padding 作为回弹缓冲。
   - **代码级标准**：状态机必须使用 `useEffect` + `setTimeout(..., 600)` 进行跨态淡入淡出，严格使用 `<AnimatePresence mode="wait">` 包裹内容区，严防飞行途中触发 DOM 重排导致运动轨迹断裂。
5. **`App.jsx`**：全局统帅。承载 `LayoutGroup` 调度中心、`isLensActive` 状态分发及触发按钮。

---

## 4. 物理动画与状态机规约（Critical 🚨）

违反以下任意一条，必将导致无可挽回的抖动与 DOM 崩溃。

### 4.1 弹簧物理参数绝对固化

- **彻底绞杀默认的线性过渡（Tween）！**
- 全体携带 `<motion.div layout>` 的元素，必须强制挂载此经过严格调优的参数：
  ```jsx
  transition={{ type: "spring", stiffness: 250, damping: 25 }}
  ```

### 4.2 飞行结晶动画 (The 600ms Rule)

- 严禁在容器飞行途中直接切换文本内容（会撕裂形变骨架）。
- 必须引入 **600ms 的滞空延迟机制**。只有等容器稳定落地后，再执行 `raw_text` 褪去和 `distilled_core` 淡入。
- 视图层强制绑定 `<AnimatePresence mode="wait">` 实现无缝交叉淡入淡出。

### 4.3 锚点守恒法则

- `layoutId` **严禁** 绑定在包裹文字的行内元素（如 `<span>`、`<p>` 内联节点）。
- 必须锁定在包裹核心文本的**独立块级区块容器（Block Container）** 上，这是物理元素守恒的最核心防线。
- **跨系统同体身份绑定 (Critical)**：`MessageBubble` (态A) 和 `ArgumentCard` (态B) 渲染同一个数据对象（例如 `arg_1` 的 `thesis`）时，它们最外层的 `motion.div` 必须显式绑定**绝对一致的 `layoutId`**（如 `layoutId={\`dialog-${arg.id}-thesis\`}`）。如果此处失配，动画将彻底断裂退化为生硬的销毁重造。

---

## 5. 开发工作流与自我校验 (Agent Checklist)

在编写任何代码或修复 Bug 时，Agent 必须对照此清单：

- [ ] 我是否试图在一个文件里写完所有代码？（如果是，停下并按规范拆分）
- [ ] 我是否用了非弹簧（Spring）的动画过渡效果？
- [ ] 文本替换是否严格遵循了 600ms 的延迟并用 `AnimatePresence` 包裹？
- [ ] 我的 `layoutId` 绑定在块级元素上吗？
- [ ] 树状连线是否使用了绝对定位而非 `border-left`？
- [ ] 我是否擅自添加了多余的装饰性色彩或违背了极简主义的设计语言？
- [ ] 从 `MessageBubble` 到 `ArgumentCard`，我是否为映射的同一实体应用了完全一致的 `layoutId`？
