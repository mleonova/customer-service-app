/*
  HomePage Component
 
  This component represents the landing page of the Customer Service App.
  It includes a header with the app name and a login button, a body section
  with information about the app and signup button, and a footer with credits.
 
  Styled Components:
  - TextContainer: Container for the main text content.
  - Header: Container for the header section with app name and login button.
  - Footer: Container for the footer section with credits.
  - Body: Container for the main body content.
 */

import React from 'react';
import styled from 'styled-components';
import SignupButton from '../../components/Buttons/SignupButton';
import LoginButton from '../../components/Buttons/LoginButton';


const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 20px;

  h1 {
    font-size: 2.5rem;
    font-weight: 500;
    color: #0BBC20;
  }

  p {
    align-text: center;
    font-size: 1.2rem;
    margin: 30px 20px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  border-bottom: 0.75px solid rgba(112, 112, 112, 0.5);

  h3 {
    color: #0A2463;
  }

  span {
    color: #0BBC20;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 0.75px solid rgba(112, 112, 112, 0.5);
  padding: 40px 20px;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  margin: auto;
`;

const HomePage = () => {
  return (
    <div>
      <Header>
        <h3>FEELING<span>HEARD</span></h3>
        <LoginButton>Log in</LoginButton>
      </Header>
      <Body>
        <TextContainer>
          <h1>Customer Service App</h1>
          <p>Place where you can record and manage interactions with customers.</p>
          <SignupButton>Sign Up</SignupButton>
        </TextContainer>
      </Body>
      <Footer>
        <p>With &hearts; by Margarita Leonova</p>
      </Footer>
    </div>
  );
};

export default HomePage;
