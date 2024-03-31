"use client";

import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputComponent from "@/components/common/input/input";
import ButtonComponent from "@/components/common/button/button";
import ErrorMessage from "@/components/common/text/error-message";
import FormHeader from "@/components/common/text/form-header";
import { useGetTokenQuery } from "@/store/features/auth/auth.api";
import { LoginFormInterface } from "@/store/features/auth/auth.interface";
import { setCookie } from "cookies-next";
import { session } from "@/contants/token";
import { useRouter } from "next-nprogress-bar";
import { useToast } from "@/lib/toast/useToast";
import { useAdminLoginMutation } from "@/store/features/admin/login/auth.api";
import { routes } from "@/contants/routes";
import Link from "next/link";

const validationSchema = Yup.object({
  username: Yup.string().required("User name is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const navigate = useRouter();
  const toast = useToast();
  const [loginApiCall] = useAdminLoginMutation();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values: LoginFormInterface) => {
      try {
        const response = await loginApiCall(values);
        if (response?.error?.status !== 400) {
          setCookie(session.token, response?.data?.token);
          setCookie(session.user, JSON.stringify(response?.data?.user));
          navigate.replace(routes.admin.books);
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
        <p className="text-center text-grey text-p">Admin Panel!</p>
        <FormHeader text="Login to admin panel" key={"login-header-text"} />
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
        <Link
          className="text-p text-blue-600 text-center"
          href={routes.book.book}
        >
          Go back to book recommendation
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
