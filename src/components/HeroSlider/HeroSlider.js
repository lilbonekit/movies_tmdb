import './HeroSlider.scss'

import SwiperCore, { Autoplay } from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'

import { Link } from 'react-router-dom'

import Spinner from '../Spinner/Spinner'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Modal, { ModalContent } from '../Modal/Modal'

import apiConfig from '../../api/apiConfig'
// const apiConfig = {
//     baseUrl: 'https://api.themoviedb.org/3/',
//     apiKey: 'c9a865bc8fe806d42a087d3107ff7ca6',
//     originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
//     w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
// }
import useTmdbServices from '../../services/tmdbServices'
import { useEffect, useState, useRef } from 'react'

const HeroSlider = () => {

    SwiperCore.use([Autoplay])

    const [movieItems, setMovieItems] = useState([])

    const {         
        isLoading,
        error,
        // clearError,
        getMovies,
        // getVideo 
    } = useTmdbServices()

    useEffect(() => {
        getMovies({
            page: 14
        })
        .then(res => {
            const moviesArray = res.response.results
            const SliderItems = moviesArray.slice(1, 5)
            setMovieItems(SliderItems)
        })
        //eslint-disable-next-line
    }, [])

    return(
        <section className='hero-slider'>
            {
             
                isLoading ? 
                (
                    <Spinner style={{ margin: 'auto 0' }} />
                ) : error ? 
                    (
                        <ErrorMessage msg={'Something went wrong. Please try again later.'}/>
                    ) : (
                            <Slider movieItems={movieItems} />
                        )
            }
        </section>
    )
}

const Slider = ({ movieItems }) => {
    const swiperRef = useRef(null)

    return (
        <>
            <Swiper
                ref={swiperRef}
                autoplay={{ delay: 3000 }}
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={() => {}}
                onSwiper={() => {}}>
                
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({isActive}) => (
                                <HeroSliderItem item={item} isActive={isActive} swiperRef={swiperRef}/>
                            )}
                        </SwiperSlide>))
                }
                
            </Swiper>
            {
                movieItems.map((item, i) => <TrailerModal key={i} item={item}/>)
            }
        </>
    );
}

const HeroSliderItem = ({item, isActive, swiperRef}) => {
    const {getVideo} = useTmdbServices()
    
    const setModalActive = async (id) => {
        const modal = document.querySelector(`#modal_${item.id}`)

         // Отключение autoplay в Swiper при открытии модалки
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.stop();
        }

        getVideo(id)
            .then(res => {
                if(res.results.length > 0) {
                    const videoSrc = 'https://www.youtube.com/embed/' + res.results[0].key
                    modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc)
                } else {
                    modal.querySelector('.modal__content > iframe').innerHTML = 'No trailer'
                }
            })

        document.body.style.overflow = 'hidden'
        modal.classList.toggle('modal-active')
    }

    return(
            <div className={`slide ${isActive ? 'slide-active' : ''}`}>
                <div className='slide-desc'>
                <div className='slide-txt'>
                    <h1>{item.title}</h1>
                    <p>
                        {
                            item.overview.length > 300 ?
                                item.overview.slice(0, 300) + '...' :
                                item.overview
                        }
                    </p>
                    <div className='slide-btns'>
                        <Link to={`movie/${item.id}`}
                              className='buttons button main'>
                            Watch now
                        </Link>
                        <button
                            className='buttons outline'
                            onClick={() => setModalActive(item.id)}>
                            Watch trailer
                        </button>
                    </div>
                </div>
                <img
                    className='slide-preview'
                    src={apiConfig.originalImage(item.backdrop_path)}
                    alt={item.title}
                />
            </div>
            <div className='slide-overlay'></div>
            <img
                className='slide-bg'
                src={apiConfig.originalImage(item.backdrop_path)}
                alt={item.title}
            />
        </div>
    )
}

const TrailerModal = (props) => {
    const item = props.item

    const iframeRef = useRef(null)
    const modalRef = useRef(null)

    const closeModalOverlay = (e) => {
        document.body.style.overflow = 'auto'
        modalRef.current.querySelector('.modal__content > iframe').setAttribute('src', '')
        modalRef.current.classList.remove('modal-active')
    }

    const onClose = () => {
        iframeRef.current.setAttribute('src', '')
    }

    return(
        <Modal active={false}
               id={`modal_${item.id}`}
               closeModalOverlay={closeModalOverlay}
               ref={modalRef}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width='100%' height='400px' title='trailer'></iframe>
            </ModalContent>
        </Modal>
    )

}

export default HeroSlider