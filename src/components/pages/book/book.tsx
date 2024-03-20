"use client";
import ButtonComponent from "@/components/common/button/button";
import SectionTitle from "@/components/common/text/section-title";
import {
  useGetBookRecommendationsQuery,
  useGetSearchedBooksQuery,
} from "@/store/features/book/book.api";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import BookCard from "./book-card";

const validationSchema = Yup.object({
  search: Yup.string().required("Please enter search text"),
});
export default function BookComponent() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageLimitCount, setPageLimitCount] = useState<number>(10);

  const user_data = useSelector((state: any) => state?.userInfo?.userInfo);
  const formik = useFormik({
    initialValues: {
      search: "",
      optionValue: "sort-average-rating",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
    },
  });

  const { data, refetch } = useGetSearchedBooksQuery({
    search: formik?.values?.search,
    optionValue: formik?.values?.optionValue,
    page: currentPage?.toString(),
    limit: pageLimitCount?.toString(),
  });
  const { data: recommendedBooks } = useGetBookRecommendationsQuery({
    id: user_data?.userId,
  });
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    refetch();
  };
  const router = useRouter();
  return (
    <div className="">
      <SectionTitle
        className="text-center pb-10"
        text="Find your next adventure in books with our personalized
          recommendations."
      ></SectionTitle>

      <SectionTitle text="Check out our collection" className="text-h4" />
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.data?.length > 0 ? (
          data?.data
            ?.slice(0, 8)
            ?.map((p: any, index: number) => (
              <BookCard
                key={index + "recommend"}
                title={p?.title}
                rating={p?.average_rating}
                image={p?.image_url}
                author={p?.authors}
                language={p?.language_code}
                date={p?.original_publication_year}
                id={p?._id}
                bookId={p?.id}
              />
            ))
        ) : (
          <p className="text-center text-black text-2xl">
            No results found with your search keyword:{" "}
            <span className="text-red-600">"{formik.values?.search}"</span>
          </p>
        )}
      </div>
      <center className="mt-10 mb-14">
        <ButtonComponent
          text="View more"
          btnClick={() => router.push("/books/collection")}
        />
      </center>
      <SectionTitle text="Our Recommendations" className="text-h4" />
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            bookId={p?.id}
          />
        ))}
      </div>
    </div>
  );
}
