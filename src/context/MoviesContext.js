import { createContext, useState } from "react";

export const MoviesContext = createContext()

const MoviesProvider = (props) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSeacthQuery] = useState('')
    const [totalPages, setTotalPages] = useState(null)

    const state = {
        currentPage,
        setCurrentPage,
        searchQuery,
        setSeacthQuery,
        totalPages,
        setTotalPages
    }

    return <MoviesContext.Provider value={state}>{props.children}</MoviesContext.Provider>
}

export default MoviesProvider
