import React from "react";
import { motion } from "framer-motion";

export const MessageBubble = ({ data, isPositive, layoutId }) => {
  const { speaker, avatar, raw_text } = data;

  const alignClass = isPositive
    ? "flex-row items-end self-start"
    : "flex-row-reverse items-end self-end";

  const bgClass = isPositive
    ? "bg-gray-100 text-gray-900 border border-gray-200"
    : "bg-gray-800 text-gray-50";

  return (
    <div
      className={`flex w-full mb-8 ${isPositive ? "justify-start" : "justify-end"}`}
    >
      <div className={`flex gap-3 max-w-2xl ${alignClass}`}>
        {/* Avatar outside the bubble, aligned to the bottom */}
        <div className="flex-shrink-0 text-3xl pb-1">{avatar}</div>

        {/* Core text container with layoutId for physics transition */}
        <motion.div
          layoutId={layoutId}
          layout
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          className={`flex flex-col gap-2 p-6 rounded-[12px] min-h-[140px] shadow-sm ${bgClass}`}
        >
          <div className="text-sm opacity-60 font-semibold">{speaker}</div>
          <div className="text-base leading-relaxed font-sans whitespace-pre-wrap">
            {raw_text}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
