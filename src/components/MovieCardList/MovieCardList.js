import './MovieCardList.scss'
import MovieCard from '../MovieCard/MovieCard'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

import { useEffect, useState } from 'react'

import useTmdbServices from '../../services/tmdbServices'
import Spinner from '../Spinner/Spinner'

import useMoviesContext from '../../context/useMoviesContext'

const MovieCardList = () => {
    const {currentPage, setCurrentPage, setTotalPages, searchQuery} = useMoviesContext()
    const [movies, setMovies] = useState([])

    const {         
        isLoading,
        error,
        // clearError,
        getMovies 
    } = useTmdbServices()

    const onMovieListLoading = () => {
        getMovies({
            query: searchQuery,
            page: currentPage
        })
            .then(res => {
                setMovies(res.results)
                setTotalPages(res.response.total_pages)
            })
            .catch(() => setCurrentPage(1))
    }
    
    useEffect(() => {
        onMovieListLoading()
        // eslint-disable-next-line
    }, [currentPage, searchQuery])

    return(
        <section className='movies'>
           <div className="container">
                <h1>Movies</h1>
                {
                    <ul className='movies-list'>
                        {isLoading ? (
                                <Spinner style={{ margin: 'auto 0' }} />
                            ) : error ? (
                                <ErrorMessage msg={'Something went wrong. Please try again later.'}/>
                            ) : (
                                <View movies={movies} />
                            )}
                    </ul>
                }
           </div>
        </section>
    )
}

const View = ({movies}) => {
    return movies.map(movie => <MovieCard key={movie.id} {...movie}/>)
}

export default MovieCardList