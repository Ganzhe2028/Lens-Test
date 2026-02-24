import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ArgumentCard = ({
  data,
  isPositive,
  layoutId,
  userToggled,
  onToggle,
}) => {
  const { speaker, raw_text, distilled_core } = data;

  // State machine for 600ms delayed crystallization
  const [showRaw, setShowRaw] = useState(!userToggled);

  useEffect(() => {
    if (userToggled) {
      setShowRaw(true);
      return;
    }
    const timer = setTimeout(() => {
      setShowRaw(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [userToggled]);

  const bgClass = isPositive
    ? "bg-gray-100 text-gray-900 border border-gray-200"
    : "bg-gray-800 text-gray-50";
  const dividerClass = isPositive ? "border-gray-300" : "border-gray-600";

  return (
    <motion.div
      layoutId={layoutId}
      layout
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
      style={{ opacity: 0.95 }}
      className={`relative flex flex-col gap-3 px-6 py-6 rounded-[12px] min-h-[140px] shadow-sm flex-1 ${bgClass}`}
    >
      <div className="text-xs opacity-60 font-semibold">{speaker}</div>

      <div className="flex-1 font-sans">
        <AnimatePresence mode="wait">
          {showRaw ? (
            <motion.div
              key="raw"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-base leading-relaxed whitespace-pre-wrap"
            >
              {raw_text}
            </motion.div>
          ) : (
            <motion.div
              key="core"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-lg leading-relaxed font-bold tracking-tight"
            >
              {distilled_core}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Micro-console at the bottom for tracing */}
      <motion.div
        layout="position"
        className={`mt-4 pt-4 border-t flex items-center justify-between ${dividerClass}`}
      >
        <span className="text-[10px] uppercase tracking-wider opacity-50 font-bold">
          Trace
        </span>
        <button
          onClick={onToggle}
          className="text-xs font-semibold underline opacity-70 hover:opacity-100 transition-opacity cursor-pointer z-10"
        >
          {userToggled ? "Collapse to Core" : "View Raw Quote"}
        </button>
      </motion.div>
    </motion.div>
  );
};
