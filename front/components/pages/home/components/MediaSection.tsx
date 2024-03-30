import TitleBox from "@/components/shared/TitleBox";
import { cardVariants } from "@/utils/constant";
import { motion } from "framer-motion";

function MediaSection() {
  return (
    <motion.div
      id="media"
      className="lg:col-span-9 col-span-8 row-span-1 card sp_card"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      variants={cardVariants}
    >
      <TitleBox title="نوا نما" margin={true} />
    </motion.div>
  );
}

export default MediaSection;
