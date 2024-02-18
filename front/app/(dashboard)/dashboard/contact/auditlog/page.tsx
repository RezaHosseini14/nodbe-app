"use client";
import { useQuery } from "react-query";
import { allAuditLogs } from "@/services/contact/contactServices";
import { shamsi } from "@/utils/functions";
import { Pagination, Table } from "rsuite";
import { useState } from "react";

const { Column, HeaderCell, Cell } = Table;
function AuditLogPage() {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const handleChangeLimit = (dataKey: any) => {
    setPage(1);
    setLimit(dataKey);
  };

  const { data, error, isLoading, refetch } = useQuery(
    ["auditLog", page, limit],
    () => allAuditLogs(page, limit),
    {
      keepPreviousData: true,
    }
  );
  return (
    <div>
      <div className="block mb-4">
        <h2 className="text-2xl">کاربران</h2>
      </div>
      <Table
        className="rounded-xl"
        height={400}
        data={data?.data?.auditLogs}
        loading={isLoading}
        hover={true}
        autoHeight={true}
        bordered={true}
        cellBordered={true}
      >
        <Column width={70} align="center" fixed>
          <HeaderCell align="center">شناسه</HeaderCell>
          <Cell align="center">
            {(rowData: any, index: any) => <p>{page * limit - limit + index + 1}</p>}
          </Cell>
        </Column>
        <Column width={150}>
          <HeaderCell align="center">username</HeaderCell>
          <Cell align="center" dataKey="username" />
        </Column>

        <Column width={120}>
          <HeaderCell align="center">ip</HeaderCell>
          <Cell align="center" dataKey="ip" />
        </Column>

        <Column width={100}>
          <HeaderCell align="center">baseUrl</HeaderCell>
          <Cell align="center" dataKey="baseUrl" />
        </Column>

        {/* <Column flexGrow={1}>
          <HeaderCell align="center">pathname</HeaderCell>
          <Cell align="center" dataKey="pathname" />
        </Column> */}

        <Column flexGrow={1}>
          <HeaderCell align="center">url</HeaderCell>
          <Cell align="center" dataKey="url" />
        </Column>

        <Column width={100}>
          <HeaderCell align="center">method</HeaderCell>
          <Cell align="center">
            {(rowData: any) => {
              switch (rowData.method) {
                case "GET":
                  return (
                    <div className="bg-green-100 border border-green-600 text-green-600 font-medium px-2 py-1 rounded-xl w-24 text-center text-xs">
                      GET
                    </div>
                  );
                  break;

                case "POST":
                  return (
                    <div className="bg-red-100 border border-red-600 text-red-600 font-medium px-2 py-1 rounded-xl w-24 text-center text-xs">
                      POST
                    </div>
                  );
                  break;

                case "PUT":
                  return (
                    <div className="bg-orange-100 border border-orange-600 text-orange-600 font-medium px-2 py-1 rounded-xl w-24 text-center text-xs">
                      PUT
                    </div>
                  );
                  break;

                case "DELETE":
                  return (
                    <div className="bg-red-100 border border-red-600 text-red-600 font-medium px-2 py-1 rounded-xl w-24 text-center text-xs">
                      DELETE
                    </div>
                  );
                  break;

                default:
                  return "asdg";
                  break;
              }
            }}
          </Cell>
        </Column>

        <Column width={80}>
          <HeaderCell align="center">browser</HeaderCell>
          <Cell align="center" dataKey="browser" />
        </Column>

        <Column width={70}>
          <HeaderCell align="center">browserType</HeaderCell>
          <Cell align="center" dataKey="browserType" />
        </Column>

        <Column width={200}>
          <HeaderCell align="center">osInfo</HeaderCell>
          <Cell align="center" dataKey="osInfo" />
        </Column>

        <Column width={100}>
          <HeaderCell align="center">زمان درخواست</HeaderCell>
          <Cell align="center">{(rowData) => shamsi(rowData.createdAt)}</Cell>
        </Column>
      </Table>
      <div className="pt-6">
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          total={data?.data?.total}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </div>
  );
}

export default AuditLogPage;
