import axios from 'axios';

// --- Configuration ---
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

if (!API_KEY) {
  console.error("TMDB API Key not found. Please set REACT_APP_TMDB_API_KEY in your environment variables.");
}

// --- Axios Instance Setup ---
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// --- Helper Function ---
const fetchData = async (url, params = {}) => {
  if (!API_KEY) {
    return Promise.reject(new Error("API Key is missing. Cannot proceed with the request."));
  }
  try {
    const response = await tmdbApi.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(`[API Service] Error fetching data from ${url}:`, error);
    // Standardize error handling for UI components
    const errorMessage = error.response?.data?.status_message || 'Failed to connect to the server.';
    throw new Error(errorMessage);
  }
};

// --- API Endpoints ---

/**
 * Fetches trending content.
 * @param {('all'|'movie'|'tv')} type - Type of media (all, movie, tv).
 * @param {('day'|'week')} timeWindow - Time frame (day or week).
 */
export const fetchTrending = (type = 'all', timeWindow = 'week', page = 1) => {
  return fetchData(`/trending/${type}/${timeWindow}`, { page });
};

/**
 * Fetches popular content (movies or TV).
 * @param {('movie'|'tv')} mediaType
 */
export const fetchPopular = (mediaType = 'movie', page = 1) => {
  return fetchData(`/${mediaType}/popular`, { page });
};

/**
 * Fetches content details, including related data (videos, cast, similar).
 * @param {('movie'|'tv')} mediaType
 * @param {number} id - The content ID.
 */
export const fetchContentDetails = (mediaType, id) => {
  // append_to_response is crucial for loading all required data in one call
  return fetchData(`/${mediaType}/${id}`, { append_to_response: 'videos,credits,similar,recommendations' });
};

/**
 * Fetches a specific list of content based on the path (e.g., 'now_playing', 'upcoming').
 * @param {('movie'|'tv')} mediaType
 * @param {string} listType - e.g., 'now_playing', 'top_rated', 'airing_today'
 */
export const fetchContentList = (mediaType, listType, page = 1) => {
    return fetchData(`/${mediaType}/${listType}`, { page });
};

/**
 * Fetches genres for movies or TV shows.
 * @param {('movie'|'tv')} mediaType
 */
export const fetchGenres = (mediaType = 'movie') => {
  return fetchData(`/genre/${mediaType}/list`);
};

/**
 * Searches across movies, TV shows, and people.
 */
export const searchContent = (query, page = 1) => {
  if (!query || query.trim() === '') {
    return Promise.resolve({ results: [] });
  }
  return fetchData('/search/multi', { query, page });
};

// --- Utility Functions ---

/**
 * Constructs the full image URL.
 * @param {string} path - The image path returned by the API.
 * @param {string} size - The desired image size (e.g., 'w500', 'original', 'w780').
 */
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}${size}${path}`;
};

// Exporting the instance for potential configuration needs elsewhere (less common but useful)
export default tmdbApi;