"use client";
import React from "react";
import { useMutation, useQuery } from "react-query";
import Link from "next/link";
import toast from "react-hot-toast";

//icons
import { IoTrashOutline } from "react-icons/io5";

//components
import Loading from "@/components/shared/Loading";
import NotFoundData from "@/components/shared/NotFoundData";

//services
import { allEvents, deleteEvent } from "@/services/events/eventsServices";
import TrashIcon from "@/components/shared/icons/TrashIcon";
import EditIcon from "@/components/shared/icons/EditIcon";
import TabelTitle from "@/components/pages/dashboard/components/TabelTitle";

function EventsPage() {
  const { data, isLoading, refetch } = useQuery({ queryFn: allEvents });

  const { data: deleteEventData, error: deleteEventError, isLoading: deleteEventIsLoading, mutateAsync } = useMutation({ mutationFn: deleteEvent });

  const removeEventHandler = async (id: string) => {
    try {
      const res = await mutateAsync(id);
      if (res?.status == 200) {
        refetch();
        toast.success(res?.data?.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <NotFoundData data={data?.data?.events} message={"مناسبتی"} messageClass="font-bold text-lg text-gray-400">
          <div className="flex flex-col gap-4">
            <TabelTitle title="مناسبت ها" />

            {data?.data?.events
              .filter((item: any) => item.parent_id === null)
              .map((event: any, index: number) => (
                <li key={index} className="flex flex-col gap-4 border border-mianColor p-2 rounded-xl">
                  <div className="flex items-center justify-between bg-mianColor text-white px-4 py-3 font-bold rounded-md">
                    <div>{event.title}</div>
                    <div className="flex items-center gap-4">
                      <Link href={`/dashboard/event/update/${event._id}`} className="inline-flex text-blue-600 hover:text-blue-800 transition">
                        <EditIcon mode={true} />
                      </Link>
                      <Link
                        href={``}
                        onClick={() => {
                          removeEventHandler(event._id);
                        }}
                        className="inline-flex text-red-600 hover:text-red-800 text-lg transition"
                      >
                        <TrashIcon mode={true} />
                      </Link>
                    </div>
                  </div>
                  <ul className="gap-4 grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2">
                    {data?.data?.events
                      .filter((item: any) => item.parent_id === event._id)
                      .map((childItem: any, index: number) => (
                        <li key={index} className="flex items-center justify-between w-full bg-mianColor/20 px-4 py-2 rounded-md">
                          <span key={childItem._id}>{childItem.title}</span>

                          <div className="flex items-center gap-4">
                            <Link
                              href={`/dashboard/event/update/${childItem._id}`}
                              className="inline-flex text-left text-blue-600 hover:text-blue-800 transition"
                            >
                              <EditIcon mode={true} />
                            </Link>
                            <Link
                              href={``}
                              onClick={() => {
                                removeEventHandler(childItem._id);
                              }}
                              className="inline-flex text-red-600 hover:text-red-800 text-lg transition"
                            >
                              <TrashIcon mode={true} />
                            </Link>
                          </div>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
          </div>
        </NotFoundData>
      )}
    </>
  );
}

export default EventsPage;
