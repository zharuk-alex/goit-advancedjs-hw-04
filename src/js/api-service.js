import axios from 'axios';

const API_KEY = '5416463-3b798b4f634faaf9188b7760a';

const searchImages = ({ query, page, per_page = 40 }) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page,
    page,
  });

  return axios
    .get('https://pixabay.com/api/', {
      params,
    })
    .then(resp => {
      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }

      return resp.data;
    });
};

export { searchImages };
