import './Pagination.scss';

import useTmdbServices from '../../services/tmdbServices';
import { useEffect, useState } from 'react';

const Pagination = ({setCurrentPage, currentPage}) => {
    const [totalPages, setTotalPages] = useState(null)
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
                }, 2000);
                
                // Сохраняем идентификатор таймаута в состоянии
                setTimeoutId(id);
            }
            setCurrentPage(dataTarget)
        }
    }

    const {
        // isLoading,
        // error,
        // request,
        // clearError,
        getMovies
    } = useTmdbServices()

    useEffect(() => {
        getMovies()
            .then(res => setTotalPages(res.response.total_pages))

        // Отписываемся от таймаута при размонтировании компонента
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
        // eslint-disable-next-line
    }, [timeoutId])

    const result = localLoading ? 
        null :
        <View totalPages={totalPages}
              currentPage={currentPage}
              onHandleClick={onHandleClick}/>

    return result
}

const View = ({totalPages, currentPage, onHandleClick}) => {
    if(totalPages && currentPage) {
        let currentPageNumber = +currentPage
        const totalPagesNumber = +totalPages

        // totalPagesNumber если нужна будет аналогичная логика рендера для последней страницы
        // В API я даже не знаю с какой страницы нельзя будет делать запрос 
        // (естественно все 41290 страниц недоступны)
        // Поэтому я повесил на последнюю кнопку disabled
        // А если пользователь столкнётся с проблемой, его редайректнет на первую страницу
        const countMiddlePagination = (currentPageNumber,_ , onHandleClick) => {
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
            } else {
                return(
                    <>
                        <button data-page="1" onClick={onHandleClick}>
                            1
                        </button>
                        ...
                        <button data-page={`${currentPageNumber - 2}`} onClick={onHandleClick}>
                            {`${currentPageNumber - 2}`}
                        </button>
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
                        <button data-page={`${currentPageNumber + 2}`} onClick={onHandleClick}>
                            {`${currentPageNumber + 2}`}
                        </button>
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
                <button
                    disabled={true} 
                    data-page={+totalPagesNumber} 
                    onClick={onHandleClick}>
                    {totalPagesNumber}
                </button>
            </div>
        )
    }
}

export default Pagination