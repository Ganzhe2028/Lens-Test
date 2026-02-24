import React from "react";
import { motion } from "framer-motion";
import { ArgumentCard } from "./ArgumentCard";

export const TopologyNode = ({
  argument,
  overrideToggles,
  onToggleOverride,
}) => {
  return (
    <div className="relative flex flex-col md:flex-row w-full gap-6 pl-0 md:pl-10 mb-16 items-stretch">
      {/* Absolute positioning wire for children (replaces border-left) */}
      <div className="absolute left-[2.2rem] md:left-[17.5rem] top-12 bottom-12 w-px bg-gray-200 z-0" />

      {/* Parent Node (Emergent) */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 250, damping: 25, delay: 0.2 }}
        className="w-full md:w-64 flex-shrink-0 bg-white border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[16px] p-6 self-start z-10 relative"
      >
        <div className="text-[10px] uppercase text-gray-400 font-bold mb-2 tracking-wider">
          Node / Topic
        </div>
        <h3 className="text-sm font-bold text-gray-800 leading-snug">
          {argument.parent_title}
        </h3>
        {/* Horizontal connector line */}
        <div className="absolute right-[-1.5rem] top-12 w-6 h-px bg-gray-200 hidden md:block" />
      </motion.div>

      {/* Children Node Area */}
      <div className="flex flex-col gap-8 flex-1 w-full relative z-10 pl-14 md:pl-0">
        {/* Thesis Layout Container */}
        <div className="relative flex w-full">
          <div className="absolute left-[-2rem] md:left-[-1.5rem] top-12 w-8 md:w-6 h-px bg-gray-200" />
          <ArgumentCard
            data={argument.thesis}
            isPositive={true}
            layoutId={`dialog-${argument.id}-thesis`}
            userToggled={overrideToggles[`${argument.id}-thesis`]}
            onToggle={() => onToggleOverride(`${argument.id}-thesis`)}
          />
        </div>

        {/* Antithesis Layout Container */}
        <div className="relative flex w-full">
          <div className="absolute left-[-2rem] md:left-[-1.5rem] top-12 w-8 md:w-6 h-px bg-gray-200" />
          <ArgumentCard
            data={argument.antithesis}
            isPositive={false}
            layoutId={`dialog-${argument.id}-antithesis`}
            userToggled={overrideToggles[`${argument.id}-antithesis`]}
            onToggle={() => onToggleOverride(`${argument.id}-antithesis`)}
          />
        </div>
      </div>
    </div>
  );
};
