"use client";

import ButtonComponent from "@/components/common/button/button";
import InputComponent from "@/components/common/input/input";
import ErrorMessage from "@/components/common/text/error-message";
import FormHeader from "@/components/common/text/form-header";
import LinkTag from "@/components/common/text/link";
import { routes } from "@/contants/routes";
import { session } from "@/contants/token";
import { useToast } from "@/lib/toast/useToast";
import {
  useGetTokenQuery,
  useLoginMutation,
} from "@/store/features/auth/auth.api";
import { LoginFormInterface } from "@/store/features/auth/auth.interface";
import { setCookie } from "cookies-next";
import { useFormik } from "formik";
import { useRouter } from "next-nprogress-bar";
import { useEffect } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("User name is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const toast = useToast();
  const [loginApiCall] = useLoginMutation();
  const { data: tokenData } = useGetTokenQuery({});
  const navigate = useRouter();
  useEffect(() => {
    if (tokenData?.token && tokenData?.user) {
      setCookie(session.token, tokenData?.token);
      setCookie(session.user, JSON.stringify(tokenData?.user));
      navigate.replace("/books");
    }
  }, [tokenData]);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values: LoginFormInterface) => {
      try {
        const response: any = await loginApiCall(values);
        if (response?.error?.status !== 400) {
          window.location.reload();
          toast({
            type: "success",
            title: "Logged in successfully",
          });
          // window.location.reload();
        } else {
          toast({
            type: "error",
            title: response.error?.data?.message,
          });
        }
      } catch (err) {
        console.log(err);
        toast({
          type: "error",
          title: "Invalid credentials",
        });
      }
    },
  });

  return (
    <div className="w-[350px] mx-auto h-full justify-center flex flex-col">
      <div className="text-center pb-5">
        <p className="text-center text-grey text-p">Welcome back!</p>
        <FormHeader text="Login to your account" key={"login-header-text"} />
      </div>
      <form className="flex flex-col gap-4 pt-6" onSubmit={formik.handleSubmit}>
        <div className="w-full">
          <InputComponent
            type="text"
            placeholder="Enter your user name"
            id="username"
            name="username"
            label="User Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <ErrorMessage text={formik.errors.username}></ErrorMessage>
          )}
        </div>
        <div className="w-full">
          <InputComponent
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            label="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <ErrorMessage text={formik.errors.password}></ErrorMessage>
          )}
        </div>
        <ButtonComponent text="Login" key={"login-btn"} type="submit" />
      </form>
      <p className="text-p-sm font-p text-center mt-4">
        Not registered?{" "}
        <LinkTag link={routes?.auth?.signup || "#"} text="Create an account" />
      </p>
    </div>
  );
};

export default LoginForm;
