
import axios from 'axios';

const API_KEY = '56203683-dd16d7902fd33711f42dee53b';
const BASE_URL = 'https://pixabay.com/api/';



export async function getImagesByQuery(query) {
  // const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
    },
  });
return response.data;
} catch (error) {
  console.error('Error', error);
  throw error;
}
  
}

