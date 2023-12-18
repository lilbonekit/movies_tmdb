import './SingleMoviePage.scss'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useTmdbServices from '../../../services/tmdbServices'

import { Helmet } from 'react-helmet'

import LibraryButtons from '../../LibraryButtons/LibraryButtons'
import Spinner from '../../Spinner/Spinner'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'

import noImgPath from '../../../assets/no_img.png'

import apiConfig from '../../../api/apiConfig'
// const apiConfig = {
//     baseUrl: 'https://api.themoviedb.org/3/',
//     apiKey: 'c9a865bc8fe806d42a087d3107ff7ca6',
//     originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
//     w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
// }

const SingleMoviePage = () => {
    const [trailers, setTrailers] = useState(null)
    const [movie, setMovie] = useState(null)
    const [credits, setCredits] = useState(null)

    const {id} = useParams()
    const {
           getMovie,
           getVideo,
           isLoading,
           error,
           getCredits
        } = useTmdbServices()

    const onSingleMoviePageLoaded = async (id) => {
        try {
            // Два запроса параллельно
            const [movieResponse, videoResponse, creditsResponse] = await Promise.all([getMovie(id), getVideo(id), getCredits(id)])
      
            // Обрабатываем результат
            const splicedCredits = [...creditsResponse.response.cast.splice(0, 5)]
            setMovie(movieResponse)
            setTrailers(videoResponse.results)
            setCredits(splicedCredits)
          } catch (error) {
            console.error("Error!", error)
          }
    }

    useEffect(() => {
        onSingleMoviePageLoaded(id)
    }, [])

    return(
        <div className='single-movie-page' style={error ? {position: 'unset'} : {}}>
            <Helmet>
                <title>TheMovideDB | {movie ? movie.title : ''} Movie page</title>
            </Helmet>
            {isLoading ? 
                (
                    <Spinner style={{ margin: 'auto 0' }} />
                    ) : error ? 
                    (
                        <ErrorMessage msg={'Fetching error!'} smile='😖'/>
                        ) : 
                        (
                            movie ?
                            <>
                            <div className="overlay"></div>
                            <img src={`${apiConfig.originalImage(movie.backdrop_path || movie.poster_path)}`} alt='poster' className='poster'/>
                            <Content movie={movie}
                                        credits={credits}
                                        trailers={trailers}/>
                            </> :
                            null
                )
            }
        </div>
    )
}

const Content = ({movie, credits, trailers}) => {
    
    const {
        title,
        overview,
        genres,
        backdrop_path,
        poster_path,
        id
    } = movie

    const imgPath = (backdrop_path || poster_path) ? apiConfig.originalImage(backdrop_path || poster_path) : noImgPath


    return(
        <div className='content'>
            <section className='hero-movie'>
                <div className="left">
                    <LibraryButtons id={id}/>
                    <img src={imgPath} alt={title} className='preview'/>
                </div>
                <div className='descr'>
                    <h1>{title}</h1>
                    <div className='genres'>
                        {
                            genres.map(genre => <span className='genre' key={genre.id}>{genre.name}</span>)
                        }
                    </div>
                    <p>
                        {
                            overview ? overview : 'No overview'
                        }
                    </p>
                    <div className="credits">
                        <h3>Casts</h3>
                        {
                           <div className="credits__wrapper">
                            {
                                credits.length === 0 ?
                                    <ErrorMessage msg={'No info...'} smile='' styles={{position: 'unset', transform: 'unset', textAlign: 'left', fontSize: '0.6rem'}}/> :
                                    null
                             }
                             {
                                credits.map(actor => 
                                    {
                                        const actorImgPath = actor.profile_path ? apiConfig.originalImage(actor.profile_path) : noImgPath
                                        return (
                                            <div className='credit' key={actor.id}>
                                                <img src={actorImgPath} alt={actor.name}/>
                                                <p>{actor.name}</p>
                                            </div>
                                            )
                                    }
                                )
                             }
                           </div>
                        }
                    </div>
                </div>
            </section>
            <section className='trailers'>
                {
                    <>
                    {
                        trailers.length === 0 ?
                            <ErrorMessage msg={'No videos...'} smile='😣' styles={{position: 'unset', transform: 'unset'}}/> :
                            null
                    }
                    { 
                        trailers.map(trailer => 
                        <div className='trailer' key={trailer.id}>
                            <h3>{trailer.name}</h3>
                            <iframe title={trailer.name} src={`https://www.youtube.com/embed/${trailer.key}`}></iframe>
                        </div>)}
                    </>
                }
            </section>
        </div>
    )
}

export default SingleMoviePage