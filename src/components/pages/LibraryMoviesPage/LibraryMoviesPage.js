import './LibraryMoviesPage.scss'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'
import Spinner from '../../Spinner/Spinner'
import { List } from '../../MovieCardList/MovieCardList'

import useMoviesContext from '../../../context/useMoviesContext'
import useTmdbServices from '../../../services/tmdbServices'

import { useEffect, useState } from 'react'

const LibraryMoviesPage = () => {
    const {
        getMovie,
        isLoading,
        error,
        setError
    } = useTmdbServices()

    const {
        currentFilter
    } = useMoviesContext()

    const [currentList, setCurrentList] = useState([])

    const {
        queueList,
        watchedList,
    } = useMoviesContext()

    // Мой старый вариант (тоже работает)
    // const getList = (type) => {
    //     setCurrentList([])
    //     switch (type) {
    //         case 'queue':
    //             queueList.forEach(itemId => {
    //                 getMovie(itemId)
    //                     .then(res => setCurrentList(prevList => [...prevList, res]))
    //             })
    //             break
    //         case 'watched':
    //             watchedList.forEach(itemId => {
    //                 getMovie(itemId)
    //                     .then(res => setCurrentList(prevList => [...prevList, res]))
    //             })
    //             break
    //         default:
    //             setCurrentList([])
    //     }
    // }

    const getList = async (type) => {
        setCurrentList([])
        
        try {
            const list = type === 'queue' ? queueList : type === 'watched' ? watchedList : []
        
            const moviePromises = list.map(async (itemId) => {
            const res = await getMovie(itemId)
            return res
            })
        
            // Делать запросы форичом не самая хорогая практика
            const movies = await Promise.all(moviePromises)
        
            setCurrentList(movies)
        } catch (error) {
            setError(error.message || 'An error occurred while fetching movies.')
        }
    }

    useEffect(() => {
        getList(currentFilter)
        // eslint-disable-next-line
    }, [watchedList, queueList, currentFilter])

    return(
        <div className='library-page'>
            <LibraryHeader/>
            <LibraryList isLoading={isLoading}
                         error={error}
                         currentList={currentList}/>
        </div>
    )
}

const LibraryHeader = () => {
    const {
        currentFilter,
        setCurrentFilter
    } = useMoviesContext()

    return(
        <div className='library-header'>
            <h1>Welcome to your library!</h1>
            <p>Select the appropriate filter below to view the list</p>
            <div className="library-btns">
                <button className={`buttons button ${currentFilter === 'watched' ? 'main' : 'outline'}`} 
                        onClick={() => setCurrentFilter('watched')}>
                            Watched list
                </button>
                <button className={`buttons button ${currentFilter === 'queue' ? 'main' : 'outline'}`} 
                        onClick={() => setCurrentFilter('queue')}>
                            Queue list
                </button>
            </div>
        </div>
    )
}

const LibraryList = ({isLoading, error, currentList}) => {
    return(
        <>
            {
                isLoading ? (
                <Spinner style={{ margin: 'auto 0' }} />
                ) : error ? (
                <ErrorMessage msg={error} />
                ) : (
                <List isLoading={isLoading} 
                    error={error} 
                    movies={currentList} 
                    closeOnChoose={true}/>
                )
            }
        </>
    )
}

export default LibraryMoviesPage