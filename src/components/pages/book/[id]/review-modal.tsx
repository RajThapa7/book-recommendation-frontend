"use client";
import Rating from "@/components/common/rating/rating";
import { getUser } from "@/lib/getUser";
import { useAddRatingToBookMutation } from "@/store/features/ratings/rating.api";
import { setRatingData } from "@/store/features/user-info/user-info.slice";
import { Form, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface ModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  currentUserReview: string;
  currentUserRating: number;
  refetch: any;
}
export default function ReviewModal({
  isModalOpen,
  handleCancel,
  currentUserRating,
  currentUserReview,
  refetch,
}: ModalProps) {
  const dispatch = useDispatch();
  const [rate, setRate] = useState<number>(currentUserRating);
  const searchParams = useSearchParams();
  const [bookReview, setBookReview] = useState<string>(currentUserReview);
  const [messageApi, contextHolder] = message.useMessage();
  const [reviewMutation] = useAddRatingToBookMutation();
  const handleReview = async () => {
    messageApi.success("Thank you for your review");
    await reviewMutation({
      bookId: searchParams?.get("bookId") as string,
      userId: getUser()?.userId,
      rating: rate,
      review: bookReview,
    });
    dispatch(
      setRatingData({
        rate,
        review: bookReview,
      })
    );
    handleCancel();
    refetch();
  };

  return (
    <Modal
      centered
      title="Write review on this book"
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleReview}
    >
      <Form onSubmitCapture={handleReview} className="flex flex-col gap-4">
        <div>
          <p>Rate this book:</p>
          <Rating onChange={(value: any) => setRate(value)} value={rate} />
        </div>
        <div>
          <p>Write your review:</p>
          <TextArea
            rows={4}
            placeholder="Write a review on this book"
            value={bookReview}
            onChange={(e) => setBookReview(e.target.value)}
          />
        </div>
      </Form>
      {contextHolder}
    </Modal>
  );
}
