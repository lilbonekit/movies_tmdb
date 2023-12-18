import './MovieCardList.scss'
import MovieCard from '../MovieCard/MovieCard'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

import { useEffect, useState } from 'react'

import useTmdbServices from '../../services/tmdbServices'
import Spinner from '../Spinner/Spinner'

import useMoviesContext from '../../context/useMoviesContext'

export const MovieCardList = () => {
    const {
        currentPage,
        // setCurrentPage,
        setTotalPages,
        searchQuery,
        setIsPerfomedSearch,
        currentFilter
    } = useMoviesContext()
    const [movies, setMovies] = useState([])

    const {         
        isLoading,
        error,
        setError,
        clearError,
        getMovies 
    } = useTmdbServices()

    const onMovieListLoading = () => {
        getMovies({
            query: searchQuery,
            page: currentPage
        })
            .then(res => {
                clearError()
                setMovies(res.results)
                setTotalPages(res.response.total_pages)
                setIsPerfomedSearch(res.response.total_results)
            })
            .catch(() => {
                setError('There are no results on this page...')
                // setCurrentPage(1)
            })
    }
    
    useEffect(() => {
        onMovieListLoading()
        // eslint-disable-next-line
    }, [currentPage, searchQuery])

    return(
        <List isLoading={isLoading}
              error={error}
              movies={movies}
              currentFilter={currentFilter}/>
    )
}

export const List = ({isLoading, error, movies, closeOnChoose}) => {
    return(
        <section className='movies'>
           <div className="container">
                {
                    <ul className='movies-list'>
                        {isLoading ? (
                                <Spinner style={{ margin: 'auto 0' }} />
                            ) : error ? (
                                <ErrorMessage msg={error}/>
                            ) : (
                                <View movies={movies}
                                        isLoading={isLoading}
                                      closeOnChoose={closeOnChoose}/>
                            )}
                    </ul>
                }
           </div>
        </section>
    )
}

const View = ({ movies, closeOnChoose }) => {
    const { currentFilter, searchQuery } = useMoviesContext();
  
    return movies && movies.length > 0
      ? movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} closeOnChoose={closeOnChoose} />
        ))
      : !searchQuery
      ? (
          <ErrorMessage smile=':(' msg={`You don't have any movies in your ${currentFilter} list...`} />
        )
      : (
          <ErrorMessage smile=':(' msg={`No results...`} />
        );
  };
  

export default MovieCardList