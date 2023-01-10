import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputText } from 'components/InputText';

import { CustomCard } from 'components/CustomCard';

export const Login = () => {
  const handlerSubmit = () => {
    console.log('submit');
  };

  return (
    <CustomCard title="Login" width={500}>
      <Form>
        <InputText
          type="email"
          placeholder="Enter email"
          label="Email"
          value="hola manola"
          errorMessage=""
        />
        <InputText
          type="password"
          placeholder="Enter password"
          label="Password"
          value="hola manola"
          errorMessage=""
        />

        <Button variant="primary" type="submit" onClick={handlerSubmit}>
          Submit
        </Button>
      </Form>
    </CustomCard>
  );
};
