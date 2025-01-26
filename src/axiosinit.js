import axios from 'axios';





export const unauthorizedaxios = axios.create({
    baseURL: 'https://api.theskshaw.in/api',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning":"any",
    },

});

export const authorizedaxios = (token, businessId) => axios.create({
    baseURL: 'https://api.theskshaw.in/api',
    headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'x-business-id': businessId,
        "ngrok-skip-browser-warning":"any",
    }

})