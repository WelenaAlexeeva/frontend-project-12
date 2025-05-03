import LoginForm from '../components/LoginForm';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Container className="w-100" style={{ maxWidth: '400px' }}>
        <LoginForm />
        <div className="mt-3 text-center">
          Нет аккаунта? &nbsp;
          <Link to="/signup" className="home-link">
            Регистрация
          </Link>
        </div>
      </Container>
    </Container>
  );
}

export default LoginPage;
