export const Auth = {
    _login: (): string => "/login",
    _register: (): string => "/register",
    _logout: (): string => "/logout",
    _authSuccess: (): string => '/auth/success',
}

export const Book = {
    _checkIfBookIsInList: (): string => '/list/',
    _getBooksRecommendation: (bookId?: string): string => `/books/recommendations/${bookId || 1}/?limit=10`,
    _getAllBookList: (): string => `/books`,
    _searchBookList: (query: string, other_query?: string): string => {

        if (other_query && other_query !== "no") {
            return '/books/search?search=' + query + "&" + other_query?.replace('-', "=");
        }
        return '/books/search?search=' + query
    },
    _getBookById: (id: number | string): string => '/books/' + id,
    _getSavedList: (id: number | string): string => '/list/' + id,
    _addBookToList: (): string => '/list/add-book',
    _removeBookFromList: (): string => '/list/',
}
