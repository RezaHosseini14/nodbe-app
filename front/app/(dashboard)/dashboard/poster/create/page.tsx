//@ts-nocheck
"use client";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { Form, Uploader } from "rsuite";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { uploaderStyle } from "@/json/style";

//components
import SubmitBtn from "@/components/shared/SubmitBtn";
import Field from "@/components/shared/Field";

//model
import { model } from "@/model/poster/createPosterModel";

//services
import { addPoster } from "@/services/poster/posterServices";

function CreatePoster() {
  const { data, error, isLoading, mutateAsync } = useMutation({ mutationFn: addPoster });

  const [createTime, setCreateTime] = useState<string>("");
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<object>({});
  const [formValue, setFormValue] = useState({
    title: "",
    desc: "",
    // create: "",
    image: null,
  });

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    } else {
      try {
        const { title, desc, create, image } = formValue;
        const createTimeNow = createTime.unix * 1000;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("create", createTimeNow.toString());
        image.forEach((file: any) => {
          formData.append("image", file.blobFile);
        });

        const res = await mutateAsync(formData);
        if (res?.status == 201) {
          toast.success(res?.data?.message);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message ? error?.response?.data?.message : "مشکلی پیش آمده");
      }
    }
  };

  const handleImageChange = (image: File) => {
    setFormValue((prevFormValue: any) => ({
      ...prevFormValue,
      image,
    }));
  };

  return (
    <Form ref={formRef} onChange={setFormValue} onCheck={setFormError} formValue={formValue} model={model} className="">
      <div className="grid xl:grid-cols-3 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-8 text-base font-medium">
        <Field name="title" label="عنوان اطلاعیه" />
        <Field name="desc" label="توضیحات اطلاعیه" />
        {/* <Field accepter={DatePicker} name="create" label="زمان اطلاعیه" /> */}

        <div className="flex flex-col">
          <label htmlFor="create">زمان اطلاعیه</label>
          <DatePicker style={{ width: "100%" }} name="create" value={createTime} onChange={setCreateTime} calendar={persian} locale={persian_fa} />
        </div>

        <Form.Group className="xl:col-span-3 md:col-span-3 xs:col-span-2 col-span-1">
          <Form.ControlLabel className="text-xl font-bold mb-4">تصویر اطلاعیه</Form.ControlLabel>

          <Uploader autoUpload={false} onChange={handleImageChange} draggable multiple={false}>
            <div style={uploaderStyle}>
              <span>تصویر مورد نظر را انتخاب کنید</span>
            </div>
          </Uploader>
        </Form.Group>
      </div>

      <Form.Group>
        <SubmitBtn submitFn={handleSubmit} label="ذخیره اطلاعیه" />
      </Form.Group>
    </Form>
  );
}

export default CreatePoster;
