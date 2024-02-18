"use client";
import { Table } from "rsuite";
import { useQuery } from "react-query";
import Link from "next/link";
import { bestUser } from "@/services/contact/contactServices";
import { shamsi } from "@/utils/functions";
const { Column, HeaderCell, Cell } = Table;

function UserActivity() {
  const { data, error, isLoading } = useQuery({ queryFn: bestUser });
  return (
    <div>
      <div className="block mb-4 border-b-mianColor">
        <h2 className="text-2xl font-bold">کاربران بر اساس عملکرد</h2>
      </div>
      <Table
        className="rounded-xl"
        height={400}
        data={data?.data?.users}
        loading={isLoading}
        hover={true}
        autoHeight={true}
        bordered={true}
        cellBordered={true}
      >
        <Column width={70} align="center" fixed>
          <HeaderCell align="center">شناسه</HeaderCell>
          <Cell align="center">{(rowData, index: any) => <p>{index + 1}</p>}</Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell align="center">نام</HeaderCell>
          <Cell align="center" dataKey="first_name" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell align="center">نام خانوادگی</HeaderCell>
          <Cell align="center" dataKey="last_name" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell align="center">نام کاربری</HeaderCell>
          <Cell align="center" dataKey="username" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell align="center">آخرین محتوا منتشر شده</HeaderCell>
          <Cell align="center">{(rowData) => shamsi(rowData?.lastPublishedDate)}</Cell>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell align="center">تعداد محتوا ها</HeaderCell>
          <Cell align="center" dataKey="totalContent" />
        </Column>
      </Table>
    </div>
  );
}

export default UserActivity;
