"use client";
import { useState } from "react";
import { useQuery } from "react-query";
import { SelectPicker } from "rsuite";

// services
import { allContent } from "@/services/content/contentServices";
import { allEvents } from "@/services/events/eventsServices";

// components
import Card from "@/components/shared/Card";
import TitleBox from "@/components/shared/TitleBox";
import PageLoading from "@/components/shared/PageLoading";
import { toPersianYear } from "@/utils/functions";

function FrontContentsPage() {
  const [slug, setSlug] = useState<string>(null);
  const [year, setYear] = useState<number>(null);

  const { data: eventData, isLoading: eventLoading } = useQuery({ queryFn: allEvents });
  const { data } = useQuery(["allcontent", slug, year], () => allContent(slug, year));

  //year input data
  const currentYear = new Date();
  let yearData = [];

  for (let index = 0; index < 10; index++) {
    const gregorianYear = currentYear.getFullYear() - index;
    const persianYear = toPersianYear(gregorianYear);

    yearData.push({
      label: persianYear,
      value: gregorianYear,
    });
  }

  return (
    <>
      <PageLoading loading={eventLoading}>
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <TitleBox title="مراسمات" />
            <div className="flex items-center gap-4">
              <SelectPicker
                name="event"
                label="مناسبت"
                data={eventData?.data?.events.map((item: any) => {
                  return { label: item.title, value: item._id };
                })}
                loading={eventLoading}
                onChange={setSlug}
              />

              <SelectPicker
                name="year"
                label="سال"
                data={yearData}
                onChange={setYear}
                searchable={false}
              />
            </div>
          </div>

          <div className="flex items-start gap-8">
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-8 w-full">
              {data?.data?.contents.length ? (
                data?.data?.contents.map((content: any, index: number) => (
                  <Card data={content} index={index} />
                ))
              ) : (
                <div className="flex items-center justify-center col-span-4 h-full">
                  <h1 className="text-lg font-bold text-gray-500">مراسمی یافت نشد</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageLoading>
    </>
  );
}

export default FrontContentsPage;
