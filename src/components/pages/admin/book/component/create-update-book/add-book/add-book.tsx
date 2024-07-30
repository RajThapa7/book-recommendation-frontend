import { useToast } from "@/lib/toast/useToast";
import { useAddBookMutation } from "@/store/features/admin/books/book.api";
import MedicationFormComponent from "../book-form";

export default function AddBookComponent({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const [bookAddMutation] = useAddBookMutation();
  const showToast = useToast();
  const submitHandler = async (values: any) => {
    console.log(values);
    const formData = new FormData();
    formData.append("image", values?.file?.[0]?.originFileObj);
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
    const data: any = await bookAddMutation({
      data: formData,
    });
    if (data?.error?.status === 400) {
      showToast({ type: "error", title: data.error?.data.message });
    } else {
      showToast({
        type: "success",
        title: "book detail added successfully",
      });
      onClose();
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
