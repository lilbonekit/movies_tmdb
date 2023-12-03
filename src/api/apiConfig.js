const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'c9a865bc8fe806d42a087d3107ff7ca6',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
}

export default apiConfig