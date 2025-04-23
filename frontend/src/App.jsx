
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path ='/' element={ <HomePage/> } />
                <Route path ='/login' element={ <LoginPage/> } />
                <Route path ='*' element={ <NotFoundPage/> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;