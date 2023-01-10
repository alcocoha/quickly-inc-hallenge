export const createSession = (name, type, program) => {
  localStorage.setItem('session', JSON.stringify({ name, type, program }));
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
