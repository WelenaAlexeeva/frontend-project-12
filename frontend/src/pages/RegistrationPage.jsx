import RegistrationForm from '../components/RegistrationForm';
import { Container } from 'react-bootstrap';

function RegistrationPage() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Container className="w-100 text-center" style={{ maxWidth: '400px' }}>
        <RegistrationForm />
      </Container>
    </Container>
  );
}

export default RegistrationPage;
