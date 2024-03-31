export const routes = {
  auth: {
    login: "/login",
    signup: "/signup",
    save_book: "/save-book",
  },
  book: {
    book: "/books",
    singleBook: (id: number | string) => "/books/" + id,
  },
  admin: {
    books: "/admin/books",
    users: "/admin/users",
  },
};
