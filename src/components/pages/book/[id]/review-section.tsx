"use client";
import Rating from "@/components/common/rating/rating";
import { getUser } from "@/lib/getUser";
import { useGetUserRatingOnBookQuery } from "@/store/features/ratings/rating.api";
import { Avatar, Button } from "antd";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

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
      <p className="mb-4">Reviews from other users:</p>
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
  selfReview = false,
  handleDelete,
}: {
  rating: number;
  review?: string;
  active?: boolean;
  selfReview?: boolean;
  handleDelete?: () => Promise<void>;
}) => {
  return (
    <div
      className={`${
        active && "bg-blue-50"
      } w-full flex flex-row items-center justify-between rounded-md border p-4`}
    >
      <div className={`flex items-center gap-4`}>
        <Avatar className="bg-blue-700">U</Avatar>
        <div className="flex flex-col gap-2 h-full justify-center">
          <Rating disabled value={rating || 1} />
          {review && <p className="text-p">{review}</p>}
        </div>
      </div>
      {selfReview && <Button onClick={handleDelete}>Delete Review</Button>}
    </div>
  );
};