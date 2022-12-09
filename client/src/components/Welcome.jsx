import React from 'react';
import styled from 'styled-components';

function Welcome({ currentUser }) {
  return (
    <Container>
      <img src='/images/welcome.png' alt='welcome' />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to start messaging</h3>
    </Container>
  );
}

export default Welcome;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  color: #fff;
  img {
    height: 20rem;
  }

  span {
    color: #4e00ff;
  }
`;
