export interface SearchBookFilter {
  search: string;
  optionValue: string;
  page: string;
  limit: string;
}
export interface AddBookToListInterface {
  userId: string;
  bookId: string;
}
export interface RemoveBookInterface {
  password: string;
  username: string;
  email: string;
}
