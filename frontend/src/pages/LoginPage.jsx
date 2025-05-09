import LoginForm from '../components/Forms/LoginForm';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../routes';


function LoginPage() {
  const { t } = useTranslation();
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Container className="w-100" style={{ maxWidth: '400px' }}>
        <LoginForm />
        <div className="mt-3 text-center">
          {t('loginPage.textBellowForm')} &nbsp;
          <Link to={routes.registrationPagePath} className="home-link">
          {t('nav.registrationPage')}
          </Link>
        </div>
      </Container>
    </Container>
  );
}

export default LoginPage;
