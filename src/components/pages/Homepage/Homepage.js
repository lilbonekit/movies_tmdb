import './Homepage.scss';

import HeroSlider from '../../HeroSlider/HeroSlider';
import MovieCardList from "../../MovieCardList/MovieCardList";
import Pagination from "../../Pagination/Pagination";
import SearchPanel from '../../SearchPanel/SearchPanel';

const Homepage = () => {

    return(
        <div className='home-page'>
            <HeroSlider/>
            <h1>Movies</h1>
            <SearchPanel/>
            <MovieCardList/>
            <Pagination/>
        </div>
    )
}

export default Homepage