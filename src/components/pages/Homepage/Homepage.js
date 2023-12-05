import './Homepage.scss';

import MovieCardList from "../../MovieCardList/MovieCardList";
import Pagination from "../../Pagination/Pagination";

const Homepage = () => {

    return(
        <div className='home-page'>
            <MovieCardList/>
            <Pagination/>
        </div>
    )
}

export default Homepage