import axios from 'axios';

const API_KEY = '56286362-285fb1525f2ba0fd2f4df197e';
const BASE_URL = 'https://pixabay.com/api/';

export const getImagesByQuery = async (query, page) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    }
  });
  
  return response.data;
};