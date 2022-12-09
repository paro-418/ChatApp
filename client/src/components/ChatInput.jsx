import React, { useState } from 'react';
import styled from 'styled-components';
import { BsEmojiSmileFill } from 'react-icons/bs';
// import EmojiPicker from 'emoji-picker-react';

function ChatInput({ handleSendMsg }) {
  //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState('');
  //   const handleEmojiPickerHideShow = () => {
  // setShowEmojiPicker(!showEmojiPicker);
  //   };

  const handleSendMessage = (message) => {
    handleSendMsg(message);
  };
  const sendChat = (event) => {
    event.preventDefault();
    if (message.length === 0) return;
    handleSendMessage(message);
    setMessage('');
  };
  return (
    <Container>
      <div className='button-container'>
        <div className='emoji'>
          <BsEmojiSmileFill />
          {/* {showEmojiPicker && <EmojiPicker />} */}
        </div>
      </div>

      <form className='input-container' onSubmit={sendChat}>
        <input
          type='text'
          placeholder='type your message here'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>send</button>
      </form>
    </Container>
  );
}

export default ChatInput;

const Container = styled.div`
  /* border: 2px solid red; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  .button-container {
    /* border: 3px solid yellow; */
    display: flex;
    align-items: center;
    color: #fff;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 2rem;
        color: #ffff00c8;
        cursor: pointer;
      }
    }
  }
  .input-container {
    /* border: 2px solid green; */
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      /* border: 2px solid red; */
      padding-left: 1rem;
      color: #fff;
      font-size: 2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      font-size: 2rem;
    }
  }
`;
