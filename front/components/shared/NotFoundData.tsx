import React from "react";

function NotFoundData(props) {
  return (
    <>
      {props.data.length ? (
        props.children
      ) : (
        <div
          className={`flex items-center justify-center h-full ${props.messageClass}`}
        >{`${props.message} یافت نشد`}</div>
      )}
    </>
  );
}

export default NotFoundData;
