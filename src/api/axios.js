import axios from 'axios';

export default axios.create({
    baseURL: 'https://food-service.osc-fr1.scalingo.io/api'
})