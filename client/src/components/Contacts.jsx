import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <Fragment>
      {currentUserName && (
        <Container>
          <div className='brand'>
            <h1>Snappy</h1>
          </div>
          <div className='contacts'>
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? 'selected' : ''
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className='avatar'>
                    <img src={contact.avatarImage} alt='user avatar' />
                  </div>
                  <div className='username'>
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='current-user'>
            <div className='avatar'>
              <img src={currentUser.avatarImage} alt='user avatar' />
            </div>
            <div className='username'>
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </Fragment>
  );
}

export default Contacts;

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  background-color: #080420;
  overflow: hidden;
  color: #fff;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: #fff;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    overflow: auto;
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      display: flex;
      background-color: #ffffff39;
      width: 90%;
      cursor: pointer;
      border-radius: 0.5rem;
      padding: 0.4rem;
      gap: 1rem;
      min-height: 5rem;
      align-items: center;
      transition: 0.5s ease-in-out;
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
    .selected {
      background-color: #9e86f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }

    .username {
      h2 {
        color: #fff;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
