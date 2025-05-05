import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, FloatingLabel, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

function LoginForm() {
  const [authError, setAuthError] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { login: '', password: '' },
    onSubmit: (values) => {
      const { login, password } = values;
      axios.post('/api/v1/login', {
        username: login,
        password: password,
      })
        .then((response) => {
          const { token: jwtToken, username: login } = response.data;
          auth.logIn(jwtToken, login);
          navigate('/');
        })
        .catch((error) => {
          setAuthError(true);
          if (error.isAxiosError && error.response.status === 401) {
            console.log('error 401!');
            inputRef.current.select();
          }
          else {
            throw error;
          }
        })
        .finally(() => {
          formik.setSubmitting(false);
        });
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <h2 className="text-center mb-4">Войти</h2>

        <FloatingLabel
          controlId="login"
          label="Ваш ник"
          className="mb-3"
        >
          <Form.Control
            ref={inputRef}
            className={authError ? 'is-invalid' : ''}
            type="text"
            name="login"
            onChange={formik.handleChange}
            value={formik.values.login}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="password"
          label="Пароль"
          className="mb-3"
        >
          <Form.Control
            className={authError ? 'is-invalid' : ''}
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />

          <div className="invalid-tooltip">
            {authError ? 'Неверные имя пользователя или пароль' : '\u00A0'}
          </div>

        </FloatingLabel>

        <Button
          variant="primary"
          type="submit"
          disabled={formik.isSubmitting}
          className="w-100"
        >
          {formik.isSubmitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Войти'}
        </Button>
      </Form>
    </>
  );
}

export default LoginForm;
