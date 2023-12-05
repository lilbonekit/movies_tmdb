import './Pagination.scss';

import { isMobile } from 'react-device-detect';

import useTmdbServices from '../../services/tmdbServices';
import useMoviesContext from '../../context/useMoviesContext';
import { useEffect, useState } from 'react';

const Pagination = () => {
    const {currentPage, setCurrentPage, totalPages} = useMoviesContext()

    const [localLoading, setLocalLoading] = useState(false)
    const [timeoutId, setTimeoutId] = useState(null)

    const onHandleClick = (event) => {
        const dataTarget = event.target.getAttribute('data-page')
        if(dataTarget) {
            if(dataTarget !== currentPage) {
                setLocalLoading(true);
            
                // Запоминаем идентификатор таймаута
                const id = setTimeout(() => {
                    setLocalLoading(false);
                }, 1500);
                
                // Сохраняем идентификатор таймаута в состоянии
                setTimeoutId(id);
            }
            setCurrentPage(dataTarget)
        }
    }

    const {
        // isLoading,
        error,
        // request,
        // clearError,
        // getMovies
    } = useTmdbServices()

    useEffect(() => {
        // Отписываемся от таймаута при размонтировании компонента
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
        // eslint-disable-next-line
    }, [timeoutId])

    const result = localLoading ? (
        null
    ) : error ? (
        null
    ) : (
        <View totalPages={totalPages}
              currentPage={currentPage}
              onHandleClick={onHandleClick}/>
    )

    return result
}

const View = ({totalPages, currentPage, onHandleClick}) => {
    if(totalPages && currentPage) {
        let currentPageNumber = +currentPage
        const totalPagesNumber = +totalPages

        // totalPagesNumber если нужна будет аналогичная логика рендера для последней страницы
        // В API я даже не знаю с какой страницы нельзя будет делать запрос 
        // (естественно не все 41290 страниц недоступны)
        // Поэтому я повесил на последнюю кнопку disabled
        // А если пользователь столкнётся с проблемой, его редайректнет на первую страницу
        const countMiddlePagination = (currentPageNumber, totalPagesNumber , onHandleClick) => {
            if (currentPageNumber <= 3) {
                return(
                    <>
                         {[1, 2, 3, 4, 5].map((pageNumber) => (
                            <button
                            key={pageNumber}
                            data-page={pageNumber}
                            onClick={onHandleClick}
                            className={currentPageNumber === pageNumber ? 'active' : ''}>
                                {pageNumber}
                            </button>
                        ))}
                        ...
                    </>
                ) 
            } else if(currentPageNumber >= totalPagesNumber ||
                      currentPageNumber + 1 === totalPagesNumber ||
                      currentPageNumber + 2 === totalPagesNumber) {
                return (
                    <>
                        <button data-page="1" onClick={onHandleClick}>
                            1
                        </button>
                        ...
                        {
                            !isMobile ?
                            <button data-page={`${currentPageNumber - 2}`} onClick={onHandleClick}>
                               {`${currentPageNumber - 2}`}
                           </button> :
                           null
                        }
                        <button data-page={`${currentPageNumber - 1}`} onClick={onHandleClick}>
                            {`${currentPageNumber - 1}`}
                        </button>
                        <button data-page={`${currentPageNumber}`} onClick={onHandleClick}
                         className='active'>
                            {`${currentPageNumber}`}
                        </button>
                        {
                            currentPageNumber + 1 >= totalPagesNumber ?
                                null:
                            <button data-page={`${currentPageNumber + 1}`} onClick={onHandleClick}
                                className=''>
                                {`${currentPageNumber + 1}`}
                            </button>  
                        }
                    </>
                )
            } else {
                return(
                    <>
                        <button data-page="1" onClick={onHandleClick}>
                            1
                        </button>
                        ...
                        {
                            !isMobile ?
                            <button data-page={`${currentPageNumber - 2}`} onClick={onHandleClick}>
                                {`${currentPageNumber - 2}`}
                            </button> :
                            null
                        }
                        <button data-page={`${currentPageNumber - 1}`} onClick={onHandleClick}>
                            {`${currentPageNumber - 1}`}
                        </button>
                        <button data-page={`${currentPageNumber}`} 
                                onClick={onHandleClick}
                                className='active'>
                            {`${currentPageNumber}`}
                        </button>
                        <button data-page={`${currentPageNumber + 1}`} onClick={onHandleClick}>
                            {`${currentPageNumber + 1}`}
                        </button>
                        {
                            !isMobile ?
                            <button data-page={`${currentPageNumber + 2}`} onClick={onHandleClick}>
                                {`${currentPageNumber + 2}`}
                            </button> :
                            null
                        }
                        ...
                    </>
                )
            }
        }

        return(
            <div className='pagination'>
                {
                   countMiddlePagination(currentPageNumber, totalPagesNumber, onHandleClick)
                }
                {
                    currentPageNumber === totalPagesNumber ?
                    null :
                    <button
                        disabled={totalPagesNumber > 300} 
                        data-page={+totalPagesNumber} 
                        onClick={onHandleClick}>
                        {totalPagesNumber}
                    </button>
                }
            </div>
        )
    }
}

export default Pagination