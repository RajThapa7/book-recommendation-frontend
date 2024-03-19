import { GetBookRatingInterface } from "@/store/features/ratings/rating.interface";

export const baseURL: string =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://localhost:4000/";

export const endpoints = {
  auth: {
    login: "/login",
    register: "/register",
    logout: "/logout",
    authSuccess: "/auth/success",
  },
  book: {
    checkIfBookIsInList: "/list/",
    getBooksRecommendation: (bookId?: string | number): string =>
      `/books/recommendations/${bookId || 1}`,
    getAllBookList: `/books`,
    searchBookList: (
      query: string,
      other_query?: string,
      page?: string,
      limit?: string
    ): string => {
      if (other_query && other_query !== "no") {
        return (
          "/books/search?search=" +
          query +
          "&" +
          other_query?.replace("-", "=") +
          `&page=${page}&limit=${limit}`
        );
      }
      return "/books/search?search=" + query + `&page=${page}&limit=${limit}`;
    },
    getBookById: (id: number | string): string => "/books/" + id,
    getSavedList: (id: number | string): string => "/list/" + id,
    getUserRatingOnBook: ({ userId, bookId }: GetBookRatingInterface) =>
      `/ratings/${userId}/13`,
    addBookToList: "/list/add-book",
    addRatingToBook: "/ratings/add",
    removeBookFromList: ({ id, book_id }: { id: string; book_id: string }) =>
      "/list/" + id + "/" + book_id,
  },
};
