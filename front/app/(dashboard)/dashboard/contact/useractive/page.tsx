"use client";
import { useQuery } from "react-query";
import { Table } from "rsuite";
//services
import { bestUser } from "@/services/contact/contactServices";
//functions
import { shamsi } from "@/utils/functions";
import TabelTitle from "@/components/pages/dashboard/components/TabelTitle";

const { Column, HeaderCell, Cell } = Table;
function UserActivity() {
  const { data, isLoading } = useQuery({ queryFn: bestUser });
  return (
    <div>
      <TabelTitle title="فعالیت کاربران" />
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
        <Column width={70} align="center">
          <HeaderCell align="center">شناسه</HeaderCell>
          <Cell align="center">{(rowData, index: number) => <p>{index + 1}</p>}</Cell>
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
