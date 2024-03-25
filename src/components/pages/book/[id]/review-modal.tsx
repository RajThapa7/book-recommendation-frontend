"use client";
import React, { useState } from "react";
import { Form, Modal, message } from "antd";
import Rating from "@/components/common/rating/rating";
import TextArea from "antd/es/input/TextArea";
import { useAddRatingToBookMutation } from "@/store/features/ratings/rating.api";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { getUser } from "@/lib/getUser";

interface ModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
}
export default function ReviewModal({ isModalOpen, handleCancel }: ModalProps) {
  const [rate, setRate] = useState<number>(0);
  const searchParams = useSearchParams();
  const [bookReview, setBookReview] = useState<string>("");
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
    handleCancel();
    window.location.reload();
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
