"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import BookCard from "./book-card";
import SearchInput from "@/components/common/input/search-input";
import ErrorMessage from "@/components/common/text/error-message";
import Option from "@/components/common/input/option-input";
import SectionTitle from "@/components/common/text/section-title";
import useSWR from "swr";
import { Book } from "@/api/routes";
import { get_fetch } from "@/api/api-provider";
import axios from "axios";

const validationSchema = Yup.object({
  search: Yup.string().required("Please enter search text"),
});
export default function BookComponent() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      // Call the asynchronous function and log the result
      console.log(await get_fetch(Book._getAllBookList()));
    };

    // Invoke the async function
    fetchData();
  }, []);
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });
  return (
    <div className="flex flex-col gap-6 w-4/5 mx-auto  py-24 ">
      <SectionTitle
        className="text-center pb-10"
        text="Find your next adventure in books with our personalized
          recommendations."
      ></SectionTitle>
      <div className="flex justify-between items-end pt-4 pb-10">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-1 w-max"
        >
          <SearchInput
            name="search"
            id="search"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.search}
          />
          {formik.touched.search && formik.errors.search && (
            <ErrorMessage text={formik.errors.search}></ErrorMessage>
          )}
        </form>
        <Option />
      </div>
      <SectionTitle text="Our Recommendations" className="text-h4" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <BookCard key={index + "recommend"} />
        ))}
      </div>
    </div>
  );
}
