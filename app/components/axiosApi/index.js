import axios from 'axios';
import Config from 'web/config.js'

export default axios.create({
    baseURL: `${Config.BASE_URL}api/`,
    responseType: 'json'
});