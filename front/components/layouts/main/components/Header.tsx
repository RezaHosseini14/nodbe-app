import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import logo from "@/assets/img/logo.svg";
import SocialSection from "@/components/pages/home/components/SocialSection";
import BubbleBlur from "@/components/shared/BubbleBlur";
import { usePathname } from "next/navigation";

function MainHeader() {
  const path = usePathname();

  const headerVariants: Variants = {
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

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    console.log(path);
    if (path === "/") {
      if (element) {
        window.scrollTo({
          top: element.offsetTop + 200,
          behavior: "smooth",
        });
      }
    } else {
      window.location.replace("/");
    }
  };

  return (
    <div className="header-container relative pt-16 bg-gradient-to-t from-transparent dark:to-black/50 to-black/10 mb-20">
      <BubbleBlur />

      <div className="container">
        <motion.div
          className="flex flex-col items-center justify-center w-full gap-8"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={headerVariants}
        >
          <Image className="main-logo" src={logo} alt="logo" width={200} height={200} />
          <div className="relative w-full border-b border-t dark:border-mianColorDark border-green-600 ">
            <div className=" w-full h-16 rounded-3xl p-4 flex items-center justify-center backdrop-blur-xl">
              <ul className="flex items-center gap-8 w-full text-xl font-medium justify-center z-10 dark:text-mianColorDark text-green-700">
                <li>
                  <Link href="/">خانه</Link>
                </li>

                <li>
                  <Link href="/contents">مراسمات</Link>
                </li>

                <li>
                  <button onClick={() => scrollToElement("media")}>نوا نما</button>
                </li>

                <li>
                  <button onClick={() => scrollToElement("location")}>موقعیت هیئت</button>
                </li>

                <li>
                  <button onClick={() => scrollToElement("about")}>درباره هیئت</button>
                </li>
                <li>
                  <button onClick={() => scrollToElement("donate")}>کمک به هیئت</button>
                </li>
              </ul>
            </div>
          </div>
          <SocialSection />
        </motion.div>
      </div>
    </div>
  );
}

export default MainHeader;
