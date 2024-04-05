import React from "react";
import { IconTypes } from "@/types/iconTypes";

function EditIcon({ mode }: IconTypes) {
  return (
    <>
      {mode ? (
        <span className="iconlyBulk-Edit-Square">
          <span className="path1"></span>
          <span className="path2"></span>
        </span>
      ) : (
        <i className="iconly-Edit-Square icli"></i>
      )}
    </>
  );
}

export default EditIcon;
