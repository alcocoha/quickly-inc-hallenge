import { getSessionData } from 'utils/authManager';
import axios from 'axios';

/**
 * Hook to manipulate API calls
 * @param path <string> is the endpoint of the service to be consulted
 * @param method <string> is the type of method that will be used to make the request
 * @returns An array with handleFetch (function to make a request)
 */
export const useApi = ({ path = '', method = 'get' }) => {
  const url = `${process.env.REACT_APP_API_PATH}${path}`;

  /**
   * The headers for the requests are initialized
   */
  const headers = {
    'Content-Type': 'application/json'
  };

  /**
   * Check if there is a token
   */
  const session = getSessionData('session');
  const token = session?.token;

  /**
   * If a token exists then it is added to the headers
   */
  if (token) headers.Authorization = `Bearer ${token}`;

  /**
   * These are the properties that axios requests to be able to make the requests
   */
  const axionConfig = {
    url,
    method: method,
    timeout: 8000,
    headers
  };

  /**
   * This function makes the requests and returns the data of type success, and the data of type error
   * @param body <Object> if it finds a body then it adds the data parameter to the axios object
   */
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
