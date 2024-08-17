import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Auth0Provider 
      domain="dev-x6xjza4nff0jd65a.us.auth0.com"
    clientId="UNgxpHtGW1ZA7qj3NchStX856SQMk9Sr"
      authorizationParams={{
        redirect_uri: window.location.origin}}
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>
);
