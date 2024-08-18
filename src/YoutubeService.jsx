import axios from 'axios';

const API_KEY = 'AIzaSyDMJp9xmNpBnog6uVoGcmSUO8tl-Mg4rLY';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const getComments = async (videoId) => {
    const response = await axios.get(`${BASE_URL}/commentThreads`, {
      params: {
        part: 'snippet',
        videoId: videoId,
        key: API_KEY
      }
    });

    return response.data.items;
  };
