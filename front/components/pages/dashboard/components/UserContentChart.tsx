import { useQuery } from "react-query";
import { contentuser } from "@/services/content/contentServices";
import { shamsi } from "@/utils/functions";

import Loading from "@/components/shared/Loading";

function UserContentChart() {
  const { data, error, isLoading } = useQuery({ queryKey: ["userconten"], queryFn: contentuser });
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex items-start flex-col w-full gap-8 h-full">
          <div className="flex items-center justify-between w-full">
            <span className="font-bold text-base">محتوا ها منتشر شده (من) :</span>
            <span className="text-xl font-extrabold">{data?.data?.contents?.length}</span>
          </div>
          <ul
            style={{ height: " calc(100% - 3rem)" }}
            className="flex flex-col gap-6 w-full overflow-y-auto pl-3"
          >
            {data?.data?.contents?.map((contnet: any, index: number) => (
              <li
                key={index}
                className="flex items-center justify-between w-full p-3 rounded-xl bg-mianColor/30 border border-mianColor"
              >
                <span>{contnet?.title}</span>
                <span>{shamsi(contnet?.create)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default UserContentChart;
