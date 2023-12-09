import './Pagination.scss';
import { Pagination } from '@mui/material';

import { isMobile } from 'react-device-detect';

import useTmdbServices from '../../services/tmdbServices';
import useMoviesContext from '../../context/useMoviesContext';
import { useEffect, useState } from 'react';

const PaginationPanel = () => {
    const {currentPage, setCurrentPage, totalPages} = useMoviesContext()

    const [localLoading, setLocalLoading] = useState(false)
    const [timeoutId, setTimeoutId] = useState(null)

    const onHandleClick = (num) => {
            if(num !== +currentPage) {
                setLocalLoading(true);

                 // Запоминаем идентификатор таймаута
                const id = setTimeout(() => {
                    setLocalLoading(false);
                }, 1500);
            
                // Сохраняем идентификатор таймаута в состоянии
                setTimeoutId(id);

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
              setCurrentPage={setCurrentPage}
              onHandleClick={onHandleClick}/>
    )

    return result
}

const View = ({ totalPages, currentPage, setCurrentPage, onHandleClick }) => {
    return(
        <div className="pagination">
              {
                totalPages === 1 ?
                null :
                <Pagination
                    size={isMobile ? 'small' : 'large'} 
                    count={+totalPages}
                    page={+currentPage}
                    onChange={(_, num) => {
                        setCurrentPage(num)
                        onHandleClick(num)
                }}/>
            }
        </div>
    )
};



export default PaginationPanel