"use client";
import { allUser, blockUser, deleteUser } from "@/services/contact/contactServices";
import { getRoles, shamsi } from "@/utils/functions";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Pagination, Table } from "rsuite";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import Link from "next/link";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/shared/ConfirmModal";
const { Column, HeaderCell, Cell } = Table;

function ContactPage() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<boolean>(false);
  const [rowDataId, setRowDataId] = useState<string>("");

  const handleOpen = (id: string) => {
    setOpen(true);
    setRowDataId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setRowDataId("");
  };

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const { data, error, isLoading, refetch } = useQuery(
    ["allUser", page, limit],
    () => allUser(page, limit),
    {
      keepPreviousData: true,
    }
  );

  const {
    data: userDeleteData,
    error: userDeleteError,
    isLoading: useDeleteIsLoading,
    mutateAsync,
  } = useMutation({ mutationsKey: ["deleteUser"], mutationFn: deleteUser });

  const {
    data: dataBlock,
    error: errorBlock,
    isLoading: isLoadingBlock,
    mutateAsync: mutateAsyncBlock,
  } = useMutation({ mutationsKey: ["Block"], mutationFn: blockUser });

  const removeUserHandler = async (id: string) => {
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

  const blockUserHandler = async (id: string) => {
    try {
      const res = await mutateAsyncBlock(id);
      if (res?.status == 200) {
        refetch();
        toast.success(res?.data?.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="h-full">
      <div className="block mb-4">
        <h2 className="text-2xl">کاربران</h2>
      </div>
      <Table
        className="rounded-xl h-full"
        data={data?.data?.users}
        loading={isLoading}
        hover={true}
        autoHeight={true}
        bordered={true}
        cellBordered={true}
      >
        <Column flexGrow={1} align="center" fixed>
          <HeaderCell>شناسه</HeaderCell>
          <Cell dataKey="_id" />
        </Column>

        <Column width={150}>
          <HeaderCell align="center">نام</HeaderCell>
          <Cell align="center" dataKey="first_name" />
        </Column>

        <Column width={150}>
          <HeaderCell align="center">نام خانوادگی</HeaderCell>
          <Cell align="center" dataKey="last_name" />
        </Column>

        <Column width={100}>
          <HeaderCell align="center">نام کاربری</HeaderCell>
          <Cell align="center" dataKey="username" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell align="center">زمان عضویت</HeaderCell>
          <Cell align="center">{(rowData) => shamsi(rowData.createdAt)}</Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell align="center">نقش کاربر</HeaderCell>
          <Cell align="center">{(rowData) => getRoles(rowData?.roles)}</Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell align="center">وضعیت کاربر</HeaderCell>
          {/* <Cell>{(rowData) => (rowData.status ? "true" : "fasle")}</Cell> */}
          <Cell align="center">
            {(rowData) => (
              <button
                onClick={() => blockUserHandler(rowData._id)}
                className={`rounded-lg hover:text-white transition w-32 ${
                  rowData.status
                    ? "r bg-red-500 hover:bg-red-300/50 text-white hover:text-red-500"
                    : "bg-green-300/30 hover:bg-green-500  text-green-500"
                }  `}
              >
                {rowData.status ? "مسدود" : "عادی"}
              </button>
            )}
          </Cell>
        </Column>

        <Column width={80} fixed="right">
          <HeaderCell>...</HeaderCell>

          <Cell align="center">
            {(rowData) => (
              <div className="flex items-center gap-4">
                <Link href={`/dashboard/contact/update/${rowData._id}`}>
                  <IoCreateOutline className="text-blue-500 text-lg" />
                </Link>

                <Link href={``} onClick={() => handleOpen(rowData._id)}>
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
      <ConfirmModal
        message="کاربر حذف شود ؟"
        open={open}
        handleClose={handleClose}
        apiFunc={removeUserHandler}
        id={rowDataId}
      />
    </div>
  );
}

export default ContactPage;
