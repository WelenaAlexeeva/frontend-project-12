import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Container className="w-100 text-center" style={{ maxWidth: '600px' }}>
        <h1>{t('notFound.title')}</h1>
        <p>{t('notFound.body')}</p>
        <Link to="/" className="home-link">
          {t('nav.homePage')}
        </Link>
      </Container>
    </Container>
  );
}

export default NotFoundPage;
