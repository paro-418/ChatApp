import React, { Fragment, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import Logout from './Logout';
import Message from './Message';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
  GET_ALL_MESSAGES_ROUTE,
  SEND_MESSAGE_ROUTE,
} from '../utils/APIRoutes.js';

function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState([]);
  const scrollRef = useRef();
  useEffect(() => {
    if (currentChat === undefined) return;
    const getMessages = async () => {
      const response = await axios.post(GET_ALL_MESSAGES_ROUTE, {
        from: currentUser._id,
        to: currentChat._id,
      });

      // console.log(response.data.data);
      setMessages(response.data.allMessages);
    };
    getMessages();
  }, [messages]);
  const handleSendMsg = async (message) => {
    try {
      await axios.post(SEND_MESSAGE_ROUTE, {
        from: currentUser._id,
        to: currentChat._id,
        message,
      });
    } catch (err) {
      console.log(err);
    }

    socket.current.emit('send-message', {
      to: currentChat._id,
      from: currentUser._id,
      message,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', (message) => {
        setArrivalMessages({ fromSelf: false, message });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessages && setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);
  return (
    <Fragment>
      {currentChat && (
        <Container>
          <div className='chat-header'>
            <div className='user-details'>
              <div className='avatar'>
                <img src='images/avatar.png' alt='user' />
              </div>
              <div className='username'>
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className='chat-messages'>
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? 'sended' : 'received'
                    }`}
                  >
                    <div className='content'>
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Message />
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </Fragment>
  );
}

export default ChatContainer;

const Container = styled.div`
  padding-top: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 3px solid blue;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    /* grid-template-rows: 15% 70% 15%; */
  }
  .chat-header {
    /* border: 3px solid green; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #fff;
        }
      }
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    flex-grow: 1;
    display: flex;
    /* max-height: 40%; */
    flex-direction: column;
    gap: 1rem;
    overflow: scroll;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }

    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
