//@ts-nocheck
"use client";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { Form, Toggle, Uploader, SelectPicker } from "rsuite";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { IoTrashOutline } from "react-icons/io5";
import { uploaderStyle } from "@/json/style";

//components
import SubmitBtn from "@/components/shared/SubmitBtn";
import Field from "@/components/shared/Field";

//model
import { model } from "@/model/createCotnentModel";

//services
import { contentById, deleteContentFile, deleteContentImage, updateContentById } from "@/services/content/contentServices";
import { allEvents } from "@/services/events/eventsServices";

type UpdateContentFormValue = {
  title: string;
  desc: string;
  show: boolean;
  images?: any | null;
  files?: any | null;
  event: any;
};

function UpdateContent({ params }: { params: { id: string } }) {
  const formRef = useRef<any>();

  const [createValue, setCreateValue] = useState<string>("");
  const [fileList, setFileList] = useState<any>([]);
  const [fileSavedList, setFileSavedList] = useState<any>([]);
  const [imageList, setImageList] = useState<any>([]);
  const [imageFileList, setImageFileList] = useState<object[]>([]);
  const [publishTimeValue, setPublishTimeValue] = useState<string>("");
  const [formError, setFormError] = useState<any>({});
  const [formValue, setFormValue] = useState<UpdateContentFormValue>({
    title: "",
    desc: "",
    show: true,
    images: null,
    files: null,
    event: "",
  });

  // --------------------------------------------------------------

  const { data: eventData, isLoading: eventLoading } = useQuery({ queryFn: allEvents });

  const { data: getContentData, refetch } = useQuery(["contentById", params.id], () => contentById(params.id));

  const { data, error, isLoading, mutateAsync } = useMutation({ mutationFn: updateContentById });

  const { mutateAsync: mutateAsyncDeleteImage } = useMutation({
    mutationFn: deleteContentImage,
  });

  const { mutateAsync: mutateAsyncDeleteFile } = useMutation({
    mutationFn: deleteContentFile,
  });

  // --------------------------------------------------------------

  //get all data
  useEffect(() => {
    if (getContentData && getContentData.data && getContentData.data.content) {
      setFormValue({
        title: getContentData?.data?.content.title || "",
        desc: getContentData?.data?.content.desc || "",
        show: getContentData?.data?.content.show || "",
        files: getContentData?.data?.content.files || null,
        event: getContentData?.data?.content.event || null,
      });

      setCreateValue(getContentData?.data?.content.create || "");
      setPublishTimeValue(getContentData?.data?.content.publishTime || "");
      setFileList(getContentData?.data?.content.files || []);
      setFileSavedList(getContentData?.data?.content.files || []);
      setImageList(getContentData?.data?.content.images || []);
    }
  }, [getContentData]);

  // submit change data
  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    } else {
      try {
        const { title, desc, event, show, images, files } = formValue
        const createTimeNow = createValue.unix * 1000;
        const publishTimeNow = publishTimeValue.unix * 1000;
        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("create", createTimeNow);
        formData.append("publishTime", publishTimeNow);
        formData.append("show", show);
        formData.append("event", event);
        images.forEach((file: any) => {
          formData.append("images", file.blobFile);
        });
        files.forEach((file: any) => {
          formData.append("files", file.blobFile);
        });

        const res = await mutateAsync([params.id, formData]);
        if (res?.status == 201) {
          toast.success(res?.data?.message);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  // uploader set images and files
  const handleImageChange = (images: File) => {
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      images,
    }));
  };

  const handleFileChange = (files: File) => {
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      files,
    }));
  };

  // remove image from database
  const removeContentImageHandler = async (imageId: string) => {
    try {
      const res = await mutateAsyncDeleteImage({ contentId: params.id, imageId });
      if (res?.status === 202) {
        refetch();
        toast.success(res?.data?.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const removeContentFileHandler = async (fileId: string) => {
    try {
      const res = await mutateAsyncDeleteFile({ contentId: params.id, fileId });
      if (res?.status === 202) {
        refetch();
        toast.success(res?.data?.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  console.log(fileSavedList);

  return (
    <Form
      ref={formRef}
      onChange={setFormValue}
      onCheck={setFormError}
      formValue={formValue}
      model={model}
      className="flex flex-col justify-between h-full"
    >
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-8 text-base font-medium">
        <Field
          accepter={SelectPicker}
          name="event"
          label="مناسبت"
          data={eventData?.data?.events.map((item: any) => {
            return { label: item.title, value: item._id };
          })}
          loading={eventLoading}
        />

        <div className="flex flex-col">
          <label htmlFor="create">زمان برگذاری</label>
          <DatePicker style={{ width: "100%" }} name="create" value={createValue} onChange={setCreateValue} calendar={persian} locale={persian_fa} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="publishTime">زمان انتشار</label>
          <DatePicker
            style={{ width: "100%" }}
            name="publishTime"
            value={publishTimeValue}
            onChange={setPublishTimeValue}
            calendar={persian}
            locale={persian_fa}
          />
        </div>

        <Field name="title" label="عنوان مراسم" />

        <Field name="desc" label="توضیحات مراسم" />

        <Field accepter={Toggle} name="show" label="قابل رویت" />

        <div className="xl:col-span-3 lg:col-span-4 md:col-span-3 xs:col-span-2">
          <Form.Group>
            <Form.ControlLabel className="text-xl font-bold mb-4">تصاویر مراسم</Form.ControlLabel>

            <Uploader
              fileList={imageFileList}
              autoUpload={false}
              onChange={handleImageChange}
              draggable
              multiple
              listType="picture-text"
              accept="image/*"
            >
              <div style={uploaderStyle}>
                <span>تصویر مورد نظر را انتخاب کنید</span>
              </div>
            </Uploader>
          </Form.Group>
          {imageList?.length ? (
            <div className="flex flex-col gap-4">
              <span className="text-xl font-bold">تصاویر های آپلود شده</span>
              {imageList?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/public/${item.url}`}
                      alt={`Image ${index + 1}`}
                      className="rounded-lg object-cover h-16 w-16"
                    />
                    <div className="flex flex-col items-start">تصویر {index + 1}</div>
                  </div>
                  <button onClick={() => removeContentImageHandler(item._id)}>
                    <IoTrashOutline className="text-red-500 text-lg" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="xl:col-span-3 lg:col-span-4 md:col-span-3 xs:col-span-2">
          <Form.Group>
            <Form.ControlLabel className="text-xl font-bold mb-4">فایل ها صوتی و تصویری</Form.ControlLabel>
            <Uploader autoUpload={false} onChange={handleFileChange} draggable multiple accept="audio/mp3">
              <div style={uploaderStyle}>
                <span>فایل مورد نظر را انتخاب کنید</span>
              </div>
            </Uploader>
          </Form.Group>
          {fileSavedList?.length ? (
            <div className="flex flex-col gap-4">
              <span className="text-xl font-bold">فایل های صوتی آپلود شده</span>
              {fileSavedList?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <audio controls className="w-64">
                      <source src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.url}`} type="audio/mp3" />
                    </audio>
                    <div className="audio-details flex items-center gap-2">
                      <span>{item?.audioType} :</span>
                      <span>{item?.audioDesc}</span>
                    </div>
                  </div>

                  <button onClick={() => removeContentFileHandler(item._id)}>
                    <IoTrashOutline className="text-red-500 text-lg" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <Form.Group>
        <SubmitBtn submitFn={handleSubmit} label="ذخیره محتوا" />
      </Form.Group>
    </Form>
  );
}

export default UpdateContent;
