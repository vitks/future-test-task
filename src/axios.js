import axios from 'axios';

// Объявление инстанса
const instance = axios.create({
    baseURL: 'http://www.filltext.com/'
});

export default instance;