import React, { useEffect } from 'react';
import Style from './homePage.module.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth0();

  // Get the user's data from localStorage
  const user = localStorage.getItem('user');

  useEffect(() => {
    console.log('User in localStorage:', user);

    // Redirect to login if no user is present and isAuthenticated is false
    if (!user && !isAuthenticated) {
      toast.error('No user found. Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  }, [user, isAuthenticated, navigate]);

  const handleLogout = () => {
    console.log('Attempting to clear localStorage and navigate...');

    
    if (user) {
      localStorage.removeItem('user');
        navigate('/login');
    } else if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } });
        navigate('/login');
    }

    
  };

  return (
    <div className={Style.homeContainer}>
      {user || isAuthenticated ? (
        <>
          <h1>Welcome!</h1>
          <button
            onClick={handleLogout}
            className={Style.logoutButton}
          >
            Logout
          </button>
        </>
      ) : (
        <h2>Redirecting to login...</h2>
      )}
      <ToastContainer />
    </div>
  );
};

export default HomePage;
