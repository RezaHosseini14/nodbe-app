import React, { ReactNode } from "react";

function Panel({
  col,
  row,
  title,
  children,
}: {
  col: number;
  row: number;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`col-span-${col} row-span-${row} dark:bg-red-500/35 bg-white/70 rounded-xl p-4 shadow-mainShadow`}
    >
      <h1 className="font-bold text-2xl">{title}</h1>
      {children}
    </div>
  );
}

export default Panel;
