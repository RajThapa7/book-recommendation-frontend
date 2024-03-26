"use client";
import SectionTitle from "@/components/common/text/section-title";
import { useGetBookRecommendationsQuery } from "@/store/features/book/book.api";
import BookCard from "../book-card";
import BookDescription from "./book-decription";
import { getUser } from "@/lib/getUser";

export default function SingleBookComponent() {
  const { data } = useGetBookRecommendationsQuery({
    id: getUser()?.userId?.toString(),
  });
  return (
    <div className="mx-auto w-4/5 flex flex-col gap-12 py-0">
      <div className="flex flex-col gap-2 items-start flex-wrap w-full">
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
