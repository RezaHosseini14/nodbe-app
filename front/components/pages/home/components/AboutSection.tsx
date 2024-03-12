import TitleBox from "@/components/shared/TitleBox";
import { cardVariants } from "@/utils/constant";
import { motion } from "framer-motion";

function AboutSection() {
  return (
    <motion.div
      id="about"
      className="lg:col-span-4 col-span-8 row-span-3 card sp_card"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      variants={cardVariants}
    >
      <TitleBox title="درباره هیئت" />
      <p className="text-lg text-justify">
        بسم الله الرحمن الرحیم
        <br />
        فرزند حسین این حوالی است هنوز
        <br />
        «هل من ناصر» جمله سوالی است هنوز
        <br />
        هیئت شباب‌المهدی عجل‌ الله‌ تعالی‌ فرجه‌ الشریف در سال ۱۳۹۸ با مدد حضرات معصومین فعالیت خود
        را آغاز نمود. شباب‌المهدی تا به امروز بحمدلله سنگری در جبهه فرهنگی،‌ مَدرسی در کسب معارف
        دینی، میعادگاهی در روابط اجتماعی و‌ مقرّی در فعالیت‌های جهادی بوده است. محفل توسل هفتگی هیئت
        شباب‌المهدی عج‌، چهارشنبه‌ها پس از نماز مغرب و عشاء برگزار می‌گردد. «ندبه» نام مسیرهای
        رسانه‌ای هیئت شباب‌المهدی است و شما مخاطب گرامی می‌توانید با دنبال نمودن «ندبه» در شبکه‌های
        اجتماعی از اطلاع‌رسانی جلسات مطلع گردید.
      </p>
    </motion.div>
  );
}

export default AboutSection;
