import { useRef, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner, Form, FloatingLabel, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddNewUserMutation } from '../../services/chatApi.js';
import AuthContext from '../../context/AuthContext.jsx';
import { useTranslation } from 'react-i18next';
import { registrationFormValidationSchema } from './validate';
import { toast } from 'react-toastify';
import routes from '../../routes.js';

const RegistrationForm = () => {
  const inputRef = useRef(null);
  const [addNewUser] = useAddNewUserMutation();
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { t } = useTranslation();
  const validationSchema = registrationFormValidationSchema(t);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      login: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      const { login, password } = values;
      try {
        const response = await addNewUser({ username: login, password: password });
        if (response?.error?.status === 409) {
          toast.error(t('toasts.error.commonError'));
          setIsError(true);
          return;
        };
        const { token, username } = response.data;
        auth.logIn(token, username);
        setIsError(false);
        navigate(routes.homePagePath);
      }
      catch (error) {
        setIsError(false);
        if (error.isAxiosError && error.response.status === 401) {
          console.log('error 401!');
          toast.error(t('toasts.error.authError'));
          inputRef.current.select();
        }
        else {
          toast.error(t('toasts.error.commonError'));
          throw error;
        }
      }
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <h2 className="text-center mb-4">{t('registrationForm.title')}</h2>

        <FloatingLabel
          controlId="login"
          label={t('registrationForm.login')}
          className="mb-3"
        >
          <Form.Control
            ref={inputRef}
            className={`${formik.errors.login ? 'is-invalid' : ''}`}
            type="text"
            name="login"
            id="login"
            onChange={formik.handleChange}
            value={formik.values.login}
            autoComplete="true"
          />
          <div className="invalid-tooltip">
            {formik.errors?.login}
          </div>
        </FloatingLabel>

        <FloatingLabel
          controlId="password"
          label={t('registrationForm.password')}
          className="mb-3"
        >
          <Form.Control
            ref={inputRef}
            className={`${formik.errors.password ? 'is-invalid' : ''}`}
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            autoComplete="new-password"
          />
          <div className="invalid-tooltip">
            {formik.errors?.password}
          </div>
        </FloatingLabel>

        <FloatingLabel
          controlId="confirmPassword"
          label={t('registrationForm.confirmPassword')}
          className="mb-3"
        >
          <Form.Control
            ref={inputRef}
            className={`${formik.errors.confirmPassword ? 'is-invalid' : ''}`}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            autoComplete="new-password"
          />
          <div className="invalid-tooltip">
            {formik.errors?.confirmPassword}
          </div>
        </FloatingLabel>

        <p className="text-danger">{isError ? t('registrationForm.errors.exists') : ''}</p>

        <Button
          variant="primary"
          type="submit"
          disabled={formik.isSubmitting}
          className="w-100"
        >
          {formik.isSubmitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : t('registrationForm.submitButton')}
        </Button>

      </Form>
    </>
  );
};

export default RegistrationForm;
