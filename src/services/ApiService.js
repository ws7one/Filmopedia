import axios from 'axios';
import {
    BASE_URL,
    REQUEST_TIMEOUT,
    TOKEN
} from 'react-native-dotenv';

const requestTimeout = Number(REQUEST_TIMEOUT);
const instance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: { Authorization: `Bearer ${TOKEN}` },
    timeout: requestTimeout
});

export const getResource = (subUrl, headers) => requestHandler('get', subUrl, null, headers);

export const postResource = (subUrl, body, headers) =>
    requestHandler('post', subUrl, body, headers);

requestHandler = (method, subUrl, body, headers) => new Promise((resolve, reject) => {
    const options = {
        method,
        url: subUrl,
        headers: {
            ...instance.defaults.headers.common,
            ...headers
        },
    };

    if (body) options.data = body;

    instance.request(options)
        .then(response => resolve(response.data))
        .catch(error => reject({
            status: error.response.status,
            statusText:
                error.response.data.message ||
                error.response.data.error,
            password_is_valid:
                error.response.data
                    .password_is_valid,
            errors: error.response.data.errors
        }));
});
