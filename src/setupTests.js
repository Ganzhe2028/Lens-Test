import "@testing-library/jest-dom";
import { MotionGlobalConfig } from "framer-motion";

// Disable animations for tests to prevent AnimatePresence from hanging in JSDOM
MotionGlobalConfig.skipAnimations = true;
