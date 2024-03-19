"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGetBookByIdQuery } from "@/store/features/book/book.api";
import ButtonComponent from "@/components/common/button/button";
import Rating from "@/components/common/rating/rating";
import ReviewModal from "./review-modal";
import { useGetUserRatingOnBookQuery } from "@/store/features/ratings/rating.api";
import { getCookie } from "cookies-next";

export default function BookDescription() {
  const [modal, setModal] = useState<boolean>(false);
  const path = usePathname();
  let defaultImage =
    "https://images.unsplash.com/photo-1594026200204-a25bea256816?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const { data } = useGetBookByIdQuery({
    id: path?.replace("/books/", ""),
  });
  const { data: userReviewData } = useGetUserRatingOnBookQuery({
    userId: JSON.parse(getCookie("user")!)?.userId,
    bookId: path?.replace("/books/", ""),
  });
  console.log(userReviewData);
  return (
    <div className="flex flex-row gap-10 items-center flex-wrap">
      <Image
        src={data?.data?.image_url ?? defaultImage}
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
            <Rating value={data?.data?.average_rating} disabled />
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
        <div>
          <ButtonComponent
            text="Write a Review"
            type="button"
            size="text-[12px]"
            bgColor="bg-primary-black"
            btnClick={() => setModal(true)}
          />
        </div>
      </div>
      <ReviewModal handleCancel={() => setModal(false)} isModalOpen={modal} />
    </div>
  );
}
