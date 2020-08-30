import {
    IMAGE_BASE_URL
} from 'react-native-dotenv';

export const searchEndpoint = (
    query,
    page,
    includeAdult = false,
    language = 'en-US',
    region = null,
    year = 2019,
    primaryReleaseYear = null
) => {
    let url =
        'search/movie?' +
        `language=${language}&query=${query}&page=${page}&include_adult=${includeAdult}`;

    if (region) url += `&region=${region}`;
    if (year) url += `&year=${year}`;
    if (primaryReleaseYear) url += `&primary_release_year=${primaryReleaseYear}`;
    return url;
};

export const movieEndpoint = (movieId, language = 'en-US') =>
    `movie/${movieId}?language=${language}`;

export const imageUrl = (subUrl, width = 500) => `${IMAGE_BASE_URL}/w${width}${subUrl}`;
