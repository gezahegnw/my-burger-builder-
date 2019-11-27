import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-react-burger-app-56803.firebaseio.com/'
});

export default instance;