import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputText } from 'components/InputText';

import { CustomCard } from 'components/CustomCard';

export const Signup = () => {
  const handlerSubmit = () => {
    console.log('submit');
  };

  return (
    <CustomCard title="Signup" width={500}>
      <Form>
        <InputText
          placeholder="Enter your first name"
          label="First name"
          value="hola manola"
          errorMessage=""
        />
        <InputText
          placeholder="Enter your last name"
          label="Last name"
          value="hola manola"
          errorMessage=""
        />
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

        <h3>Company</h3>
        <InputText placeholder="Company name" label="Name" value="hola manola" errorMessage="" />

        <Button variant="primary" type="submit" onClick={handlerSubmit}>
          Submit
        </Button>
      </Form>
    </CustomCard>
  );
};
