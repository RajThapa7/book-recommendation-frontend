"use client";
import BookSkeletal from "@/components/common/BookSkeletal/BookSkeletal";
import ButtonComponent from "@/components/common/button/button";
import { useGetSavedBooksQuery } from "@/store/features/book/book.api";
import { getCookie } from "cookies-next";
import Image from "next/image";
import BookCard from "../../book/book-card";
import { useRouter } from "next-nprogress-bar";
import { getUser } from "@/lib/getUser";

export default function SaveBookComponent() {
  const { data, isLoading } = useGetSavedBooksQuery({
    id: getUser()?.userId,
  });
  const router = useRouter();
  return (
    <div className="px-20 py-10 flex flex-col gap-10 flex-1">
      <p className="text-2xl text-blue-900 font-bold">
        Saved Books ({data?.books?.length ?? 0})
      </p>
      {data?.books.length !== 0 ? (
        <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!isLoading
            ? data?.books?.map((p: any, index: number) => (
                <BookCard
                  key={index}
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
            : Array.from({ length: 4 }).map((_, index) => (
                <BookSkeletal key={index} />
              ))}
        </div>
      ) : (
        <div className="self-center">
          <Image
            alt="empty"
            src={require("../../../../../public/empty.svg")}
            width={500}
            height={500}
          />
          <p className="text-2xl font-semibold text-center mt-6">
            Sorry, you don't have any saved books
          </p>
          <center className="mt-5">
            <ButtonComponent
              text="Browse Our Collection"
              btnClick={() => router.push("/books/collection")}
            />
          </center>
        </div>
      )}
    </div>
  );
}
