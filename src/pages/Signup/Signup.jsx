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

const initialStateForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  companyName: ''
};

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [handleFetch] = useApi({
    path: API_PATH.SIGNUP,
    method: 'post'
  });

  const validation = (values) => {
    const errors = {};

    if (values.firstName !== '' && !validationText(values.firstName)) {
      errors.firstName = 'Please enter letters only';
    }

    if (values.lastName !== '' && !validationText(values.lastName)) {
      errors.lastName = 'Please enter letters only';
    }

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

    if (values.password !== values.passwordConfirm) {
      errors.passwordConfirm = 'Your password confirmation must match your password';
    }

    return errors;
  };

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const response = await handleFetch({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      company: {
        name: values.companyName
      }
    });

    if (response.success) {
      toast.success('Success', { icon: '🎉' });
      resetForm();
    } else {
      toast.error(response.message, {
        icon: '😢'
      });
    }
    setLoading(false);
  };

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
