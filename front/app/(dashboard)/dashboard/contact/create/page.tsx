//@ts-nocheck
"use client";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { CheckPicker, Form } from "rsuite";

//model
import { model } from "@/model/user/createUserModel";

//components
import SubmitBtn from "@/components/shared/SubmitBtn";

//services
import { addUserFull } from "@/services/contact/contactServices";
import Field from "@/components/shared/Field";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useRoleCheck from "@/hook/useRoleCheck";

type CreateUserFormValue = {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  confirmPassword: string;
  roles: [string] | any;
  // images?: File | null;
};

function CreateContactPage() {
  const { me } = useSelector((state: RootState) => state.auth);
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const [formValue, setFormValue] = useState<CreateUserFormValue>({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirmPassword: "",
    roles: [],
    // images: null,
  });

  const { data, error, isLoading, mutateAsync } = useMutation({ mutationFn: addUserFull });

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    } else {
      try {
        const { first_name, last_name, username, confirmPassword, password, roles } = formValue;

        const formData = new FormData();
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("username", username);
        formData.append("roles", roles);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        // images.forEach((file: any) => {
        //   formData.append("images", file.blobFile);
        // });

        const res = await mutateAsync(formValue);
        if (res?.status == 201) {
          toast.success(res?.data?.message);
        }
      } catch (error: any) {
        if (error.response.status == 400) {
          for (const [key, value] of Object.entries(error?.response?.data?.message)) {
            toast.error(value);
          }
        } else {
          toast.error(error?.response?.data?.message);
        }
      }
    }
  };

  const handleImageChange = (images: File) => {
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      images,
    }));
  };

  const { checkRole } = useRoleCheck(me?.roles, "SUPER");

  const rolesList = checkRole()
    ? [
        { label: "مدیر", value: "ADMIN" },
        { label: "کاربر", value: "USER" },
        { label: "مدیرکل", value: "SUPER" },
      ]
    : [
        { label: "مدیر", value: "ADMIN" },
        { label: "کاربر", value: "USER" },
      ];

  return (
    <Form ref={formRef} onChange={setFormValue} onCheck={setFormError} formValue={formValue} model={model} className="">
      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 text-base font-medium">
        <Field name="first_name" label="نام" />
        <Field name="last_name" label="نام خانوادگی" />
        <Field name="roles" label="نقش" accepter={CheckPicker} data={rolesList} />
        <Field name="username" label="نام کاربری" />
        <Field name="password" type="password" autoComplete="off" label="رمز عبور" />
        <Field name="confirmPassword" type="password" autoComplete="off" label="تکرار رمز عبور" />
      </div>
      <Form.Group>
        <SubmitBtn submitFn={handleSubmit} label="ذخیره کاربر" />
      </Form.Group>
    </Form>
  );
}

export default CreateContactPage;
