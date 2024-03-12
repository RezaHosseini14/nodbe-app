import { Variants } from "framer-motion";

export const cardVariants: Variants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      opacity: 1,

      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 5,
      },
    },
  };