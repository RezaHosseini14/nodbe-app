"use client";
import SubmitBtn from "@/components/shared/SubmitBtn";
import { uploaderStyle } from "@/json/style";
import { model } from "@/model/poster/createPosterModel";
import { addPoster } from "@/services/poster/posterServices";
import { forwardRef, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { Form, DatePicker, Toggle, Uploader, SelectPicker } from "rsuite";

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

function CreatePoster() {
  const { data, error, isLoading, mutateAsync } = useMutation({ mutationFn: addPoster });

  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const [formValue, setFormValue] = useState({
    title: "",
    desc: "",
    create: new Date(),
    image: null,
  });

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    } else {
      try {
        const { title, desc, create, image } = formValue;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("create", create);
        image.forEach((file: any) => {
          formData.append("image", file.blobFile);
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

  const handleImageChange = (image: File) => {
    setFormValue((prevFormValue: any) => ({
      ...prevFormValue,
      image,
    }));
  };

  return (
    <Form
      ref={formRef}
      onChange={setFormValue}
      onCheck={setFormError}
      formValue={formValue}
      model={model}
      className=""
    >
      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 text-base font-medium">
        <Field name="title" label="عنوان اطلاعیه" />
        <Field name="desc" label="توضیحات اطلاعیه" />
        <Field accepter={DatePicker} name="create" label="زمان اطلاعیه" />

        <Form.Group className="xl:col-span-3 lg:col-span-3 md:col-span-2 col-span-1">
          <Form.ControlLabel className="text-xl font-bold mb-4">تصویر اطلاعیه</Form.ControlLabel>

          <Uploader autoUpload={false} onChange={handleImageChange} draggable>
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
