"use client";
import { allEvents } from "@/services/events/eventsServices";
import React from "react";
import { useQuery } from "react-query";
import { Accordion } from "rsuite";

function EventSidebar() {
  const { data: eventData, isLoading: eventLoading } = useQuery({ queryFn: allEvents });

  return (
    <div className="flex flex-col bg-white w-80 rounded-lg p-4 sticky top-5">
      {eventData?.data?.events
        .filter((item: any) => item.parent_id === null)
        .map((event: any, index: number) => (
          <Accordion key={index}>
            <Accordion.Panel header={event.title}>
              {eventData?.data?.events
                .filter((item: any) => item.parent_id === event._id)
                .map((childItem: any, index: number) => (
                  <li
                    key={index}
                    className="flex items-center justify-between w-full px-4 py-2 rounded-md"
                  >
                    <div key={childItem._id}>{childItem.title}</div>
                  </li>
                ))}
            </Accordion.Panel>
          </Accordion>
        ))}
    </div>
  );
}

export default EventSidebar;
