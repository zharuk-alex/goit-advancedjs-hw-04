import axios from 'axios';

const API_KEY = '5416463-3b798b4f634faaf9188b7760a';

const searchImages = async ({ query, page, per_page = 40 }) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page,
      page,
    },
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data;
};

export { searchImages };
