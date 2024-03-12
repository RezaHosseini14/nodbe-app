import React from "react";
import Arrow from "./icons/Arrow";

function TitleBox({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mb-6 dark:text-white text-mianColor">
      <h2 className="font-bold text-2xl">{title}</h2>
      <Arrow />
    </div>
  );
}

export default TitleBox;
