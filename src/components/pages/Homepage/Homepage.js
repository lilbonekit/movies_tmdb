import './Homepage.scss';

import MovieCardList from "../../MovieCardList/MovieCardList";
import Pagination from "../../Pagination/Pagination";
import SearchPanel from '../../SearchPanel/SearchPanel';

const Homepage = () => {

    return(
        <div className='home-page'>
            <h1>Movies</h1>
            <SearchPanel/>
            <MovieCardList/>
            <Pagination/>
        </div>
    )
}

export default Homepage