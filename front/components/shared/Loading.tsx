import { BeatLoader } from "react-spinners";

function Loading({ customColor }: { customColor?: string }) {
  
  return (
    <div className="flex justify-center items-center h-full w-full">
      <BeatLoader color={`${customColor ? customColor : "var(--mainColor)"}`} />
    </div>
  );
}

export default Loading;
