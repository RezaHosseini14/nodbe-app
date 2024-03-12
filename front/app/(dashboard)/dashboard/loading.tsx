import { BeatLoader } from "react-spinners";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex justify-center items-center h-full w-full">
      <BeatLoader color="var(--mainColor)" />
    </div>
  );
}
