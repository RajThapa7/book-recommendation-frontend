export const Auth = {
    _login: (): string => "/login",
    _register: (): string => "/register",
    _logout: (): string => "/logout",
    _authSuccess: (): string => '/auth/success',
}

export const Book = {
    _checkIfBookIsInList: (): string => '/list/',
    _getBooksRecommendation: (): string => '/books/recommendations/',
    _getAllBookList: (query?: string): string => `'/books${query}`,
    _searchBookList: (query: string): string => '/books/search' + query,
    _getBookById: (id: number | string): string => '/books/' + id,
    _getSavedList: (id: number | string): string => '/list/' + id,
    _addBookToList: (): string => '/list/add-book',
    _removeBookFromList: (): string => '/list/',
}
