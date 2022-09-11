import './LoginPage.css';
import RegisterForm from '../../features/authentication/components/RegisterForm';
import LoginForm from '../../features/authentication/components/LoginForm';
const LoginPage = ({ path }) => {
  return (
    <div className="LoginPageContainer">
      <div className="LoginPageCopy">
        <h1 className="LogoFont">CloneBook</h1>
        <h2 className="CopyFont">
          CloneBook helps me learn MERN development.{' '}
        </h2>
      </div>
      {path === 'register' ? <RegisterForm /> : <LoginForm />}
    </div>
  );
};

export default LoginPage;
