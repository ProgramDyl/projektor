import axios from 'axios';
import { TMDBapiKey } from '../constants/constants';

// base api url
const apiBaseUrl = 'https://api.themoviedb.org/3';
// endpoint for trending movies
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?language=en-US`;

const fallbackMoviePoster = '../assets/akira.jpg'

// gets full image url with width of 500
export const image500 = path => path ? `https://image.tmdb.org/t/p/w500/${path}` : null;

// function to make api call
const apiCall = async (endpoint) => {
    // request options
    const options = {
        method: 'GET',
        url: endpoint,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTU0YzMyOWMzOWMxOTM3Mjk0Njg2MjA3ZWM4MDc4NiIsIm5iZiI6MTczODU0NzQyMS44MjksInN1YiI6IjY3YTAyMGRkZjBmOWRiZGJhNjk1N2Y1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vWMv_EbUxeaHYg4b4zdOoL8kfAbb2xBfrbYaRr-02aQ', // using your Bearer token
            'accept': 'application/json'
        }
    };

    try {
        // send async req to api endpoint
        const response = await axios.request(options);
        console.log("API response:", response.data); // log response data
        return response.data;
    } catch (err) {
        console.log("error: " + err);
        return {};
    }
};

// fetch trending movies
export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
};

export { fallbackMoviePoster };
