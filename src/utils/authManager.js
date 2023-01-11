export const createSession = (data) => {
  localStorage.setItem('session', JSON.stringify(data));
};

export const getSessionData = () => {
  const session = localStorage.getItem('session');
  return JSON.parse(session);
};

export const removeSession = () => {
  localStorage.removeItem('session');
};

export const clearCache = () => {
  localStorage.clear();
};
