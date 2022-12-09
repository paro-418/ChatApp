import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { LOGIN_ROUTE } from '../utils/APIRoutes';

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, []);

  const handleValidation = () => {
    const { password, username } = values;
    if (password === '' || username === '') {
      toast.error('Email & password is required', toastOptions);
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;
    console.log('hello');
    console.log('login component');
    const { password, username } = values;
    try {
      const response = await axios.post(LOGIN_ROUTE, {
        username,
        password,
      });
      // console.log(response);
      localStorage.setItem('chat-app-user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (err) {
      console.log(err.response);
      toast.error(err.response.data.message, toastOptions);
    }
  };

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Fragment>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className='brand'>
            <h1>Snappy</h1>
          </div>
          <input
            type='text'
            placeholder='username'
            onChange={handleChange}
            name='username'
          />
          <input
            type='password'
            placeholder='password'
            onChange={handleChange}
            name='password'
          />
          <button type='submit'>Login</button>
          <span>
            Don't have an account ? <Link to='/register'>Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </Fragment>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #fff;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      padding: 1rem;
      background-color: transparent;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: #fff;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }

    span {
      color: #fff;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
