import './Authentication.css';
import React, { useContext } from 'react';
import FormInput from './FormInput';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthenticationContext';
const LoginBox = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    birthday: '',
    password: '',
    confirmPassword: '',
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const registerInputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: 'Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'It should be a valid email address!',
      label: 'Email',
      required: true,
    },
    {
      id: 3,
      name: 'birthday',
      type: 'date',
      placeholder: 'Birthday',
      label: 'Birthday',
    },
    {
      id: 4,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: "Passwords don't match!",
      label: 'Confirm Password',
      pattern: values.password,
      required: true,
    },
  ];
  const navigate = useNavigate();
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await axios.post('/auth/register', values);

      if (res.data._id) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
        navigate('/');
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: { message: 'Something went wrong!' },
        });
      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
    }
  };

  return (
    <div className="LoginContainer">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {registerInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
      </form>
      <hr></hr>
      <Link to="/Login" className="textLink">
        Already have an Account?
      </Link>
    </div>
  );
};

export default LoginBox;
