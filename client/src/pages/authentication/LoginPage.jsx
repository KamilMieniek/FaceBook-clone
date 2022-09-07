import './LoginPage.css';
import LoginBox from '../../features/authentication/components/LoginBox';
const LoginPage = () => {
  return (
    <div className="LoginPageContainer">
      <div className="LoginPageCopy">
        <h1 className="LogoFont">CloneBook</h1>
        <h2 className="CopyFont">
          CloneBook helps me learn MERN development.{' '}
        </h2>
      </div>
      <LoginBox></LoginBox>
    </div>
  );
};

export default LoginPage;
