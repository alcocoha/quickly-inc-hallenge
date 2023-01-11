import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';

import { CustomInput } from 'components/CustomInput';
import { CustomCard } from 'components/CustomCard';
import { CustomButton } from 'components/CustomButton';
import { validationText, validationEmail } from 'utils/validations';
import { useApi } from 'hooks/useApi';
import { API_PATH } from 'api/servicespath';
import { useState } from 'react';

/**
 * Initial state to formik data
 */
const initialStateForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  companyName: ''
};

export const Signup = () => {
  /**
   * State for button loading
   */
  const [loading, setLoading] = useState(false);

  /**
   * useApi Hook initialized to be used anytime it is required
   */
  const [handleFetch] = useApi({
    path: API_PATH.SIGNUP,
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
     * It does not allow numbers in filled fields
     */
    if (values.firstName !== '' && !validationText(values.firstName)) {
      errors.firstName = 'Please enter letters only';
    }

    /**
     * It does not allow numbers in filled fields
     */
    if (values.lastName !== '' && !validationText(values.lastName)) {
      errors.lastName = 'Please enter letters only';
    }

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

    /**
     * Verify that the password and its confirmation match
     */
    if (values.password !== values.passwordConfirm) {
      errors.passwordConfirm = 'Your password confirmation must match your password';
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
     * Request is made to register a user.
     */
    const response = await handleFetch({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      company: {
        name: values.companyName
      }
    });

    // when the response is successful
    if (response.success) {
      toast.success('Success', { icon: '🎉' });
      /**
       * resets the values ​​for the inputs
       */
      resetForm();
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
   * @returns A form wrappers in formik is returned to control its values ​​and handle errors
   * Inputs used: FistName, LastName, Email, Password, Password confirm, company name
   */
  return (
    <CustomCard title="Signup" width={500}>
      <ToastContainer />
      <Formik initialValues={initialStateForm} validate={validation} onSubmit={onSubmit}>
        {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
          <Form>
            <CustomInput
              id="firstName"
              placeholder="Enter your first name"
              label="First name"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={touched.firstName && errors.firstName}
            />
            <CustomInput
              id="lastName"
              placeholder="Enter your last name"
              label="Last name"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={touched.lastName && errors.lastName}
            />
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
            <CustomInput
              id="passwordConfirm"
              type="password"
              placeholder="Enter password confirmation"
              label="Password confirmation"
              value={values.passwordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={touched.passwordConfirm && errors.passwordConfirm}
            />

            <h3>Company</h3>
            <CustomInput
              id="companyName"
              placeholder="Company name"
              label="Name"
              value={values.companyName}
              onChange={handleChange}
            />
            <CustomButton
              title="Register"
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
