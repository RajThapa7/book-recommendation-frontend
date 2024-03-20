"use client";
import { useGetSavedBooksQuery } from "@/store/features/book/book.api";
import { getCookie } from "cookies-next";
import BookCard from "../../book/book-card";

export default function SaveBookComponent() {
  const { data } = useGetSavedBooksQuery({
    id: JSON.parse(getCookie("user")!)?.userId,
  });
  return (
    <div className="px-20 py-10">
      <p className="text-2xl text-blue-900 font-bold">
        Saved Books ({data?.books?.length ?? 0})
      </p>
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.books ? (
          data?.books?.map((p: any, index: number) => (
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
              removeBtn
              addBtn
            />
          ))
        ) : (
          <p className="text-2xl font-semibold text-center">
            Sorry, you don't have any saved books
          </p>
        )}
      </div>
    </div>
  );
}
