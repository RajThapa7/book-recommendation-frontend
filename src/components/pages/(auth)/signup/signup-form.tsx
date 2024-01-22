//auth sign up form
"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import InputComponent from "@/components/common/input/input";
import ButtonComponent from "@/components/common/button/button";
import ErrorMessage from "@/components/common/text/error-message";
import FormHeader from "@/components/common/text/form-header";
import LinkTag from "@/components/common/text/link";
import { routes } from "@/contants/routes";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  name: Yup.string().required("Name is required"),
});

const SignUpForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });

  return (
    <div className="justify-center h-full flex flex-col w-[60%] mx-auto">
      <div className="text-center pb-6">
        <FormHeader
          text="Create an account"
          key={"sign-up-header-text"}
        />
      </div>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <div className="w-full">
          <InputComponent
            type="text"
            placeholder="Enter your full name"
            id="name"
            name="name"
            label="Full Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <ErrorMessage text={formik.errors.name}></ErrorMessage>
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
