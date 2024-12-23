import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: 'ea3ba0865578bbab1aca43fdf90194cc',
        language: 'ko-KR',
    }
});

export default instance;