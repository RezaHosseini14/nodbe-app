"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, ButtonToolbar, Schema } from "rsuite";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

import { login } from "@/services/auth/authServices";
import Loading from "@/components/shared/Loading";

type FieldType = {
  username?: string;
  password?: string;
};

function AuthPage() {
  const router = useRouter();
  const formRef = useRef<any>();
  const [formValue, setFormValue] = useState<any>({ username: "", password: "" });

  const { data, error, isLoading, mutateAsync } = useMutation({ mutationFn: login });

  const model = Schema.Model({
    username: Schema.Types.StringType().isRequired("نام کاربری الزامی است"),
    password: Schema.Types.StringType().isRequired("رمز عبور الزامی است"),
  });

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    } else {
      try {
        const res = await mutateAsync(formValue);
        if (res.status === 200) {
          toast.success("باموفقیت وارد شدید");
          // router.refresh();
          router.replace("/dashboard")
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-mianColor/50">
      <div className="relative w-96 h-96 p-8 border border-gray-600 rounded-xl shadow-xl bg-white/50 backdrop-blur-xl">
        <h1 className="absolute right-1/2 translate-x-1/2 -top-6 text-[2rem] rounded-xl shadow-md bg-mianColor text-white px-9">
          ورود
        </h1>
        {!isLoading ? (
          <Form
            ref={formRef}
            fluid
            model={model}
            formValue={formValue}
            onChange={setFormValue}
            className="flex flex-col justify-between h-full pt-4"
          >
            <div className="flex flex-col gap-4 w-full">
              <Form.Group>
                <Form.ControlLabel style={{ fontSize: "1.1rem" }}>نام کاربری</Form.ControlLabel>
                <Form.Control name="username" />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel style={{ fontSize: "1.1rem" }}>رمز عبور</Form.ControlLabel>
                <Form.Control name="password" type="password" autoComplete="off" />
              </Form.Group>
            </div>

            <button
              className="bg-mianColor w-full h-10 rounded-xl text-white font-bold text-xl"
              onClick={handleSubmit}
            >
              ورود
            </button>
          </Form>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default AuthPage;
