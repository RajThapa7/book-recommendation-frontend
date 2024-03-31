"use client";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { DatePicker, Image as ImagePreview } from "antd";
import { Upload } from "antd";
import { Input, UploadProps } from "antd";
import AddEditPopup from "@/components/common/modal/AddEditPopup";
import Image from "next/image";
import { BookFieldValue } from "./book-form.interface";
import { PrimaryButton } from "@/components/common/modal/modal.buttons";
const { Dragger } = Upload;
export default function MedicationFormComponent({
  show,
  onClose,
  submitHandler,
  status,
  formFields,
}: {
  show: boolean;
  onClose: () => void;
  submitHandler: (values: BookFieldValue) => void;
  status: string;
  formFields?: BookFieldValue;
}) {
  const formik = useFormik({
    initialValues: {
      id: "",
      authors: "",
      original_publication_year: "",
      original_title: "",
      title: "",
      language_code: "",
      isbn: "",
      isbn13: "",
      image_url: "",
      file: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
    }),
    onSubmit: async (values) => {
      submitHandler(values);
    },
  });
  useEffect(() => {
    console.log(formFields);
    if (status?.toString()?.toLowerCase() === "update" && formFields) {
      formik.setFieldValue("title", formFields?.title);
      formik.setFieldValue("image_url", formFields?.image_url);
      formik.setFieldValue("id", formFields?.id);
      formik.setFieldValue("authors", formFields?.authors);
      formik.setFieldValue("isbn", formFields?.isbn);
      formik.setFieldValue("isbn13", formFields?.isbn13);
      formik.setFieldValue("language_code", formFields?.language_code);
      formik.setFieldValue(
        "original_publication_year",
        formFields?.original_publication_year
      );
      formik.setFieldValue("original_title", formFields?.original_title);
    }
  }, [status, formFields]);
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    formik.setFieldValue("file", newFileList);
  };

  return (
    <AddEditPopup show={show} onClose={onClose}>
      <p className="text-[16px] font-semibold capitalize">{status} Book</p>
      <form
        className="flex flex-col gap-[10px] pt-[16px]"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Id
          </label>
          <Input
            type="text"
            id="id"
            placeholder="eg. 1"
            {...formik.getFieldProps("id")}
          />
        </div>
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Author
          </label>
          <Input
            type="text"
            id="author"
            placeholder="eg. rajan"
            {...formik.getFieldProps("author")}
          />
        </div>
        <div>
          <label
            htmlFor="original_title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Original Title
          </label>
          <Input
            type="text"
            id="original_title"
            placeholder="eg. hansel and gratel"
            {...formik.getFieldProps("original_title")}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="original_publication_year"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Original Publication Yeaer
          </label>
          <DatePicker
            className="w-full"
            id="original_publication_year"
            placeholder="eg. 1998"
            onChange={(dateString) => {
              formik.setFieldValue("original_publication_year", dateString);
            }}
          />
        </div>
        <div>
          <label
            htmlFor="language_code"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Language Code
          </label>
          <Input
            type="text"
            id="language_code"
            placeholder="eg. eng"
            {...formik.getFieldProps("language_code")}
          />
        </div>
        <div>
          <label
            htmlFor="isbn"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            ISBN
          </label>
          <Input
            type="text"
            id="isbn"
            placeholder="eg. isbn number"
            {...formik.getFieldProps("isbn")}
          />
        </div>
        <div>
          <label
            htmlFor="isbn13"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            ISBN13
          </label>
          <Input
            type="text"
            id="title"
            placeholder="eg. isbn 13"
            {...formik.getFieldProps("isbn13")}
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Title
          </label>
          <Input
            type="text"
            id="title"
            placeholder="eg. hansel and gratel"
            {...formik.getFieldProps("title")}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500">{formik.errors.title}</div>
          )}
        </div>

        {(!formik?.values?.image_url ||
          formik?.values?.image_url === "undefined") && (
          <Dragger
            multiple={false}
            accept="image/jpg,image/png,image/jpeg"
            onChange={handleChange}
            fileList={formik.values.file}
          >
            <p className="ant-upload-drag-icon"></p>
            <p className="text-[16px] font-medium">
              Click or drag image to this area to upload
            </p>
            <p className="text-[14px] text-gray-500 font-[400]">
              Support for a single upload. Strictly prohibited from uploading
              company data or other banned files.
            </p>
          </Dragger>
        )}
        {formik?.values?.image_url &&
          formik?.values?.image_url !== "undefined" && (
            <div className="relative">
              <p
                className="text-red-600 font-semibold flex "
                onClick={() => formik.setFieldValue("image_url", null)}
              >
                Remove
                <Image
                  src={"/icons/delete.svg"}
                  alt="delete icon"
                  width={20}
                  height={20}
                  className="aboslute top-0 right-0 cursor-pointer"
                />
              </p>
              <ImagePreview width={130} src={formik?.values?.image_url} />
            </div>
          )}
        <PrimaryButton type="submit">{status} Book</PrimaryButton>
      </form>
    </AddEditPopup>
  );
}
