import React from "react";
import MedicationFormComponent from "../book-form";
import { BookFieldValue } from "../book-form.interface";
import { useToast } from "@/lib/toast/useToast";
import { useAddBookMutation } from "@/store/features/admin/books/book.api";

export default function AddBookComponent({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const [bookAddMutation] = useAddBookMutation();
  const showToast = useToast();
  const submitHandler = async (values: BookFieldValue) => {
    try {
      const formData = new FormData();
      formData.append("image_url", values?.file?.[0]?.originFileObj);
      formData.append("title", values?.title);
      formData.append("id", values?.id);
      formData.append("authors", values?.authors);
      formData.append("isbn", values?.isbn);
      formData.append("isbn13", values?.isbn13);
      formData.append("language_code", values?.language_code);
      formData.append(
        "original_publication_year",
        values?.original_publication_year
      );
      formData.append("original_title", values?.original_title);
      const { data } = await bookAddMutation({
        data: formData,
      });
      if (data && (data?.statusCode === 200 || data?.statusCode === 201)) {
        showToast({
          type: "success",
          title: "book detail added successfully",
        });
        onClose();
      } else {
        showToast({ type: "error", title: "book detail not added" });
      }
    } catch (err) {
      showToast({ type: "error", title: "book detail not added" });
    }
  };
  return (
    <MedicationFormComponent
      status={"Add"}
      show={show}
      onClose={onClose}
      submitHandler={submitHandler}
      key="medication-add-component"
    />
  );
}
