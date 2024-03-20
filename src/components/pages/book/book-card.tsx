import ButtonComponent from "@/components/common/button/button";
import { routes } from "@/contants/routes";
import { useAddBookToListMutation } from "@/store/features/book/book.api";
import { Button, message } from "antd";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const Tag = ({ text }: { text: string }) => {
  return (
    <p className="bg-black rounded-md capitalize px-2 py-1 text-white text-p-sm w-max">
      {text}
    </p>
  );
};
interface Book {
  date: string;
  title: string;
  author: string;
  rating: string;
  image: string;
  language: string;
  id: string;
  removeBtn?: boolean;
  addBtn?: boolean;
  bookId?: number | string;
}
export default function BookCard({
  date,
  title,
  author,
  rating,
  image,
  language,
  id,
  removeBtn,
  addBtn,
  bookId,
}: Book) {
  const searchParams = useSearchParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [addBookToSave] = useAddBookToListMutation();
  const navigate = useRouter();
  const handleSaveBook = async () => {
    await addBookToSave({
      book_id: id,
      user_id: JSON.parse(getCookie("user")!)?.userId?.toString(),
    });
    messageApi.success("Book added to list");
  };
  return (
    <div className="py-10 flex flex-col gap-y-2x items-center shadow-md rounded-lg w-[268px] px-6 cursor-pointer relative">
      <div className="p-2 bg-blue-100 relative rounded-full flex items-end flex-col w-[220px] h-max justify-center">
        <div className="flex flex-col gap-2 absolute top-10 left-0">
          <Tag text={date} />
          <Tag text={rating} />
        </div>

        <Image src={image} alt="book image" width={120} height={192} />
      </div>
      <div
        className="pt-4"
        onClick={() =>
          navigate.push(routes.book.singleBook(id) + "?bookId=" + bookId)
        }
      >
        <p className="text-gray-800 text-h6 font-h1">{title}</p>
        <p className="text-p-sm text-primary-dark">{author}</p>
        <p className="text-p-sm text-red-600 capitalize">{language}</p>
      </div>
      <div className="mt-2">
        {!addBtn && (
          <div className="flex justify-center">
            <Button
              onClick={handleSaveBook}
              className="flex flex-row items-center gap-2 border-blue-700 text-blue-700 hover:border-blue-700 hover:text-blue-700 absolute bottom-4"
            >
              <HeartIcon />
              Add Book
            </Button>
          </div>
        )}
        {removeBtn && (
          <ButtonComponent
            text="Remove"
            type="button"
            size="text-[12px]"
            bgColor="border-red bg-red-600"
          />
        )}
      </div>
      {contextHolder}
    </div>
  );
}
const HeartIcon = () => {
  return (
    <svg
      className="w-6 h-6 text-gray-800 dark:text-blue-800"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
      />
    </svg>
  );
};
