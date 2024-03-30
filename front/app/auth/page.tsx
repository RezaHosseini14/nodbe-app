"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "rsuite";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

// services
import { login } from "@/services/auth/authServices";

// components
import Loading from "@/components/shared/Loading";
import { model } from "@/model/auth/loginModel";

type FieldType = {
  username: string;
  password: string;
};

function AuthPage() {
  const router = useRouter();
  const formRef = useRef<any>();
  const [formValue, setFormValue] = useState<FieldType>({ username: "", password: "" });
  const { isLoading, mutateAsync } = useMutation({ mutationFn: login });

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    } else {
      try {
        const res = await mutateAsync(formValue);
        if (res.status === 200) {
          toast.success("با موفقیت وارد شدید");
          router.replace("/dashboard");
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-mianColor/50">
      <div className="relative w-96 h-96 p-8 border border-mianColor rounded-xl shadow-xl bg-white/50 backdrop-blur-xl">
        <h1 className="absolute right-1/2 translate-x-1/2 -top-6 text-[2rem] rounded-xl shadow-md bg-mianColor text-white px-9">ورود</h1>
        {!isLoading ? (
          <Form ref={formRef} fluid model={model} formValue={formValue} onChange={setFormValue} className="flex flex-col justify-between h-full pt-4">
            <div className="flex flex-col gap-2 w-full mt-8">
              <Form.Group>
                <Form.ControlLabel className="text-mianColor font-semibold" style={{ fontSize: "1.2rem" }}>
                  نام کاربری
                </Form.ControlLabel>
                <Form.Control className="h-10 text-lg" name="username" />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel className="text-mianColor font-semibold" style={{ fontSize: "1.2rem" }}>
                  رمز عبور
                </Form.ControlLabel>
                <Form.Control className="h-10 text-lg" name="password" type="password" autoComplete="off" />
              </Form.Group>
            </div>

            <button
              className="bg-mianColor hover:bg-mianColor/70 transition w-full h-10 rounded-xl text-white font-bold text-xl"
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
