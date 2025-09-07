import React from 'react';
import styled from 'styled-components';
import { GoogleLogin } from '@react-oauth/google';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
  animation: fadeInUp 0.6s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LoginTitle = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const LoginSubtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const FeaturesList = styled.ul`
  text-align: left;
  margin: 2rem 0;
  padding-left: 1.5rem;
`;

const FeatureItem = styled.li`
  color: #555;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const GoogleLoginContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

const Login = ({ onLoginSuccess, onLoginError }) => {
  return (
    <LoginContainer>
      <LoginCard>
        <LoginTitle>🌐 Web Scraper</LoginTitle>
        <LoginSubtitle>
          Welcome to the Web Scraper Application. 
          Sign in to access powerful web scraping tools and data visualization.
        </LoginSubtitle>
        
        <FeaturesList>
          <FeatureItem>✅ Secure OAuth 2.0 Authentication</FeatureItem>
          <FeatureItem>✅ Real-time Web Data Scraping</FeatureItem>
          <FeatureItem>✅ Beautiful Data Visualization</FeatureItem>
          <FeatureItem>✅ Responsive Design</FeatureItem>
          <FeatureItem>✅ Ethical Scraping Practices</FeatureItem>
        </FeaturesList>

        <GoogleLoginContainer>
          <GoogleLogin
            onSuccess={onLoginSuccess}
            onError={onLoginError}
            theme="filled_blue"
            size="large"
            text="signin_with"
            shape="rectangular"
            width="300"
          />
        </GoogleLoginContainer>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login; 