import { motion, Variants } from "framer-motion";

function Footer() {
  const footerVariants: Variants = {
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
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full gap-8"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      variants={footerVariants}
    >
      <div className="container pt-32 mb-8">
        <div className="footer bg-[#707070]/70 h-40 w-full rounded-2xl grid place-content-center relative">
          <p className="text-white font-bold text-lg">هرگونه کپی برداری و انتشار محتوای وبسایت موجب خشنودی خدام هیأت می‌باشد.</p>
        </div>
      </div>
    </motion.div>
  );
}

export default Footer;
