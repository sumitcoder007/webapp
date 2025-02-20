import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RefreshHandler = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      if (['/', '/login', '/signup'].includes(location.pathname)) {
        navigate('/home');
      }
    }
  }, [location.pathname, navigate, setIsAuthenticated]);

  return null;
};

export default RefreshHandler;
