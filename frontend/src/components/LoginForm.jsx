import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, FloatingLabel, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';


function LoginForm() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const validationSchema = Yup.object({
  //   username: Yup.string()
  //     .required('required'),
  //   password: Yup.string()
  //     // .min(5, 'min 5')
  //     .required('required'),
  // });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    // validationSchema,
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
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Войти</h2>
        {/* {error && <Alert variant="danger">{error}</Alert>} */}
        <FloatingLabel
          controlId='username'
          label='Ваш ник'
          className='mb-3'
        >
          <Form.Control 
            autoFocus
            isInvalid={touched.username && !!errors.username}
            autoComplete="username"
            {...getFieldProps('username')} 
            type="text" 
            placeholder="" />
        </FloatingLabel>

        <FloatingLabel
          controlId='password'
          label='Пароль'
          className='mb-3'
        >
          <Form.Control 
            isInvalid={touched.password && !!errors.password}
            autoComplete="current-password"
            {...getFieldProps('password')} 
            type="password" 
            placeholder="" />
            
          {/* <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback> */}

          {errors && (
            <div className="invalid-tooltip">
              {errors.password}
            </div>
          )}

        </FloatingLabel>

        <Button 
          variant='primary' 
          type="submit" 
          disabled={isSubmitting}
          className="w-100"
        >
          Войти
        </Button>
      </Form>
    </>
  );
}

export default LoginForm;
