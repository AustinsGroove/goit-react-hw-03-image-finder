import axios from 'axios';

const BASEURL = 'https://pixabay.com/api/';
const REGKEY = '40203420-04db41a8a9312c45ba95b8564';

async function getImages(query, page) {
  try {
    const { data } = await axios.get(BASEURL, {
      params: {
        q: query,
        page,
        image_type: 'photo',
        per_page: 12,
        key: REGKEY,
        orientation: 'horizontal',
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default getImages;
