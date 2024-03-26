export interface AddRatingInterface {
  rating: number;
  review: string;
  userId: number | string;
  bookId: number | string;
}
export interface GetBookRatingInterface {
  bookId: string | number;
  userId: string | number;
  page_number: number;
}

export interface DeleteRatingInterface {
  bookId: string | number;
  userId: string | number;
}