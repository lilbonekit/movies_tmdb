import './Homepage.scss';

import MovieCardList from "../../MovieCardList/MovieCardList";
import Pagination from "../../Pagination/Pagination";

import { useState } from "react";

const Homepage = () => {
    const [currentPage, setCurrentPage] = useState(1)

    return(
        <div className='home-page'>
            <MovieCardList 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
            <Pagination 
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}/>
        </div>
    )
}

export default Homepage