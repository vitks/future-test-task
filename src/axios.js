import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://www.filltext.com/'
});

export default instance;