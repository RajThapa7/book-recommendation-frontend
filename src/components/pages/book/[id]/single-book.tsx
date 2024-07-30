"use client";
import SectionTitle from "@/components/common/text/section-title";
import {
  useGetBookByIdQuery,
  useRecomendationOfBookMutation,
} from "@/store/features/book/book.api";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BookCard from "../book-card";
import BookDescription from "./book-decription";

export default function SingleBookComponent() {
  const searchParams = useSearchParams();
  const [relatedBook, setRelatedBooks] = useState<any>(null);
  const path = usePathname();
  const { data } = useGetBookByIdQuery({
    id: path?.replace("/books/", ""),
  });
  const [getRelatedBook] = useRecomendationOfBookMutation();

  useEffect(() => {
    const fetchRelatedBooks = async () => {
      if (data?.data) {
        try {
          const response: any = await getRelatedBook({
            author: data?.data?.authors,
            title: data?.data?.title,
          });
          setRelatedBooks(response?.data?.data?.slice(1, 11));
        } catch (error) {
          console.error("Error fetching related books:", error);
        }
      }
    };

    fetchRelatedBooks();
  }, [searchParams?.get("bookId"), data]);
  return (
    <div className="mx-auto w-4/5 flex flex-col gap-12 py-0">
      <div className="flex flex-col gap-2 items-start flex-wrap w-full">
        <BookDescription data={data} />
      </div>

      <div className="flex flex-col gap-6">
        <SectionTitle
          text="More Similar Books Await Your Discovery "
          className="text-h4"
        />
        <div className="flex flex-wrap gap-12">
          {relatedBook &&
            relatedBook?.map((p: any, index: number) => (
              <BookCard
                similarity={(p?.similarityScore * 100)?.toFixed(2)?.toString()}
                key={index + "recommend"}
                title={p?.book?.title}
                rating={p?.book?.average_rating}
                image={p?.book?.image_url}
                author={p?.book?.authors}
                language={p?.book?.language_code}
                date={p?.book?.original_publication_year}
                id={p?.book?._id}
                bookId={p?.book?.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
