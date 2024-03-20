import { Skeleton } from "antd";

const BookSkeletal = () => {
  return (
    <div className="w-72 border-2 border-gray-100 rounded-md p-6">
      <Skeleton active={true} paragraph={{ rows: 8 }} loading={true}>
        hello
      </Skeleton>
    </div>
  );
};

export default BookSkeletal;
