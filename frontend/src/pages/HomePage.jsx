import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Главная страница</h1>
      <p>Текст на главной странице</p>
      <Link to='/login'>Войти
      </Link>
    </div>
  );
}

export default HomePage;
