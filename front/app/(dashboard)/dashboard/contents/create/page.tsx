"use client";
import SubmitBtn from "@/components/shared/SubmitBtn";
import { uploaderStyle } from "@/json/style";
import { model } from "@/model/createCotnentModel";
import { createContent } from "@/services/content/contentServices";
import { allEvents } from "@/services/events/eventsServices";
import { forwardRef, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { Form, Toggle, Uploader, SelectPicker } from "rsuite";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const Field = forwardRef((props: any, ref: any) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group
      controlId={`${name}-10`}
      ref={ref}
      className={error ? "has-error" : ""}
      classPrefix="w-full "
    >
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <Form.Control
        classPrefix="w-full relative"
        className="w-full"
        name={name}
        accepter={accepter}
        errorMessage={error}
        {...rest}
      />
      <Form.HelpText>{message}</Form.HelpText>
    </Form.Group>
  );
});

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

  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const [formValue, setFormValue] = useState<CreateContentFormValue>({
    title: "",
    desc: "",
    show: true,
    images: null,
    files: null,
    event: "",
  });

  const {
    data: eventData,
    error: eventerror,
    isLoading: eventLoading,
  } = useQuery({ queryFn: allEvents });
  const { data, error, isLoading, mutateAsync } = useMutation({ mutationFn: createContent });

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    } else {
      try {
        const { title, desc, event, show, images, files } = formValue;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        // formData.append("type", type);
        formData.append("create", createValue.unix * 1000);
        formData.append("publishTime", publishTimeValue.unix * 1000);
        formData.append("show", show);
        formData.append("event", event);
        images.forEach((file: any) => {
          formData.append("images", file.blobFile);
        });
        files.forEach((file: any) => {
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
  };

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
          // sticky
          // groupBy="parent_id"
          // defaultValue={["Kenya", "Julius"]}
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

          <Uploader autoUpload={false} onChange={handleImageChange} draggable multiple>
            <div style={uploaderStyle}>
              <span>تصویر مورد نظر را انتخاب کنید</span>
            </div>
          </Uploader>
        </Form.Group>

        <Form.Group className="xl:col-span-3 lg:col-span-4 md:col-span-3 col-span-2">
          <Form.ControlLabel className="text-xl font-bold mb-4">
            فایل ها صوتی و تصویری
          </Form.ControlLabel>
          <Uploader autoUpload={false} onChange={handleFileChange} draggable multiple>
            <div style={uploaderStyle}>
              <span>فایل مورد نظر را انتخاب کنید</span>
            </div>
          </Uploader>
        </Form.Group>
      </div>
      <Form.Group>
        <SubmitBtn submitFn={handleSubmit} label="ذخیره محتوا" />
      </Form.Group>
    </Form>
  );
}

export default CreateContent;
