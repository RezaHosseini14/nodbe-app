import Image from "next/image";
import { motion } from "framer-motion";

import Loading from "@/components/shared/Loading";
import defaultimg from "@/assets/img/default-placeholder.png";
import LightBox from "@/components/shared/LightBox";
import { cardVariants } from "@/utils/constant";

function PosterSection({ posterData, posterLoading }: any) {
  return (
    <>
      <motion.div
        className="lg:col-span-3 col-span-8 row-span-1 card sp_card"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        variants={cardVariants}
      >
        {posterLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            <LightBox>
              {posterData?.data?.poster && posterData?.data?.poster.length > 0 ? (
                <div className="bg-white rounded-xl overflow-hidden aspect-[1/1.41] mb-4 w-full z-10 relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${posterData?.data?.poster[0]?.image}`}
                    alt="img"
                    layout="fill"
                    loading="lazy"
                    objectFit="cover"
                    quality={1}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="bg-white rounded-xl overflow-hidden aspect-[1/1.41] mb-4 w-full z-10 relative">
                  <Image
                    className="poster-img object-cover"
                    loader={posterLoading}
                    loading="lazy"
                    src={defaultimg}
                    alt="defaultimg"
                  />
                </div>
              )}

              <div className="">
                {posterData?.data?.poster[0] ? (
                  <>
                    <p className="text-center font-bold text-lg">
                      {posterData?.data?.poster[0]?.title}
                    </p>
                    <p className="text-center text-base">{posterData?.data?.poster[0]?.create}</p>
                    <p className="text-center text-base">{posterData?.data?.poster[0]?.desc}</p>
                  </>
                ) : (
                  <>
                    <p className="text-center font-bold text-lg">مراسم بعدی متعاقبا اعلام میشود</p>
                  </>
                )}
              </div>
            </LightBox>
          </>
        )}
      </motion.div>
    </>
  );
}

export default PosterSection;
