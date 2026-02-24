# 哲学辩论透镜 (Philosophy Debate Lens)

This project is a React-based application designed to transform high-entropy, chaotic debate dialogues into structured, low-entropy logical topology graphs. It was built to demonstrate the power of cognitive step-down visualization using physics-based transitions.

## Core Features

- **State A: Chat Flow (High Entropy)**  
  Simulates an instant messaging environment where arguments are presented in elongated, scroll-heavy chat bubbles, mimicking the cognitive overload of reading raw debates.

- **State B: Emergent Node Graph (Low Entropy)**  
  Transitions the argument into a tree graph using fluid physics-based animations. The raw text "crystallizes" into a distilled logical core after a 600ms airborne delay, significantly reducing cognitive load.

- **Traceability**  
  Users can seamlessly toggle between the distilled core and the original raw quote within the graph view to verify the argument's context.

## Technology Stack

- **Framework**: [React](https://react.dev/) via [Vite](https://vitejs.dev/)
- **Animation Engine**: [Framer Motion](https://www.framer.com/motion/) (utilizing strict spring physics: `stiffness: 250, damping: 25`, and `layoutId` preservation)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Running the Development Server

Start the application locally:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Running Tests

Execute the Vitest test suite to verify component rendering and state transitions:

```bash
npx vitest run src/App.test.jsx
```

## Architecture

The application is structured into clearly delineated, physical-isolated components as required by the `AGENTS.md` strict directives:

- `src/App.jsx`: Global orchestrator handling `LayoutGroup` and state distribution.
- `src/MockData.js`: Data source containing both `raw_text` and `distilled_core`.
- `src/MessageBubble.jsx`: Renders the State A chat bubbles.
- `src/TopologyNode.jsx`: Handles the State B logical grouping, using absolute positioning for relationship lines instead of native borders.
- `src/ArgumentCard.jsx`: Core component for the State B leaf nodes, managing the 600ms delayed crystallization state machine and the micro-console for traceability.
