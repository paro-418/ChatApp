import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Contacts from '../components/Contacts';
import axios from 'axios';
import { ALL_USERS_ROUTE, HOST } from '../utils/APIRoutes';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const checkLocalStorage = async () => {
      const localUser = localStorage.getItem('chat-app-user');
      if (!localUser) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localUser));
        setIsLoaded(true);
      }
    };
    checkLocalStorage();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(HOST);
      socket.current.emit('add-user', currentUser._id);
    }
  }, []);
  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get(ALL_USERS_ROUTE);
      setContacts(response.data.AllUsers);
    };
    fetchContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className='container'>
        {contacts && (
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
        )}
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131313;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat;
