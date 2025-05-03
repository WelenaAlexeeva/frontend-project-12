import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function NotFoundPage() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Container className="w-100 text-center" style={{ maxWidth: '600px' }}>
        <h1>404 - Страница не найдена</h1>
        <p>Извините, запрашиваемая страница не существует.</p>
        <Link to="/" className="home-link">
          Вернуться на главную
        </Link>
      </Container>
    </Container>
  );
}

export default NotFoundPage;
