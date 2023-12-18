import './MovieCard.scss'
import NoImg from '../../assets/no_img.png'
import apiConfig from '../../api/apiConfig'

import LibraryButtons from '../LibraryButtons/LibraryButtons'

import { useRef, useState } from 'react'

import { useNavigate, Link } from 'react-router-dom'

import Modal, {ModalContent} from '../Modal/Modal'
import { isMobile } from 'react-device-detect'

const MovieCard = (props) => {
    const {title, poster_path, id, closeOnChoose} = props
    const navigate = useNavigate()

    const [isOpenModal, setIsOpenModal] = useState(false)

    const setModalActive = (/* id */) => {
        // const modal = document.querySelector(`#modal_mini-movie-${id}`)
        // modal.classList.toggle('modal-active')
        setIsOpenModal(true)

    }

    let imgPath = apiConfig.originalImage(poster_path)
    const styles = imgPath.includes('originalnull') ? {background: 'transparent'} : {}
        imgPath = imgPath.includes('originalnull') ? NoImg : imgPath


    return(
        <>
            <li className='movie-card' 
                key={id}
                style={styles} 
                onClick={() => !isMobile ? setModalActive(id) : navigate(`/movie/${id}`)}>
                <img src={imgPath} alt={title} />
                <div className="overlay">
                    <h3>{title}</h3>
                </div>
            </li>
            {
                !isMobile ?
                <MovieItemModal item={props} 
                                isOpenModal={isOpenModal}
                                setIsOpenModal={setIsOpenModal}
                                closeOnChoose={closeOnChoose}/> :
                null
            }
        </>
    )
}

const MovieItemModal = ({item, isOpenModal, setIsOpenModal, closeOnChoose}) => {
    // В данном случае, мне это не нужно
    // const contentRef = useRef(null)
    const modalRef = useRef(null)

    const closeModalOverlay = (e) => {
        if(e.target === modalRef.current) {
            modalRef.current.classList.remove('modal-active')
            setIsOpenModal(false)
        }
    }

    const onClose = () => {
        setIsOpenModal(false)
    }

    return(
        <Modal active={isOpenModal}
               id={`modal_mini-movie-${item.id}`}
               closeModalOverlay={closeModalOverlay}
               ref={modalRef}>
            <ModalContent onClose={onClose}>
                <MovieItemModalView item={item} onClose={onClose} closeOnChoose={closeOnChoose}/>
            </ModalContent>
        </Modal>
    )

}

const MovieItemModalView = ({item, closeOnChoose}) => {
    const {
        original_title,
        original_language,
        popularity,
        release_date,
        vote_average,
        vote_count,
        adult,
        overview,
        poster_path,
        id
    } = item
    
    let imgPath = apiConfig.originalImage(poster_path)
    imgPath = imgPath.includes('originalnull') ? NoImg : imgPath

    return(
        <div className='movie-card-modal-content'>
            <div className='left'>
                <img className='preview' src={imgPath} alt={original_title}/>
                <LibraryButtons id={id} closeOnChoose={closeOnChoose}/>
            </div>
            <div>
                <h2>
                    {
                        original_title.length > 27 ?
                            original_title.slice(0, 27) + '...' :
                            original_title
                    } {adult ? '18+' : ''}
                </h2>
                <div className='char-wrapper'>
                    <div className="char">
                        <p className='char-name'>Vote / Votes</p>
                        <p className='char-desc'>{vote_average} / {vote_count}</p>
                    </div>
                    <div className="char">
                        <p className='char-name'>Popularity</p>
                        <p className='char-desc'>{popularity}</p>
                    </div>
                    <div className="char">
                        <p className='char-name'>Original language</p>
                        <p className='char-desc'>{original_language.toUpperCase()}</p>
                    </div>
                    <div className="char">
                        <p className='char-name'>Release date</p>
                        <p className='char-desc'>{release_date}</p>
                    </div>
                    <div className="overview">
                        <h3>Overview</h3>
                        <p>
                            {
                                overview.length > 150 ?
                                    overview.slice(0, 150).trim() + '...' :
                                    overview.trim().length === 0 ?
                                        'No description.' :
                                        overview
                            }
                        </p>
                    </div>
                    <Link onClick={() => {
                        document.body.style.overflow = 'auto'
                        document.body.style.marginRight = '0px'
                    }} to={`/movie/${id}`} className='buttons button main'>Visit the movie page</Link>
                </div>
            </div>
        </div>
    )
}

export default MovieCard