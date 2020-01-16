import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://new-test-zap.firebaseio.com/'
});

export default instance;