"use client";
import PaginationComponent from "@/components/common/pagination/pagination";
import Rating from "@/components/common/rating/rating";
import { useGetUserRatingOnBookQuery } from "@/store/features/ratings/rating.api";
import { Avatar } from "antd";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function ReviewSection() {
  const searchParams = useSearchParams();
  const { data: userReviewData, refetch } = useGetUserRatingOnBookQuery({
    userId: JSON.parse(getCookie("user")!)?.userId,
    bookId: searchParams?.get("bookId") as string,
  });
  console.log(userReviewData);
  const handlePageChange = (pageNumber: number) => {
    refetch();
  };
  return (
    <div className="w-full">
      <p className="mb-4">Reviews from users are listed below:</p>
      <div className="flex flex-col gap-4">
        {userReviewData &&
          userReviewData?.data?.map((p: any) => (
            <CommentLayout review={p?.review} rating={p?.rating} key={p?._id} />
          ))}
      </div>
      <PaginationComponent
        total={userReviewData?.totalPages}
        defaultCurrent={userReviewData?.page}
        onChange={handlePageChange}
      />
    </div>
  );
}

const CommentLayout = ({
  rating,
  review,
}: {
  rating: number;
  review: string;
}) => {
  return (
    <div className="flex items-center gap-4 border p-4 w-full rounded-md">
      <Avatar className="bg-blue-700">U</Avatar>
      <div className="flex flex-col gap-2">
        <Rating disabled value={rating || 0} />
        <p className="text-p">{review || "No comments"}</p>
      </div>
    </div>
  );
};
