import useMoviesContext from "../../context/useMoviesContext"
import { AddedToWatched, AddToQueue } from "../Icons/Icons"

const LibraryButtons = ({id, closeOnChoose = false}) => {
    const{ updateMyLibrary, watchedList, queueList } = useMoviesContext()

    return(
        <div className="buttons__wrapper">
            <button className={`button ${watchedList.includes(id) ? 'active' : ''}`} 
                    onClick={() => updateMyLibrary(id, 'watched', closeOnChoose)}>
                    <AddedToWatched/>
                    <p>
                        {
                            watchedList.includes(id) ? 'Added to watched list' : 'Add to watch list'
                        } 
                    </p>
            </button>
            <button className={`button ${queueList.includes(id) ? 'active' : ''}`}
                    onClick={() => updateMyLibrary(id, 'queue', closeOnChoose)}>
                <AddToQueue/>
                <p>
                    {
                        queueList.includes(id) ? 'Added to queue list' : 'Add to queue list'
                    }
                </p>
            </button>
        </div>
    )
}

export default LibraryButtons