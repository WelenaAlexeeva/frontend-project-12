import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Alert, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';


function LoginPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('required'),
    password: Yup.string()
      // .min(5, 'min 5')
      .required('required'),
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post('/api/v1/login', values);

        localStorage.setItem('jwtToken', response.data.token);

        dispatch(setCredentials({
          user: response.data.user,
          token: response.data.token,
        }))

        navigate('/');        
      } catch (error) {
        if (error.response?.status === 401) {
          setErrors({ 
            username: ' ',
            password: 'Invalid username or password',
          });
        } else {
          setErrors({ 
            username: ' ',
            password: 'Network error. Please try again.',
          });
        }  
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {/* {error && <Alert variant="danger">{error}</Alert>} */}
          <Form.Group>
            <Form.Label className="form-label" htmlFor="username">Ваш ник</Form.Label>
            <Form.Control 
              autoFocus
              id="username" 
              isInvalid={touched.username && !!errors.username}
              autoComplete="username"
              {...getFieldProps('username')} 
              type="text" 
              placeholder="" />
            {/* <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback> */}
          </Form.Group> 

          <Form.Group>
            <Form.Label htmlFor="password">Пароль</Form.Label>
            <Form.Control 
              id="password" 
              isInvalid={touched.password && !!errors.password}
              autoComplete="current-password"
              {...getFieldProps('password')} 
              type="password" 
              placeholder="" />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

            <Button 
              variant='primary' 
              type="submit" 
              disabled={isSubmitting}>
              {isSubmitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Войти'}
            </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
