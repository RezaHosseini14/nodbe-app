import React from "react";
import { IconTypes } from "@/types/iconTypes";

function TrashIcon({ mode }: IconTypes) {
  return (
    <>
      {mode ? (
        <span className="iconlyBulk-Delete">
          <span className="path1"></span>
          <span className="path2"></span>
        </span>
      ) : (
        <i className="iconly-Delete icli"></i>
      )}
    </>
  );
}

export default TrashIcon;
