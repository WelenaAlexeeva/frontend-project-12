import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div>
            <h1>404 - Страница не найдена</h1>
            <p>Извините, запрашиваемая страница не существует.</p>
            <div>
                <Link to="/" className="home-link">
                    Вернуться на главную
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage;