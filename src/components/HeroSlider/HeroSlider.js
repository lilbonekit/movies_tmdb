import './HeroSlider.scss'

import SwiperCore, { Autoplay } from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'

import Spinner from '../Spinner/Spinner'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

import apiConfig from '../../api/apiConfig'
// const apiConfig = {
//     baseUrl: 'https://api.themoviedb.org/3/',
//     apiKey: 'c9a865bc8fe806d42a087d3107ff7ca6',
//     originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
//     w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
// }

import useTmdbServices from '../../services/tmdbServices'
import { useEffect, useState } from 'react'

const HeroSlider = () => {

    SwiperCore.use([Autoplay])

    const [movieItems, setMovieItems] = useState([])

    const {         
        isLoading,
        error,
        // clearError,
        getMovies 
    } = useTmdbServices()

    useEffect(() => {
        getMovies({
            page: 11
        })
        .then(res => {
            const moviesArray = res.response.results
            const SliderItems = moviesArray.slice(1, 5)
            setMovieItems(SliderItems)
        })
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
                            <View movieItems={movieItems} />
                        )
            }
        </section>
    )
}

const View = ({movieItems}) => {
    return(
        <Swiper
                autoplay={{delay: 3000}}
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={() => {}}
                onSwiper={(swiper) => {}}
            >

            {
                movieItems.map((item, i) => (
                    <SwiperSlide key={item.id}>
                        <div className="slide">
                            <div className="slide-desc">
                                <div className="slide-txt">
                                    <h1>{item.title}</h1>
                                    <p>{item.overview}</p>
                                    <div className="slide-btns">
                                        <button className='buttons main' 
                                                onClick={() => console.log('test')}>
                                            Watch now
                                        </button>
                                        <button className='buttons outline' 
                                                onClick={() => console.log('test')}>
                                            Watch trailer
                                        </button>
                                    </div>
                                </div>
                                <img className='slide-preview'
                                     src={apiConfig.originalImage(item.backdrop_path)}
                                     alt={`Slide ${i + 1}`}/>
                            </div>
                            <div className='slide-overlay'></div>
                            <img className='slide-bg' 
                                 src={apiConfig.originalImage(item.backdrop_path)}
                                 alt={`Slide ${i + 1}`}/>
                        </div>
                    </SwiperSlide>
                ))
            }
            </Swiper>
    )
}

export default HeroSlider