import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomCard } from 'components/CustomCard';
import { DataSessionContext } from 'providers/DataSessionProvider';
import { useApi } from 'hooks/useApi';
import { API_PATH } from 'api/servicespath';

export const Profile = () => {
  const navigate = useNavigate();
  const { sessionActive } = useContext(DataSessionContext);
  const [userData, setUserData] = useState(null);

  const [handleFetch] = useApi({
    path: API_PATH.USER,
    method: 'get'
  });

  const getData = async () => {
    const response = await handleFetch();
    setUserData(response);
  };

  useEffect(() => {
    if (userData === null) {
      getData();
    }
    if (!sessionActive) {
      navigate('/404');
    }
  }, [navigate, sessionActive]);

  return (
    <>
      {userData && (
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
      )}
    </>
  );
};
