import { getSessionData } from 'utils/authManager';
import axios from 'axios';

export const useApi = ({ path = '', method = 'get', body = {} }) => {
  const url = `${process.env.REACT_APP_API_PATH}${path}`;
  const headers = {
    'Content-Type': 'application/json'
  };

  const session = getSessionData('session');
  const token = session?.token;

  if (token) headers.Authorization = `Bearer ${token}`;

  const axionConfig = {
    url,
    method: method,
    timeout: 8000,
    headers
  };

  const handleFetch = async (body) => {
    if (body) axionConfig.data = JSON.stringify(body);
    try {
      const response = await axios(axionConfig);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };
  return [handleFetch];
};
