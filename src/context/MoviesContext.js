import { createContext, useState } from "react";

export const MoviesContext = createContext()

const MoviesProvider = (props) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [totalPages, setTotalPages] = useState(null)
    const [isPerfomedSearch, setIsPerfomedSearch] = useState(null)

    const state = {
        currentPage,
        setCurrentPage,
        searchQuery,
        setSearchQuery,
        totalPages,
        setTotalPages,
        isPerfomedSearch,
        setIsPerfomedSearch
    }

    return <MoviesContext.Provider value={state}>{props.children}</MoviesContext.Provider>
}

export default MoviesProvider
