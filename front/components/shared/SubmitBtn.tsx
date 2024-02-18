import React from "react";

function SubmitBtn({ submitFn, label }: any) {
  return (
    <button
      className="bg-mianColor text-white rounded-xl py-2 px-4 mt-8 font-bold text-lg"
      onClick={submitFn}
    >
      {label}
    </button>
  );
}

export default SubmitBtn;
