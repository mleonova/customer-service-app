import React from 'react';
import styled from 'styled-components';
import SignupButton from '../../components/Buttons/SignupButton';
import LoginButton from '../../components/Buttons/LoginButton';


const Container = styled.div`
    padding: 30px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  h3 {
    color: #0A2463;
  }

  span {
    color: #0BBC20;
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  border-bottom: 
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-text: center;
  height: 80vh;

  h1 {
    font-size: 2.5rem;
    font-weight: 500;
    color: #0BBC20;
    margin: 20px;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 40px;
  }
`;

const HomePage = () => {
    return (
        <Container>
            <Header>
                <h3>FEELING<span>HEARD</span></h3>
                <LoginButton>Login</LoginButton>
            </Header>
            <Body>
                <h1>Customer Service App</h1>
                <p>Place where you can record and manage interactions with customers.</p>
                <SignupButton>Sign Up</SignupButton>
            </Body>
            <Footer>
                <p>With &hearts; by Margarita Leonova</p>
            </Footer>
        </Container>
    );
};

export default HomePage;
