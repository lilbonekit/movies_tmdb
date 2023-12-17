import { createContext, useState, useEffect  } from "react";

export const MoviesContext = createContext()

const MoviesProvider = (props) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [totalPages, setTotalPages] = useState(null)
    const [isPerfomedSearch, setIsPerfomedSearch] = useState(null)
    const [queueList, setQueueList] = useState([])
    const [watchedList, setWatchedList] = useState([])
    const [currentFilter, setCurrentFilter] = useState('watched')

    // Загрузка значений из localStorage при монтировании компонента
    useEffect(() => {
        const storedWatchedList = JSON.parse(localStorage.getItem("watchedList")) || []
        const storedQueueList = JSON.parse(localStorage.getItem("queueList")) || []

        setWatchedList(storedWatchedList)
        setQueueList(storedQueueList)
    }, [])

  // Обновление localStorage при изменении списков
    useEffect(() => {
        localStorage.setItem("watchedList", JSON.stringify(watchedList))
    }, [watchedList])

    useEffect(() => {
        localStorage.setItem("queueList", JSON.stringify(queueList))
    }, [queueList])

    // Новый useEffect для подтягивания изменений из localStorage при их изменении извне
    useEffect(() => {
        const handleStorageChange = () => {
        const storedWatchedList = JSON.parse(localStorage.getItem("watchedList")) || []
        const storedQueueList = JSON.parse(localStorage.getItem("queueList")) || []

        setWatchedList(storedWatchedList)
        setQueueList(storedQueueList)
    };

    // Подписываемся на событие изменения в localStorage
    window.addEventListener("storage", handleStorageChange)

    // Отписываемся при размонтировании компонента
    return () => {
        window.removeEventListener("storage", handleStorageChange)
    }
    }, []) // Пустой массив зависимостей, чтобы эффект сработал только при монтировании

    const updateMyLibrary = (id, type, closeOnChoose) => {
        const isInQueue = queueList.includes(id)
        const isInWatched = watchedList.includes(id)


        const resetBody = (closeOnChoose) => {
            if(closeOnChoose) {
                document.body.style.marginRight = `0px`
                document.body.style.overflow = 'auto'
            }
        }
    
        switch (type) {
            case 'queue':
                resetBody(closeOnChoose)
                if (isInQueue) {
                    // Удаляем из очереди, если уже там
                    setQueueList(prevList => prevList.filter(el => el !== id))
                } else if (isInWatched) {
                    // Удаляем из просмотренных и добавляем в очередь
                    setWatchedList(prevList => prevList.filter(el => el !== id))
                    setQueueList(prevList => [...prevList, id])
                } else {
                    // Если не в очереди и не просмотрено, добавляем в очередь
                    setQueueList(prevList => [...prevList, id])
                }
                break
    
            case 'watched':
                resetBody(closeOnChoose)
                if (isInWatched) {
                    // Удаляем из просмотренных, если уже там
                    setWatchedList(prevList => prevList.filter(el => el !== id))
                } else if (isInQueue) {
                    // Удаляем из очереди и добавляем в просмотренные
                    setQueueList(prevList => prevList.filter(el => el !== id))
                    setWatchedList(prevList => [...prevList, id])
                } else {
                    // Если не в просмотренных и не в очереди, добавляем в просмотренные
                    setWatchedList(prevList => [...prevList, id])
                }
                break
    
            default:
                resetBody(closeOnChoose)
                break
        }
    };
    

    const state = {
        currentPage,
        setCurrentPage,
        searchQuery,
        setSearchQuery,
        totalPages,
        setTotalPages,
        isPerfomedSearch,
        setIsPerfomedSearch,
        updateMyLibrary,
        watchedList,
        queueList,
        currentFilter,
        setCurrentFilter
    }

    return <MoviesContext.Provider value={state}>{props.children}</MoviesContext.Provider>
}

export default MoviesProvider
