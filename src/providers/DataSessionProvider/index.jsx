import { createContext, useState } from "react";
import {getSessionData} from 'utils/AuthManage'

export const DataSessionContext = createContext();

export const DataSessionProvider = ({children}) => {

    const sessionLocalStorage = getSessionData();

    const [session, setSession] = useState(sessionLocalStorage ? sessionLocalStorage : {name: null, type: null});

    return (<DataSessionContext.Provider value={{
        session,
        setSession
    }}>
        {children}
    </DataSessionContext.Provider>)
}