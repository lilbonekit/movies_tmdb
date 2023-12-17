import './SingleMoviePage'
import { useParams } from 'react-router-dom'

const SingleMoviePage = () => {
    const {id} = useParams()

    return(
        <>
            SingleMoviePage {id}
        </>
    )
}

export default SingleMoviePage