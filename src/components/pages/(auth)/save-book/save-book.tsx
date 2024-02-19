"use client";
import React from "react";
import BookCard from "../../book/book-card";
import BackButton from "@/components/common/button/back-button";
import { useGetSavedBooksQuery } from "@/store/features/book/book.api";

export default function SaveBookComponent() {
  const { data, isLoading, error } = useGetSavedBooksQuery({ id: 10 });
  return (
    <div className="px-20 py-10">
      <BackButton />
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
          removeBtn
          addBtn
        />
      ))}
    </div>
  );
}
