import React, { useState } from "react";
import { LayoutGroup, AnimatePresence, motion } from "framer-motion";
import { mockData } from "./MockData";
import { MessageBubble } from "./MessageBubble";
import { TopologyNode } from "./TopologyNode";
import { Telescope, List } from "lucide-react";

function App() {
  const [isLensActive, setIsLensActive] = useState(false);
  const [overrideToggles, setOverrideToggles] = useState({});

  const handleToggleLens = () => {
    setIsLensActive(!isLensActive);
    // Reset individual toggles when lens changes
    setOverrideToggles({});
  };

  const handleToggleOverride = (key) => {
    setOverrideToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#fcfcfc]/80 backdrop-blur-md border-b border-gray-100 py-6 px-4 md:px-8 flex justify-between items-center h-20 transition-all duration-300">
        <h1 className="text-lg md:text-xl font-bold tracking-tight">
          {mockData.debate_title}
        </h1>

        <button
          onClick={handleToggleLens}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
            isLensActive
              ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md"
              : "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50"
          }`}
        >
          {isLensActive ? <List size={16} /> : <Telescope size={16} />}
          {isLensActive ? "回到聊天场" : "展开思维拓扑"}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto p-4 md:p-8 mt-4 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
        <LayoutGroup>
          {!isLensActive ? (
            /* State A: Chat Flow (High Entropy) */
            <div className="flex flex-col w-full max-w-4xl mx-auto">
              {mockData.arguments.map((arg) => (
                <div key={arg.id} className="flex flex-col w-full">
                  <MessageBubble
                    data={arg.thesis}
                    isPositive={true}
                    layoutId={`dialog-${arg.id}-thesis`}
                  />
                  <MessageBubble
                    data={arg.antithesis}
                    isPositive={false}
                    layoutId={`dialog-${arg.id}-antithesis`}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* State B: Emergent Node Graph (Low Entropy) */
            <div className="flex flex-col w-full">
              <AnimatePresence mode="popLayout">
                {mockData.arguments.map((arg) => (
                  <TopologyNode
                    key={arg.id}
                    argument={arg}
                    overrideToggles={overrideToggles}
                    onToggleOverride={handleToggleOverride}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </LayoutGroup>
      </main>

      {/* Subtle indicator floating at the bottom */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="px-4 py-1.5 rounded-full bg-black/5 backdrop-blur-sm text-xs font-medium text-black/50 border border-black/5">
          {isLensActive
            ? "State B: Low Entropy Topology"
            : "State A: High Entropy Chat Flow"}
        </div>
      </div>
    </div>
  );
}

export default App;
