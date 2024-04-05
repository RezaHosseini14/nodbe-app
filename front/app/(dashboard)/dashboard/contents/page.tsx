"use client";
import { useState } from "react";
import { Pagination, Table } from "rsuite";
import { useMutation, useQuery } from "react-query";
import toast from "react-hot-toast";
import Link from "next/link";
import { shamsi } from "@/utils/functions";

//icons
import TrashIcon from "@/components/shared/icons/TrashIcon";
import EditIcon from "@/components/shared/icons/EditIcon";
import EyeIcon from "@/components/shared/icons/EyeIcon";

//components
import ConfirmModal from "@/components/shared/ConfirmModal";
import TabelTitle from "@/components/pages/dashboard/components/TabelTitle";

//services
import { allContentAdmin, changeShowContent, deleteContent } from "@/services/content/contentServices";

const { Column, HeaderCell, Cell } = Table;
function ContentPage() {
  //pagination
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [rowDataId, setRowDataId] = useState<string>("");
  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  //get all content for admin
  const { data, isLoading, refetch } = useQuery(["content", page, limit], () => allContentAdmin(page, limit), {
    keepPreviousData: true,
  });

  //remove content
  const { mutateAsync } = useMutation({ mutationFn: deleteContent });

  const { mutateAsync: mutateAsyncShowContent } = useMutation({
    mutationFn: changeShowContent,
  });

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

  const changeShowContentHandler = async (id: string) => {
    try {
      const res = await mutateAsyncShowContent(id);
      if (res?.status == 200) {
        refetch();
        toast.success(res?.data?.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleOpen = (id: string) => {
    setOpen(true);
    setRowDataId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setRowDataId("");
  };

  return (
    <div>
      <TabelTitle
        title="محتوا ها"
        buttons={[
          {
            url: "/dashboard/contents/create",
            title: "ایجاد محتوا",
            bg: "bg-mianColor hover:bg-mianColor/70",
            color: "text-white",
          },
        ]}
      />

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
        <Column width={70} align="center">
          <HeaderCell align="center">شناسه</HeaderCell>
          <Cell align="center">{(rowData, index) => <p>{page * limit - limit + index + 1}</p>}</Cell>
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
              <div className="cursor-pointer" onClick={() => changeShowContentHandler(rowData._id)}>
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
                <Link className="text-blue-500 text-lg" href={`/dashboard/contents/update/${rowData._id}`}>
                  <EditIcon mode={true} />
                </Link>
                <Link className="text-blue-500 text-lg" href={`/content/${rowData._id}`}>
                  <EyeIcon mode={true} />
                </Link>
                <Link className="text-red-500 text-lg" href={``} onClick={() => handleOpen(rowData._id)}>
                  <TrashIcon mode={true} />
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
      <ConfirmModal message="مراسم حذف شود ؟" open={open} handleClose={handleClose} apiFunc={removeContentHandler} id={rowDataId} />
    </div>
  );
}

export default ContentPage;
