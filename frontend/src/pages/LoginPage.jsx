import LoginForm from '../components/LoginForm'

function LoginPage() {

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ minWidth: '400px' }}>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
