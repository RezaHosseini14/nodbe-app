"use client";
import { Pagination, Table } from "rsuite";
import { useMutation, useQuery } from "react-query";
import toast from "react-hot-toast";
import Link from "next/link";
import { IoEyeOutline, IoTrashOutline, IoCreateOutline } from "react-icons/io5";

import { allContent, allContentAdmin, deleteContent } from "@/services/content/contentServices";
import { shamsi } from "@/utils/functions";
import { useState } from "react";
const { Column, HeaderCell, Cell } = Table;

function ContentPage() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const { data, error, isLoading, refetch } = useQuery(
    ["content", page, limit],
    () => allContentAdmin(page, limit),
    {
      keepPreviousData: true,
    }
  );

  const {
    data: deleteContentData,
    error: deleteContentError,
    isLoading: deleteContentIsLoading,
    mutateAsync,
  } = useMutation({ mutationFn: deleteContent });

  const removeContentHandler = async (id: string) => {
    try {
      const res = await mutateAsync(id);
      if (res?.status == 202) {
        refetch();
        toast.success(res?.data?.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="block mb-4">
        <h2 className="text-2xl">محتوا ها</h2>
      </div>
      <Table
        className="rounded-xl"
        height={400}
        data={data?.data?.contents}
        loading={isLoading}
        hover={true}
        autoHeight={true}
        bordered={true}
        cellBordered={true}
      >
        <Column width={70} align="center" fixed>
          <HeaderCell align="center">شناسه</HeaderCell>
          <Cell align="center">
            {(rowData, index) => <p>{page * limit - limit + index + 1}</p>}
          </Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell align="center">مراسم</HeaderCell>
          <Cell align="center" dataKey="title" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell align="center">توضیحات</HeaderCell>
          <Cell align="center" dataKey="desc" />
        </Column>

        <Column width={170}>
          <HeaderCell align="center">زمان مجلس</HeaderCell>
          <Cell align="center">{(rowData) => shamsi(rowData.create)}</Cell>
        </Column>

        <Column width={170}>
          <HeaderCell align="center">زمان انتشار</HeaderCell>
          <Cell align="center">{(rowData) => shamsi(rowData.publishTime)}</Cell>
        </Column>

        <Column width={170}>
          <HeaderCell align="center">نمایش</HeaderCell>
          <Cell align="center" verticalAlign="middle">
            {(rowData) => (
              <div className="">
                {rowData.show ? (
                  <div className="bg-green-100 border border-green-600 text-green-600 font-medium px-4 py-1 rounded-xl w-24 text-center text-xs">
                    نمایش
                  </div>
                ) : (
                  <div className="bg-red-300 border border-red-800 text-red-800 font-medium px-4 py-1 rounded-xl w-24 text-center text-xs">
                    عدم نمایش
                  </div>
                )}
              </div>
            )}
          </Cell>
        </Column>

        <Column width={170}>
          <HeaderCell align="center">انتشار</HeaderCell>
          <Cell align="center" verticalAlign="middle">
            {(rowData) => {
              const publish = new Date(rowData?.publishTime).getTime();
              const nowTime = new Date().getTime();

              if (publish <= nowTime) {
                return (
                  <div className="bg-green-100 border border-green-600 text-green-600 font-medium px-4 py-1 rounded-xl w-24 text-center text-xs">
                    منتشر شده
                  </div>
                );
              } else {
                return (
                  <div className="bg-red-100 border border-red-600 text-red-600 font-medium px-4 py-1 rounded-xl w-24 text-center text-xs">
                    منتشر نشده
                  </div>
                );
              }
            }}
          </Cell>
        </Column>

        <Column width={100} fixed="right">
          <HeaderCell align="center"> </HeaderCell>

          <Cell align="center">
            {(rowData) => (
              <div className="flex items-center gap-4">
                <Link href={`/dashboard/contents/update/${rowData._id}`}>
                  <IoCreateOutline className="text-blue-500 text-lg" />
                </Link>
                <Link href={`/content/${rowData._id}`}>
                  <IoEyeOutline className="text-blue-500 text-lg" />
                </Link>
                <Link href={``} onClick={() => removeContentHandler(rowData._id)}>
                  <IoTrashOutline className="text-red-500 text-lg" />
                </Link>
              </div>
            )}
          </Cell>
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

export default ContentPage;
