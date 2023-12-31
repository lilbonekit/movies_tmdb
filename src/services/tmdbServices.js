import useHttp from "../hooks/useHttp";

import apiConfig from "../api/apiConfig";
// apiConfig = {
//     baseUrl: 'https://api.themoviedb.org/3/',
//     apiKey: 'c9a865bc8fe806d42a087d3107ff7ca6',
//     originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
//     w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
// }

import queryString from "query-string";

const useTmdbServices = () => {
    const {
        isLoading,
        error,
        request,
        clearError,
        setError
    } = useHttp()

    const getMovies = async (params = null) => {
            // https://developer.themoviedb.org/reference/discover-movie
            // DISCOVER:
            // page
            // include_video
            // include_adult
            // language
            // SEARCH:
            // query
        let stringified
            params ? stringified = queryString.stringify(params) + '&' : stringified = ''

            // URL для поиска и для показа отличается одним словом search / discover
            // Если я хочу в одном месте и показывать резульаты поиска и просто результаты
            // то полный URL нужно расчитывать динамически
        const { query } = params || {}
        const afterBaseUrl = query ? 'search' : 'discover'

        const response = await request(`${apiConfig.baseUrl}${afterBaseUrl}/movie?${stringified}api_key=${apiConfig.apiKey}`)
        return {response, results: response.results}
    }

    // Получить несколько трейлеров
    const getVideo = async (movieID) => {
        const response = await request(`${apiConfig.baseUrl}movie/${movieID}/videos?api_key=${apiConfig.apiKey}`)
        return {response, results: response.results}
    }

    // Инфа об актёрах снявшихся в фильме
    // https://developer.themoviedb.org/reference/movie-credits
    const getCredits = async (movieID) => {
        const response = await request(`${apiConfig.baseUrl}movie/${movieID}/credits?api_key=${apiConfig.apiKey}`)
        return {response, results: response.results}
    }

    // Детали о фильме (пригодится, когда буду делать Watched, Queue)
    // https://developer.themoviedb.org/reference/movie-details
    const getMovie = async (movieID) => {
        const response = await request(`${apiConfig.baseUrl}movie/${movieID}?api_key=${apiConfig.apiKey}`)
        return response
    }

    // Похожие
    // https://developer.themoviedb.org/reference/movie-similar

    return {
        isLoading,
        error,
        request,
        clearError,
        getMovies,
        getMovie,
        getCredits,
        getVideo,
        setError
    }
}

export default useTmdbServices