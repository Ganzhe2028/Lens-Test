import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";

// Mock Framer Motion to bypass AnimatePresence hanging in JSDOM
// Note: We leave AnimatePresence and layout animations bypassed, but the layout transition
// and 600ms state change are standard React behavior which will work perfectly in real time.
vi.mock("framer-motion", () => {
  const FakeMotion = React.forwardRef(
    (
      { children, layoutId, layout, className, style, onClick, ...props },
      ref,
    ) => (
      <div
        className={className}
        style={style}
        onClick={onClick}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    ),
  );

  return {
    motion: {
      div: FakeMotion,
      p: FakeMotion,
      button: FakeMotion,
      span: FakeMotion,
    },
    AnimatePresence: ({ children }) => <>{children}</>,
    LayoutGroup: ({ children }) => <>{children}</>,
  };
});

import App from "./App";

describe("Philosophy Debate Lens - App Component", () => {
  it("renders initial State A (Chat Flow) correctly", () => {
    render(<App />);

    expect(
      screen.getByText("人性底色：本善与本恶的终极对齐"),
    ).toBeInTheDocument();
    expect(screen.getByText("展开思维拓扑")).toBeInTheDocument();
    expect(
      screen.getByText(/其实我们看看人类幼崽就知道了/i),
    ).toBeInTheDocument();
  });

  it("toggles to State B and shows delays using real timers", async () => {
    render(<App />);

    fireEvent.click(screen.getByText("展开思维拓扑"));

    expect(screen.getByText("回到聊天场")).toBeInTheDocument();

    // Check delayed crystallization (raw should still be there immediately)
    expect(
      screen.getByText(/其实我们看看人类幼崽就知道了/i),
    ).toBeInTheDocument();

    // Using real timers: Wait for the component to update after 600ms naturally
    await waitFor(
      () => {
        expect(
          screen.getByText(/生物学本能驱动同理心与利他行为/i),
        ).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });

  it("allows clicking trace button on individual nodes", async () => {
    render(<App />);

    fireEvent.click(screen.getByText("展开思维拓扑"));

    await waitFor(
      () => {
        expect(
          screen.getByText(/生物学本能驱动同理心与利他行为/i),
        ).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    const viewRawButtons = screen.getAllByText("View Raw Quote");
    expect(viewRawButtons.length).toBeGreaterThan(0);

    // Click trace button
    fireEvent.click(viewRawButtons[0]);

    // State swaps instantly due to `userToggled` bypass
    expect(screen.getAllByText("Collapse to Core").length).toBeGreaterThan(0);
    expect(
      screen.getByText(/其实我们看看人类幼崽就知道了/i),
    ).toBeInTheDocument();
  });
});
