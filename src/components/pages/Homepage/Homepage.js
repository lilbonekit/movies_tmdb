import './Homepage.scss';

import MovieCardList from "../../MovieCardList/MovieCardList";
import Pagination from "../../Pagination/Pagination";
import SearchPanel from '../../SearchPanel/SearchPanel';

import useMoviesContext from '../../../context/useMoviesContext';

const Homepage = () => {
    const {totalPages} = useMoviesContext()

    return(
        <div className='home-page'>
            <SearchPanel/>
            <MovieCardList/>
            {
                totalPages === 1 ?
                null :
                <Pagination/>
            }
        </div>
    )
}

export default Homepage