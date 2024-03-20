"use client";
import BookSkeletal from "@/components/common/BookSkeletal/BookSkeletal";
import ButtonComponent from "@/components/common/button/button";
import SectionTitle from "@/components/common/text/section-title";
import {
  useGetBookRecommendationsQuery,
  useGetBooksQuery,
} from "@/store/features/book/book.api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import BookCard from "./book-card";

const validationSchema = Yup.object({
  search: Yup.string().required("Please enter search text"),
});
export default function BookComponent() {
  const user_data = useSelector((state: any) => state?.userInfo?.userInfo);

  const {
    data,
    refetch,
    isLoading: isSearchBookLoading,
  } = useGetBooksQuery({});
  const { data: recommendedBooks, isLoading: isRecommendationLoading } =
    useGetBookRecommendationsQuery({
      id: user_data?.userId,
    });
  const router = useRouter();
  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-10 items-center justify-center mb-20">
        <SectionTitle
          className="text-center pb-10"
          text="Find your next adventure in books with our personalized
          recommendations."
        ></SectionTitle>
        <Image
          alt="reading_book"
          src={require("../../../../public/book_reading.svg")}
          className="w-full aspect-auto"
        />
      </div>

      <SectionTitle text="Check out our collection" className="text-h4" />
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {!isSearchBookLoading
          ? data?.data
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
          : Array.from({ length: 4 }).map((_, index) => (
              <BookSkeletal key={index} />
            ))}
      </div>
      <center className="mt-10 mb-14">
        <ButtonComponent
          text="View more"
          btnClick={() => router.push("/books/collection")}
        />
      </center>
      <SectionTitle text="Our Recommendations" className="text-h4" />
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!isRecommendationLoading
          ? recommendedBooks?.data?.map((p: any, index: number) => (
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
          : Array.from({ length: 4 }).map((_, index) => (
              <BookSkeletal key={index} />
            ))}
      </div>
    </div>
  );
}
