import React from "react";
import arrow from "@/assets/img/arrow.svg";
import Image from "next/image";

function Arrow() {
  return <Image className="arrow" src={arrow} width="100" height="50" alt="arrow" />;
}

export default Arrow;
