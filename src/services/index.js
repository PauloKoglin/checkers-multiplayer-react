import axios from 'axios';
import config from '../config/config.js'

const baseURL = config.server_URL || 'http://localhost:3001';

const instance = axios.create({
    baseURL: baseURL + '/api',
    headers: {
        'content-type': 'application/json'
    }
});

export default instance;

