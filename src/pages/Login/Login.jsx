import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';

import { CustomInput } from 'components/CustomInput';
import { CustomCard } from 'components/CustomCard';
import { CustomButton } from 'components/CustomButton';
import { validationEmail } from 'utils/validations';
import { useApi } from 'hooks/useApi';
import { API_PATH } from 'api/servicespath';
import { createSession } from 'utils/authManager';
import { DataSessionContext } from 'providers/DataSessionProvider';

const initialStateForm = {
  email: '',
  password: ''
};

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const { sessionActive, setSessionActive } = useContext(DataSessionContext);
  const navigate = useNavigate();
  const [handleFetch] = useApi({
    path: API_PATH.LOGIN,
    method: 'post'
  });

  const validation = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Please enter your email';
    } else if (!validationEmail(values.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (values.password.length < 6) {
      errors.password = 'Please enter 6 characteres minimum';
    } else if (!values.password) {
      errors.password = 'Please enter your password';
    }

    return errors;
  };

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const response = await handleFetch({
      email: values.email,
      password: values.password
    });

    if (response.success) {
      createSession(response);
      navigate('/my-profile');
      setSessionActive(true);
      resetForm();
    } else {
      toast.error(response.message, {
        icon: '😢'
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (sessionActive) {
      navigate('/404');
    }
  }, []);

  return (
    <CustomCard title="Login" width={500}>
      <ToastContainer />
      <Formik initialValues={initialStateForm} validate={validation} onSubmit={onSubmit}>
        {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
          <Form>
            <CustomInput
              id="email"
              type="email"
              placeholder="Enter email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={touched.email && errors.email}
            />
            <CustomInput
              id="password"
              type="password"
              placeholder="Enter password"
              label="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={touched.password && errors.password}
            />

            <CustomButton
              title="Login"
              onClick={handleSubmit}
              disabled={loading}
              loading={loading}
            />
          </Form>
        )}
      </Formik>
    </CustomCard>
  );
};
