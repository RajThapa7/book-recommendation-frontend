export const baseURL: string =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://localhost:4000/";

export const endpoints = {
    auth: {
        login: "/login",
        register: "/register",
        logout: "/logout",
        authSuccess: '/auth/success',
    },
    book: {
        checkIfBookIsInList: '/list/',
        getBooksRecommendation: (bookId?: string): string => `/books/recommendations/${bookId || 1}/?limit=10`,
        getAllBookList: `/books`,
        searchBookList: (query: string, other_query?: string): string => {

            if (other_query && other_query !== "no") {
                return '/books/search?search=' + query + "&" + other_query?.replace('-', "=");
            }
            return '/books/search?search=' + query
        },
        getBookById: (id: number | string): string => '/books/' + id,
        getSavedList: (id: number | string): string => '/list/' + id,
        addBookToList: '/list/add-book',
        removeBookFromList: ({ id, book_id }: { id: string, book_id: string }) => '/list/' + id + '/' + book_id,
    }
}