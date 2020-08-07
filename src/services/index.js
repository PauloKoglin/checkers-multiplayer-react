import axios from 'axios';
import config from '../config/config.js'

const instance = axios.create({
    baseURL: config.server_URL || 'http://localhost:3001',
    headers: {
        'content-type': 'application/json'
    }
});

export default instance;
