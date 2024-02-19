export interface SearchBookFilter {
    search: string
    optionValue: string
}
export interface AddBookToListInterface {
    user_id: string;
    book_id: string;
}
export interface RemoveBookInterface {
    password: string,
    username: string,
    email: string
}