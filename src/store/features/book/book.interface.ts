export interface SearchBookFilter {
  search: string;
  optionValue: string;
  page: string;
  limit: string;
}
export interface AddBookToListInterface {
  user_id: string;
  book_id: string;
}
export interface RemoveBookInterface {
  password: string;
  username: string;
  email: string;
}
