import React, { useContext } from 'react';
import './Authentication.css';
import { useState } from 'react';
import FormInput from './FormInput';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthenticationContext';
const baseURL = 'https://localhost:8000/auth/login';
const LoginForm = () => {
  const loginInputs = [
    {
      id: 1,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'It should be a valid email address!',
      label: 'Email',
      required: true,
    },
    {
      id: 2,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];
  const { user, loading, error, authLoading, authFailure, authSuccessful } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    authLoading();
    try {
      const res = await axios.post('https://localhost:8000/auth/login', values);
      console.log(res);
      authSuccessful(res.data);
      navigate('/');
    } catch (err) {
      // dispatch({ type: 'LOGIN_FAILURE', payload: err });
      authFailure(err);
    }
  };
  return (
    <div className="LoginContainer">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        {loginInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Log In</button>
        {error && (
          <div className="lErrorMessage">
            {error?.response?.data?.description}
          </div>
        )}
      </form>
      <Link to="#" className="textLink">
        Forgotten password?
      </Link>
      <hr />
      <Link to="/register" className="link-styles">
        <div className="registerButton">Create new account</div>
      </Link>
    </div>
  );
};
export default LoginForm;
