//base url: https://api.themoviedb.org/3/
//url api: https://api.themoviedb.org/3/movie/now_playing?api_key=f914a2b2f8d4271fc4d2f03133cd355f&language=pt-BR

import axios from 'axios';

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
})

export default api;