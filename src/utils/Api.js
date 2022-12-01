import axios from 'axios';

export const baseURL = 'http://192.168.15.147:3000';

const getHeader = () => {
  return {
    // 'Authorization': `Bearer ${access_token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
};

export const example = async (payload) => {
  return await axios(baseURL, {
    method: 'POST/GET',
    headers: getHeader(),
    data: payload,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const post = async (url, body) => {
  return await axios.post(url, body, {
    headers: getHeader(),
  });
};

export const patch = async (url, body) => {
  return await axios.patch(url, body, {
    headers: getHeader(),
  });
};

export const get = async (url) => {
  return await axios.get(url, {
    headers: getHeader(),
  });
};
