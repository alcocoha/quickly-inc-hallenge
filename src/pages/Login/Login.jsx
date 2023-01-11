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

/**
 * Initial state to formik data
 */
const initialStateForm = {
  email: '',
  password: ''
};

export const Login = () => {
  /**
   * State for button loading
   */
  const [loading, setLoading] = useState(false);

  /**
   * SessionActive to read and set this for the provider to use throughout the application
   */
  const { sessionActive, setSessionActive } = useContext(DataSessionContext);

  /**
   * useNavigate used to redirect to my-profile once logged in
   */
  const navigate = useNavigate();

  /**
   * useApi Hook initialized to be used anytime it is required
   */
  const [handleFetch] = useApi({
    path: API_PATH.LOGIN,
    method: 'post'
  });

  /**
   * This function is used by formik to validate the inputs
   * @param values ​​is the data sent by formik
   * @return errors object
   */
  const validation = (values) => {
    const errors = {};

    /**
     * Validate that there is an email and that it has the correct format
     */
    if (!values.email) {
      errors.email = 'Please enter your email';
    } else if (!validationEmail(values.email)) {
      errors.email = 'Please enter a valid email';
    }

    /**
     * Verify that there is a password and that it is not less than 6 characters
     */
    if (values.password.length < 6) {
      errors.password = 'Please enter 6 characteres minimum';
    } else if (!values.password) {
      errors.password = 'Please enter your password';
    }

    return errors;
  };

  /**
   * This function is used by formik to submit the values
   * @param values ​​is the data sent by formik
   * @param resetForm ​formik function to reset the initialstate
   */
  const onSubmit = async (values, { resetForm }) => {
    /**
     * activate button spinner
     */
    setLoading(true);

    /**
     * Request is made to log in to the user.
     */
    const response = await handleFetch({
      email: values.email,
      password: values.password
    });

    // when the response is successful
    if (response.success) {
      /**
       * create the session in the localstorage
       */
      createSession(response);

      /**
       * set the session provider variable to true
       */
      setSessionActive(true);

      /**
       * resets the values ​​for the inputs
       */
      resetForm();

      /**
       * redirect to my-profile
       */
      navigate('/my-profile');
    } else {
      toast.error(response.message, {
        icon: '😢'
      });
    }
    /**
     * disable button spinner
     */
    setLoading(false);
  };

  /**
   * It is validated if there is an active session, if it does not exist we redirect the page to the 404 page
   */
  useEffect(() => {
    if (sessionActive) {
      navigate('/404');
    }
  }, [navigate, sessionActive]);

  /**
   * @returns A form wrappers in formik is returned to control its values ​​and handle errors
   * Inputs used: Email, Password
   */
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
