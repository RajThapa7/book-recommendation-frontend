"use client";
import React from "react";
import BookCard from "../../book/book-card";
import useSWR from "swr";
import { Book } from "@/api/routes";
import { get_fetch } from "@/api/api-provider";

export default function SaveBookComponent() {
  const { data, isLoading, error } = useSWR(Book._getSavedList(10), get_fetch, {
    revalidateOnFocus: false,
  });
  return (
    <div className="px-20 py-10">
      <p className="text-2xl text-blue-900 font-bold">
        Saved Books ({data?.books?.length})
      </p>
      {data?.books?.map((p: any, index: number) => (
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
  );
}
