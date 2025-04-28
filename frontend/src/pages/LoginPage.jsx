import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Alert } from 'react-bootstrap';

function LoginPage() {

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('required'),
    password: Yup.string()
      .min(5, 'min 5')
      .required('required'),
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {},
  });

  return (
    <div>
      <h1>Войти</h1>
      <Form onSubmit={handleSubmit}>
        {/* {error && <Alert variant="danger">{error}</Alert>} */}
        <Form.Group>
          <Form.Label htmlFor="username">Ваш ник</Form.Label>
          <Form.Control 
            id="username" 
            isInvalid={touched.username && !!errors.username}
            autoComplete="username"
            {...getFieldProps('username')} 
            type="text" 
            placeholder="" />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
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

        <Button type="submit" disabled={isSubmitting}>
          Войти
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
