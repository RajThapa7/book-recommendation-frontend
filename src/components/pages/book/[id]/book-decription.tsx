"use client";
import React from "react";
import Image from "next/image";
import useSWR from "swr";
import { Book } from "@/api/routes";
import { get_fetch } from "@/api/api-provider";
import { usePathname, useRouter } from "next/navigation";

export default function BookDescription() {
  const path = usePathname();
  const { data, isLoading, error } = useSWR(
    Book._getBookById(path?.replace("/books/", "")),
    get_fetch,
    {
      revalidateOnFocus: false,
    }
  );
  return (
    <div className="flex flex-row gap-10 items-center">
      <Image
        src={data?.data?.image_url}
        alt="book-image"
        className="rounded-lg w-[290px] h-[470px]"
        width={290}
        height={470}
      />
      <div className="flex flex-col gap-3">
        <p className="text-h1 text-primary-black font-h1">
          {data?.data?.title}
        </p>
        <p className="text-h4 text-primary-black font-link">
          {data?.data?.authors}
        </p>
        <p className="text-h4 font-h4 text-black">Brief Summary</p>
        <p className="text-p text-black text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          vestibulum ante eget libero facilisis, vel mattis nunc convallis.
          Maecenas eget sagittis ligula. Proin malesuada sapien vitae justo
          tincidunt, at pulvinar arcu cursus. Nullam sodales tortor ac justo
          vestibulum, at ultricies nunc sagittis. Sed consectetur diam id purus
          consectetur, nec sodales tortor suscipit.
        </p>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-1">
            {Array.from({ length: 5 }).map((_, index: number) => (
              <Image
                src="/icons/rating-icon.svg"
                width={15}
                height={15}
                key={index}
                alt="rating icon"
              />
            ))}
            <p className="text-primary-black text-p capitalize">
              {data?.data?.average_rating}({data?.data?.ratings_count} Ratings)
            </p>
          </div>
          <div className="flex flex-row gap-8">
            <p className="text-p text-primary-black font-link">
              Published On: {data?.data?.original_publication_year}
            </p>
            <p className="text-p text-red-600 font-link capitalize">
              Language: {data?.data?.language_code}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
