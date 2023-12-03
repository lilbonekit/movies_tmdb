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
        clearError
    } = useHttp()

    const getMovies = async (params = null) => {
            // https://developer.themoviedb.org/reference/discover-movie
            // BASIC:
            // page
            // include_video
            // include_adult
            // language
        let stringified;
            params ? stringified = queryString.stringify(params) + '&' : stringified = ''

        const response = await request(`${apiConfig.baseUrl}discover/movie?${stringified}api_key=${apiConfig.apiKey}`)
        return {response, results: response.results}
    }

    return {
        isLoading,
        error,
        request,
        clearError,
        getMovies
    }
}

export default useTmdbServices