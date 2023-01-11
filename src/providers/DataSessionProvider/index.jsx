import { createContext, useState } from 'react';
import { getSessionData } from 'utils/authManager';

export const DataSessionContext = createContext();

export const DataSessionProvider = ({ children }) => {
  const sessionLocalStorage = getSessionData();

  const [sessionActive, setSessionActive] = useState(sessionLocalStorage ? true : false);

  return (
    <DataSessionContext.Provider
      value={{
        sessionActive,
        setSessionActive
      }}>
      {children}
    </DataSessionContext.Provider>
  );
};
