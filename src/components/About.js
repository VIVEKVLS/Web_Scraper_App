import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
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

const Credit = styled.p`
  margin-top: 3rem;
  font-size: 0.9rem;
  font-style: italic;
  color: #666;
  text-align: center;
`;

const About = () => (
  <AboutContainer>
    <Title>About Web Scraper Application</Title>
    <p>
      This modern ReactJS application allows secure user authentication with Google OAuth,
      enabling users to ethically scrape data from public websites and view it on a responsive
      platform. It supports multiple data formats such as news, quotes, and weather, while respecting
      robots.txt and implementing rate limiting for ethical use.
    </p>
    <p>
      With a clean and interactive UI built using styled-components, the app ensures seamless experience
      across devices, real-time updates, and data persistence.
    </p>
    <Credit>Made with ❤️ by Vivek Shingne</Credit>
  </AboutContainer>
);

export default About;
