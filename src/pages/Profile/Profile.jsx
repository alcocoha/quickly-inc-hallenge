import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomCard } from 'components/CustomCard';
import { DataSessionContext } from 'providers/DataSessionProvider';
import { useApi } from 'hooks/useApi';
import { API_PATH } from 'api/servicespath';
import './styles.scss';

export const Profile = () => {
  /**
   * useNavigate used to redirect to Error 404 page if there is no session
   */
  const navigate = useNavigate();

  /**
   * Get the session flag to check if there is an active session
   */
  const { sessionActive } = useContext(DataSessionContext);

  /**
   * State variable to check when the user data is loaded in the page and avoid an infinite loop
   */
  const [userData, setUserData] = useState(null);

  /**
   * useApi Hook initialized to be used anytime it is required
   */
  const [handleFetch] = useApi({
    path: API_PATH.USER,
    method: 'get'
  });

  useEffect(() => {
    /**
     * function to request the user's data and save it in the state variable
     */
    const getData = async () => {
      const response = await handleFetch();
      setUserData(response);
    };

    /**
     * condition to check if the user data is already stored, otherwise it will be requested
     */
    if (userData === null) {
      getData();
    }
    /**
     * redirect to the 404 page if there is no active session since the user cannot see this page without being logged in
     */
    if (!sessionActive) {
      navigate('/404');
    }
  }, [navigate, sessionActive, userData, handleFetch]);

  /**
   * @returns a card with user data
   */
  return (
    <>
      {userData ? (
        <CustomCard
          title={`Hello, ${userData.user.full_name} `}
          width={500}
          icon="https://placeimg.com/640/480/animals/grayscale">
          <div>
            <p>
              <strong>Email:</strong> {userData?.user?.email}
            </p>
            <p>
              <strong>Company:</strong> {userData?.user?.Company?.name}
            </p>
          </div>
        </CustomCard>
      ) : (
        <p className="text">Loading data...</p>
      )}
    </>
  );
};
