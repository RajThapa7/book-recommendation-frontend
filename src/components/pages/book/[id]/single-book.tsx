"use client";
import React, { useEffect } from "react";
import BookDescription from "./book-decription";
import BookCard from "../book-card";
import BackButton from "@/components/common/button/back-button";
import SectionTitle from "@/components/common/text/section-title";
import { useGetBookRecommendationsQuery } from "@/store/features/book/book.api";
import { useSelector } from "react-redux";

export default function SingleBookComponent() {
  const userData = useSelector((state: any) => state?.userInfo?.userInfo);
  const { data } = useGetBookRecommendationsQuery({
    id: userData?.userId,
  });
  return (
    <div className="mx-auto w-4/5 flex flex-col gap-12 py-16">
      <div className="flex flex-col gap-2 items-start flex-wrap w-full">
        <BackButton />
        <BookDescription />
      </div>

      <div className="flex flex-col gap-6">
        <SectionTitle
          text="More Similar Books Await Your Discovery "
          className="text-h4"
        />
        <div className="flex flex-wrap gap-12">
          {data?.data?.map((p: any, index: number) => (
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
    </div>
  );
}
