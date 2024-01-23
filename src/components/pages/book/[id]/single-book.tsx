"use client";
import React from "react";
import BookDescription from "./book-decription";
import BookCard from "../book-card";
import BackButton from "@/components/common/button/back-button";
import SectionTitle from "@/components/common/text/section-title";
import useSWR from "swr";
import { Book } from "@/api/routes";
import { get_fetch } from "@/api/api-provider";
import { useSearchParams } from "next/navigation";

export default function SingleBookComponent() {
  const search = useSearchParams();
  console.log(search);
  const { data, isLoading, error } = useSWR(
    Book._getBooksRecommendation(),
    get_fetch,
    {
      revalidateOnFocus: false,
    }
  );
  return (
    <div className="mx-auto w-4/5 flex flex-col gap-12 py-16">
      <div className="flex flex-col gap-2 items-start">
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
