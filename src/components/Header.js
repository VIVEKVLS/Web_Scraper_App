import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: #333;
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #555;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #667eea;
  }
`;

const Hamburger = styled.button`
  display: none;
  cursor: pointer;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  padding: 0;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Bar = styled.span`
  width: 25px;
  height: 3px;
  background-color: #667eea;
  border-radius: 2px;
  transition: 0.3s;
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  position: absolute;
  top: 64px;
  right: 2rem;
  padding: 1rem 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  border-radius: 8px;
  z-index: 999;

  a {
    margin-bottom: 1rem;
    font-weight: 600;
    color: #333;
    text-decoration: none;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      color: #667eea;
    }
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #667eea;
`;

const UserName = styled.span`
  color: #333;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoutButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
  }
`;

const Header = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <HeaderContainer role="banner">
      <HeaderContent>
        <Logo to="/" tabIndex="0" aria-label="Web Scraper Home">
          🌐 Web Scraper
        </Logo>

        <Nav role="navigation" aria-label="Primary Navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </Nav>

        <Hamburger
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <Bar />
          <Bar />
          <Bar />
        </Hamburger>

        {menuOpen && (
          <MobileMenu id="mobile-menu">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          </MobileMenu>
        )}

        {user && (
          <UserSection>
            <UserInfo>
              <UserAvatar src={user.picture} alt={user.name} />
              <UserName>Welcome, {user.name}</UserName>
            </UserInfo>
            <LogoutButton onClick={onLogout}>Logout</LogoutButton>
          </UserSection>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
