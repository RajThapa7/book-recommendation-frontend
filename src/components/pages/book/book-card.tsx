import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { routes } from "@/contants/routes";

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
}
export default function BookCard({
  date,
  title,
  author,
  rating,
  image,
  language,
  id
}: Book) {
  const navigate = useRouter();
  return (
    <div
      className="py-12 flex flex-col gap-y-2x items-center shadow-md rounded-lg w-[268px] px-6 cursor-pointer"
      onClick={() => navigate.push(routes.book.singleBook(id))}
    >
      <div className="p-2 bg-blue-100 relative rounded-full flex items-end flex-col w-[220px] h-max justify-center">
        <div className="flex flex-col gap-2 absolute top-10 left-0">
          <Tag text={date} />
          <Tag text={rating} />
        </div>

        <Image src={image} alt="book image" width={120} height={192} />
      </div>
      <div className="pt-4">
        <p className="text-gray-800 text-h6 font-h1">{title}</p>
        <p className="text-p-sm text-primary-dark">{author}</p>
        <p className="text-p-sm text-red-600 capitalize">{language}</p>
      </div>
    </div>
  );
}
