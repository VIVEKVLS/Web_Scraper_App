import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`;

const LoadingText = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
  animation: ${pulse} 2s ease-in-out infinite;
  text-align: center;
`;

const LoadingSubtext = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const LoadingSpinner = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Loading Web Scraper</LoadingText>
      <LoadingSubtext>Please wait while we prepare your dashboard...</LoadingSubtext>
    </LoadingContainer>
  );
};

export default LoadingSpinner; 