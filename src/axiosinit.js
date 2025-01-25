import axios from 'axios';





export const unauthorizedaxios = axios.create({
    baseURL: 'http://food-service-env-1.eba-es8trfam.us-east-1.elasticbeanstalk.com/api',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning":"any",
    },

});

export const authorizedaxios = (token, businessId) => axios.create({
    baseURL: 'http://food-service-env-1.eba-es8trfam.us-east-1.elasticbeanstalk.com/api',
    headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'x-business-id': businessId,
        "ngrok-skip-browser-warning":"any",
    }

})