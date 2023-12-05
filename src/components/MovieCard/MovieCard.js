import './MovieCard.scss'
import apiConfig from '../../api/apiConfig'

const MovieCard = (props) => {
    const {title, poster_path} = props
    const imgPath = apiConfig.originalImage(poster_path)

    return(
        <li className='movie-card'>
            <img src={imgPath} alt={title} />
            <div className="overlay">
                <h3>{title}</h3>
            </div>
        </li>
    )
}

export default MovieCard