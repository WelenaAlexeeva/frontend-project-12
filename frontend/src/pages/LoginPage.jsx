import LoginForm from '../components/LoginForm';
import { Container } from 'react-bootstrap';


function LoginPage() {

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Container className="w-100" style={{ maxWidth: '400px' }}>
        <LoginForm />
      </Container>
    </Container>
  );
}

export default LoginPage;
