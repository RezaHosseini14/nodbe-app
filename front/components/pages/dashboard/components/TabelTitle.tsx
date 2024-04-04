import Link from "next/link";
import React, { ReactNode } from "react";

interface Button {
  url: string;
  title: string;
  icon?: ReactNode;
  bg?: string;
  color?: string;
}

function TabelTitle({ title, buttons }: { title: string; buttons?: Button[] }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {buttons?.length && (
        <div className="flex items-center gap-4">
          {buttons.map((button, index) => (
            <Link key={index} className={`${button.bg} ${button.color} transition text-base font-semibold px-4 py-2 rounded-lg flex items-center gap-2`} href={button.url}>
              {button.title}
              {button.icon}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default TabelTitle;
