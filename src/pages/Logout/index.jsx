import { useEffect, useContext } from 'react';
import { removeSession } from 'utils/authManager';
import { useNavigate } from 'react-router-dom';
import { DataSessionContext } from 'providers/DataSessionProvider';

/**
 *
 * @returns an empty div because it's really just the link between screens
 */
const Logout = () => {
  /**
   * setSessionActive to set the session
   */
  const { setSessionActive } = useContext(DataSessionContext);

  /**
   * useNavigate is a hook to make a redirect
   */
  let navigate = useNavigate();

  useEffect(() => {
    /**
     * The session variable is deleted from localstorage
     */
    removeSession();

    /**
     * Set the session variable to its initial value
     */
    setSessionActive(false);

    /**
     * It is redirected to the login page which will already be activated again
     */
    navigate('/login');
  }, [navigate, setSessionActive]);

  return <div></div>;
};

export default Logout;
