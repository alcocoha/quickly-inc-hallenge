/**
 * Save the data in localstorage
 * @param data any type this will parse to string
 */
export const createSession = (data) => {
  localStorage.setItem('session', JSON.stringify(data));
};

/**
 * Get data from localstorage
 */
export const getSessionData = () => {
  const session = localStorage.getItem('session');
  return JSON.parse(session);
};

/**
 * Delete variable from localstorage
 */
export const removeSession = () => {
  localStorage.removeItem('session');
};

/**
 * Delete all variables in localstorage
 */
export const clearCache = () => {
  localStorage.clear();
};
