import React, { ReactNode } from "react";
import { IoLogoInstagram } from "react-icons/io5";
import { SiAparat } from "react-icons/si";
import { FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";
import { Tooltip, Whisper } from "rsuite";
import BaleIcon from "@/components/shared/icons/BaleIcon";
interface ISocialMedia {
  social: string;
  link: string;
  message: string;
  icon: ReactNode;
}

function SocialSection() {
  const socialMedia: ISocialMedia[] = [
    {
      social: "بله",
      link: "/",
      message: "عضویت در پیامرسان بله",
      icon: <BaleIcon />,
    },
    ,
    {
      social: "آپارات",
      link: "/",
      message: "عضویت در پیامرسان آپارات",
      icon: <SiAparat />,
    },
    {
      social: "اینستاگرام",
      link: "/",
      message: "عضویت در پیامرسان اینستاگرام",
      icon: <IoLogoInstagram />,
    },
    {
      social: "تلگرام",
      link: "/",
      message: "عضویت در پیامرسان تلگرام",
      icon: <FaTelegramPlane />,
    },
  ];
  return (
    <div className="flex items-center gap-4 text-2xl z-50">
      {socialMedia.map((item: any, index: number) => (
        <Whisper
          key={index}
          placement="bottom"
          controlId="control-id-hover"
          trigger="hover"
          speaker={<Tooltip className="text-lg">{item.message}</Tooltip>}
        >
          <Link
            className="w-10 h-10 rounded-lg bg-mianColor/15 dark:bg-mianColorDark/15 hover:bg-mianColor/25 transition grid place-content-center"
            href={item.link}
          >
            <span className="text-mianColor dark:text-mianColorDark">{item.icon}</span>
          </Link>
        </Whisper>
      ))}
    </div>
  );
}

export default SocialSection;
