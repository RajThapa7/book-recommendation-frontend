//auth sign up form
"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { routes } from "@/contants/routes";
import { SignUpFormInterface } from "@/store/features/auth/auth.interface";
import { useSignupMutation } from "@/store/features/auth/auth.api";
import InputComponent from "@/components/common/input/input";
import ButtonComponent from "@/components/common/button/button";
import ErrorMessage from "@/components/common/text/error-message";
import FormHeader from "@/components/common/text/form-header";
import LinkTag from "@/components/common/text/link";
import { useRouter } from "next-nprogress-bar";
import { useToast } from "@/lib/toast/useToast";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  username: Yup.string().required("User name is required"),
});

const SignUpForm = () => {
  const toast = useToast();
  const navigate = useRouter();
  const [signupApiCall] = useSignupMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: SignUpFormInterface) => {
      const response = await signupApiCall(values);
      console.log(response);
      if (response?.error?.status === 400) {
        toast({
          type: "error",
          title: response.error?.data?.message,
        });
      }
      if (response?.data?.user) {
        navigate.replace(routes.auth.login);
      }
    },
  });

  return (
    <div className="justify-center h-full flex flex-col w-[60%] mx-auto">
      <div className="text-center pb-6">
        <FormHeader text="Create an account" key={"sign-up-header-text"} />
      </div>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <div className="w-full">
          <InputComponent
            type="text"
            placeholder="Enter your username"
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
            type="email"
            placeholder="Enter your email here"
            id="email"
            name="email"
            label="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <ErrorMessage text={formik.errors.email}></ErrorMessage>
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

        <ButtonComponent
          text="Create Account"
          key={"signup-btn"}
          type="submit"
        />
      </form>
      <p className="text-center pt-2">
        <span className="text-p-sm font-p text-grey">
          Already have an account ?{" "}
        </span>
        <LinkTag text="Log In" link={routes?.auth?.login} />
      </p>
    </div>
  );
};

export default SignUpForm;
