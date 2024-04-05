import React from "react";
import { IconTypes } from "@/types/iconTypes";

function EyeIcon({ mode }: IconTypes) {
  return (
    <>
      {mode ? (
        <span className="iconlyBulk-Show">
          <span className="path1"></span>
          <span className="path2"></span>
        </span>
      ) : (
        <i className="iconly-Show icli"></i>
      )}
    </>
  );
}

export default EyeIcon;
