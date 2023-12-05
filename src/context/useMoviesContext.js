import { useContext } from "react";
import { MoviesContext } from "./MoviesContext";

const useMoviesContext = () => {
    return useContext(MoviesContext)
}

export default useMoviesContext