import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputText } from 'components/InputText';

import { CustomCard } from 'components/CustomCard';

export const Profile = () => {
  const handlerSubmit = () => {
    console.log('submit');
  };

  return (
    <CustomCard title="My Profile" width={500} icon="https://via.placeholder.com/200">
      test
    </CustomCard>
  );
};
