import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { SETAVATAR_ROUTE } from '../utils/APIRoutes';
const Buffer = require('buffer/').Buffer;
function SetAvatar() {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = 'https://multiavatar.com';
  const navigate = useNavigate();

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const setProfilePicture = () => {
    if (selectedAvatar === undefined) {
      toast.error(`please select an error`, toastOptions);
    }
  };

  useEffect(() => {
    const data = [];
    const loadAvatars = async () => {
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString('base64'));
      }
    };
    loadAvatars();
    setAvatars(data);
    setLoading(false);
  }, []);
  return (
    <Fragment>
      <Container>
        <div className='title-container'>
          <h1>Pick an avatar</h1>
        </div>
        <div className='avatars'>
          {avatars.map((avatar, index) => {
            <div
              className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}
            >
              <img
                src={`data:image/svg+xml;base64,${avatar}`}
                alt='avatar'
                onClick={() => setSelectedAvatar(index)}
              />
            </div>;
          })}
        </div>
        <button className='submit-btn' onClick={setProfilePicture}>
          Set as profile picture
        </button>
      </Container>
      <ToastContainer />
    </Fragment>
  );
}

export default SetAvatar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: #fff;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
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
`;
