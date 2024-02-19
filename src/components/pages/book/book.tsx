"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import BookCard from "./book-card";
import SearchInput from "@/components/common/input/search-input";
import ErrorMessage from "@/components/common/text/error-message";
import Option from "@/components/common/input/option-input";
import SectionTitle from "@/components/common/text/section-title";
import {
  useGetBookRecommendationsQuery,
  useGetBooksQuery,
  useGetSearchedBooksQuery,
} from "@/store/features/book/book.api";

const validationSchema = Yup.object({
  search: Yup.string().required("Please enter search text"),
});
export default function BookComponent() {
  const formik = useFormik({
    initialValues: {
      search: "",
      optionValue: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });

  const { data, error, isLoading } = useGetSearchedBooksQuery({
    search: formik?.values?.search,
    optionValue: formik?.values?.optionValue,
  });

  const {
    data: recommendedBooks,
    isLoading: isRecommendationLoading,
    error: RecommendationError,
  } = useGetBookRecommendationsQuery({ id: 1 });

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
        <Option
          onChangeHandler={(target: any) =>
            formik.setFieldValue("optionValue", target?.target?.value)
          }
        />
      </div>
      <SectionTitle text="Check out our new collection" className="text-h4" />
      <div className="flex flex-wrap gap-12">
        {data?.data?.length > 0 ? (
          data?.data?.map((p: any, index: number) => (
            <BookCard
              key={index + "recommend"}
              title={p?.title}
              rating={p?.average_rating}
              image={p?.image_url}
              author={p?.authors}
              language={p?.language_code}
              date={p?.original_publication_year}
              id={p?._id}
            />
          ))
        ) : (
          <p className="text-center text-black text-2xl">
            No results found with your search keyword:{" "}
            <span className="text-red-600">"{formik.values?.search}"</span>
          </p>
        )}
      </div>
      <SectionTitle text="Our Recommendations" className="text-h4" />
      <div className="flex flex-wrap gap-12">
        {recommendedBooks?.data?.map((p: any, index: number) => (
          <BookCard
            key={index + "recommend"}
            title={p?.title}
            rating={p?.average_rating}
            image={p?.image_url}
            author={p?.authors}
            language={p?.language_code}
            date={p?.original_publication_year}
            id={p?._id}
          />
        ))}
      </div>
    </div>
  );
}
