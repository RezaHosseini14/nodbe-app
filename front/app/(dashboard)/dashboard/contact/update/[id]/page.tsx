"use client";
import SubmitBtn from "@/components/shared/SubmitBtn";
import { model } from "@/model/user/createUserModel";
import { addUserFull, getUser, updateUser } from "@/services/contact/contactServices";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { CheckPicker, Form, SelectPicker } from "rsuite";

const Field = forwardRef((props: any, ref: any) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-10`} ref={ref} className={error ? "has-error" : ""} classPrefix="w-full ">
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

type CreateUserFormValue = {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  confirmPassword: string;
  roles: [string];
  // images?: File | null;
};

export default function UpdateContactPage({ params }: { params: { id: string } }) {
  const { data, error, isLoading } = useQuery(["userById", params.id], () => getUser(params.id));
  const {
    data: updateUserData,
    error: updateError,
    isLoading: updateIsLoading,
    mutateAsync,
  } = useMutation({ mutationFn: updateUser });

  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const [formValue, setFormValue] = useState<any>({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirmPassword: "",
    roles: data?.data?.users?.roles,
    // images: null,
  });

  useEffect(() => {
    if (data && data.data && data.data.users) {
      setFormValue({
        first_name: data.data.users.first_name || "",
        last_name: data.data.users.last_name || "",
        username: data.data.users.username || "",
        password: "",
        confirmPassword: "",
        roles: data.data.users.roles || [""],
      });
    }
  }, [data]);

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    } else {
      try {
        const { first_name, last_name, username, confirmPassword, password, roles } = formValue;
        const formData = new FormData();
        // images.forEach((file: any) => {
        //   formData.append("images", file.blobFile);
        // });
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("username", username);
        formData.append("roles", roles);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        const res = await mutateAsync([params.id, formData]);
        if (res?.status == 200) {
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

  //   const handleImageChange = (images: File) => {
  //     setFormValue((prevFormValue) => ({
  //       ...prevFormValue,
  //       images,
  //     }));
  //   };

  //   const uploaderStyle = {
  //     height: 100,
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     borderRadius: "1rem",
  //     border: "2px dashed red",
  //     cursor: "pointer",
  //   };

  return (
    <Form ref={formRef} onChange={setFormValue} onCheck={setFormError} formValue={formValue} model={model} className="">
      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-8 text-base font-medium">
        <Field name="first_name" label="نام" />
        <Field name="last_name" label="نام خانوادگی" />
        <Field
          name="roles"
          label="نقش"
          accepter={CheckPicker}
          data={[
            { label: "ادمین", value: "ADMIN" },
            { label: "کاربر", value: "USER" },
          ]}
        />
        <Field name="username" label="نام کاربری" />
        <Field name="password" type="password" autoComplete="off" label="رمز عبور" />
        <Field name="confirmPassword" type="password" autoComplete="off" label="تکرار رمز عبور" />

        {/* <Form.Group className="xl:col-span-3 lg:col-span-3 md:col-span-3 col-span-2">
          <Form.ControlLabel className="text-xl font-bold mb-4">تصاویر کاربر</Form.ControlLabel>

          <Uploader autoUpload={false} onChange={handleImageChange} draggable>
            <div style={uploaderStyle}>
              <span>تصویر مورد مظر را انتخاب کنید</span>
            </div>
          </Uploader>
        </Form.Group> */}
      </div>
      <Form.Group>
        <SubmitBtn submitFn={handleSubmit} label="ذخیره کاربر" />
      </Form.Group>
    </Form>
  );
}
