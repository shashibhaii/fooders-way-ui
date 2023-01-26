import axios from 'axios';





export const unauthorizedaxios = axios.create({
    baseURL: 'https://food-service.osc-fr1.scalingo.io/api',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',

    },

});

export const authorizedaxios = (token, businessId) => axios.create({
    baseURL: 'https://food-service.osc-fr1.scalingo.io/api',
    headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'x-business-id': businessId
    }

})