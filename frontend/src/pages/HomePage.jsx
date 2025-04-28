import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function HomePage() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    console.log(token);
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, []);

  return (
    <div>
      <h1>Главная страница</h1>
      <p>Текст на главной странице</p>
    </div>
  );
}

export default HomePage;
