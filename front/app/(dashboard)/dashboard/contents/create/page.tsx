//@ts-nocheck
"use client";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { Form, Toggle, Uploader, SelectPicker } from "rsuite";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { uploaderStyle } from "@/json/style";

//components
import SubmitBtn from "@/components/shared/SubmitBtn";
import Field from "@/components/shared/Field";

//model
import { model } from "@/model/createCotnentModel";

//services
import { createContent } from "@/services/content/contentServices";
import { allEvents } from "@/services/events/eventsServices";

type CreateContentFormValue = {
  title: string;
  desc: string;
  // type: string[];
  show: boolean;
  images?: any | null;
  files?: any | null;
  event: any;
};

function CreateContent() {
  const [createValue, setCreateValue] = useState<string>("");
  const [publishTimeValue, setPublishTimeValue] = useState<string>("");
  const [fileList, setFileList] = useState<object[]>([]);
  const [imageFileList, setImageFileList] = useState<object[]>([]);
  const [fileListDetails, setFileListDetails] = useState<object[]>([]);

  const formRef = useRef<any>();
  const [formError, setFormError] = useState<object>({});
  const [formValue, setFormValue] = useState<CreateContentFormValue>({
    title: "",
    desc: "",
    show: true,
    images: null,
    files: null,
    event: "",
  });

  const { data: eventData, isLoading: eventLoading } = useQuery({ queryFn: allEvents });
  const { isLoading, mutateAsync } = useMutation({ mutationFn: createContent });

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    } else {
      try {
        const { title, desc, event, show, images, files } = formValue;
        const createTimeNow = createValue.unix * 1000;
        const publishTimeNow = publishTimeValue.unix * 1000;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        // formData.append("type", type);
        formData.append("create", createTimeNow.toString());
        formData.append("publishTime", publishTimeNow.toString());
        formData.append("show", show);
        formData.append("event", event);

        formData.append("fileList", JSON.stringify(fileList));

        images.forEach((file: any) => {
          formData.append("images", file.blobFile);
        });

        fileList.forEach((file: any) => {
          formData.append("files", file.blobFile);
        });

        const res = await mutateAsync(formData);
        if (res?.status == 201) {
          toast.success(res?.data?.message);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

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

    // setFileList(formValue.files);
    setFileList(files);
  };

  const handleAudioDetails = (index: number, value: string, property: string) => {
    const updatedFileList = [...fileList];

    updatedFileList[index][property] = value;
    setFileList(updatedFileList);
    const filteredMamad = fileList.map(({ audioType, audioDesc }) => ({ audioType, audioDesc }));
    setFileListDetails(filteredMamad);
  };

  const audioType = [
    { label: "سخنرانی", value: "سخنرانی" },
    { label: "روضه", value: "روضه" },
    { label: "تک", value: "تک" },
    { label: "زمینه", value: "زمینه" },
    { label: "شور", value: "شور" },
    { label: "واحد", value: "واحد" },
    { label: "واحد تند", value: "واحد تند" },
    { label: "روضه پایانی", value: "روضه پایانی" },
  ];

  return (
    <Form
      ref={formRef}
      onChange={setFormValue}
      onCheck={setFormError}
      formValue={formValue}
      model={model}
      className="flex flex-col justify-between h-full"
    >
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-8 text-base font-medium">
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
          <DatePicker
            style={{ width: "100%" }}
            name="create"
            value={createValue}
            onChange={setCreateValue}
            calendar={persian}
            locale={persian_fa}
          />
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

        <Form.Group className="xl:col-span-3 lg:col-span-4 md:col-span-3 col-span-2">
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

        <Form.Group className="xl:col-span-3 lg:col-span-4 md:col-span-3 col-span-2">
          <Form.ControlLabel className="text-xl font-bold mb-4">
            فایل ها صوتی و تصویری
          </Form.ControlLabel>
          <Uploader
            fileList={fileList}
            autoUpload={false}
            onChange={handleFileChange}
            draggable
            multiple
            accept="audio/mp3"
          >
            <div style={uploaderStyle}>
              <span>فایل مورد نظر را انتخاب کنید</span>
            </div>
          </Uploader>
          {fileList?.map((item, index) => (
            <div key={index} className="col-span-2 grid grid-cols-2 gap-8 mt-4">
              <div className="col-span-1">
                <Field
                  name={`audioType${index}`}
                  label="نوع صوت"
                  accepter={SelectPicker}
                  data={audioType}
                  onChange={(value) => handleAudioDetails(index, value, "audioType")}
                />
              </div>
              <div className="col-span-1">
                <Field
                  name={`audioDesc${index}`}
                  label="توضیحات صوت"
                  onChange={(value) => handleAudioDetails(index, value, "audioDesc")}
                />
              </div>
            </div>
          ))}
        </Form.Group>
      </div>

      <Form.Group>
        <SubmitBtn submitFn={handleSubmit} label="ذخیره محتوا" />
      </Form.Group>
    </Form>
  );
}

export default CreateContent;
