import './MovieCard.scss'
import NoImg from '../../assets/no_img.png';
import apiConfig from '../../api/apiConfig'

const MovieCard = (props) => {
    const {title, poster_path} = props
    let imgPath = apiConfig.originalImage(poster_path)

    imgPath = imgPath.includes('originalnull') ? NoImg : imgPath

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