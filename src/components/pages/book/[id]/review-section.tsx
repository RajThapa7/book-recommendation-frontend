"use client";
import Rating from "@/components/common/rating/rating";
import { getUser } from "@/lib/getUser";
import { useGetUserRatingOnBookQuery } from "@/store/features/ratings/rating.api";
import { Avatar, Button } from "antd";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function ReviewSection() {
  const searchParams = useSearchParams();
  const [reviewCounter, setReviewCounter] = useState<number>(1);
  const { data: userReviewData, refetch } = useGetUserRatingOnBookQuery({
    userId: getUser()?.userId,
    bookId: searchParams?.get("bookId") as string,
    page_number: reviewCounter,
  });
  const handlePageIncrement = () => {
    if (userReviewData?.totalPages > reviewCounter) {
      setReviewCounter(reviewCounter + 1);
      refetch();
    }
  };
  const handlePageDecrement = () => {
    if (reviewCounter > 1) {
      setReviewCounter(reviewCounter - 1);
      refetch();
    }
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
      <div className="mt-4 flex gap-4">
        <Button onClick={handlePageDecrement} disabled={reviewCounter === 1}>
          Prev
        </Button>
        <Button
          onClick={handlePageIncrement}
          disabled={reviewCounter === userReviewData?.total_pages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export const CommentLayout = ({
  rating,
  review,
  active,
}: {
  rating: number;
  review: string;
  active?: boolean;
}) => {
  return (
    <div
      className={`flex items-center gap-4 border p-4 w-full rounded-md ${
        active && "bg-blue-50"
      }`}
    >
      <Avatar className="bg-blue-700">U</Avatar>
      <div className="flex flex-col gap-2">
        <Rating disabled value={rating || 0} />
        <p className="text-p">{review || "No comments"}</p>
      </div>
    </div>
  );
};
