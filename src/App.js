import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode';
import Header from './components/Header';
import Login from './components/Login';
import LoadingSpinner from './components/LoadingSpinner';
import ScrapingForm from './components/ScrapingForm';
import About from './components/About';
import Contact from './components/Contact';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userInfo = {
        id: decoded.sub,
        name: decoded.name || decoded.preferred_username || 'User',
        email: decoded.email,
        picture: decoded.picture || decoded.picture_url || '/default-avatar.png',
        loginTime: new Date().toISOString()
      };
      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
    } catch (error) {
      console.error('Error decoding JWT:', error);
    }
  };

  const handleLoginError = () => {
    console.error('Login failed');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AppContainer>
      <Header user={user} onLogout={handleLogout} />
      <MainContent>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ScrapingForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Login
                  onLoginSuccess={handleLoginSuccess}
                  onLoginError={handleLoginError}
                />
              )
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainContent>
    </AppContainer>
  );
}

export default App;
