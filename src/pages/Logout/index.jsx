import { useEffect, useContext } from 'react';
import { removeSession } from 'utils/authManager';
import { useNavigate } from 'react-router-dom';
import { DataSessionContext } from 'providers/DataSessionProvider';

const Logout = () => {
  const { setSessionActive } = useContext(DataSessionContext);
  let navigate = useNavigate();
  useEffect(() => {
    removeSession();
    setSessionActive(false);
    navigate('/login');
  }, []);

  return <div></div>;
};

export default Logout;
