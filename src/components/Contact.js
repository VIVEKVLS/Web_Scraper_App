import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem 2rem;
  background: rgba(230, 230, 255, 0.8);
  border-radius: 15px;
  box-shadow: 8px 8px 20px rgba(102, 126, 234, 0.3),
              -8px -8px 20px rgba(255, 255, 255, 0.7);
  color: #333;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.6;
`;

const Title = styled.h2`
  color: #5a60d8;
  margin-bottom: 1rem;
`;

const Info = styled.p`
  margin: 0.5rem 0;
  font-size: 1.1rem;
`;

const ResumeLink = styled.a`
  display: inline-block;
  margin-top: 1.5rem;
  font-weight: 600;
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover, &:focus {
    color: #764ba2;
    outline: none;
  }
`;

const Contact = () => (
  <ContactContainer>
    <Title>Contact Me</Title>
    <Info><strong>Name:</strong> Vivek Shingne</Info>
    <Info><strong>Phone:</strong> +91 8779034049 </Info>
    <Info><strong>Mail:</strong> shingnevivek01@gmail.com </Info>
    <ResumeLink 
      href="https://drive.google.com/file/d/1mvmwa1AKSOcCGEHPj2xlO_Iwt2gIax8o/view?usp=drive_link" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Open my resume in a new tab"
    >
      View My Resume
    </ResumeLink>
  </ContactContainer>
);

export default Contact;
