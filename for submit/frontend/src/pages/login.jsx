// import React, { useState, useEffect } from 'react';
// import Style from './login.module.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import { postLogin } from '../util/roughts.js';
// import { useAuth0 } from "@auth0/auth0-react";

// const Login = () => {
//   const [input, setInput] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { loginWithRedirect, isAuthenticated } = useAuth0();

//   const handleChange = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (handleValidation()) {
//       setLoading(true);
//       const { email, password } = input;
//       try {
//         const result = await axios.post(postLogin, { email, password });
//         if (result.data.status === true) {
//           toast.success('Login Successful');
//           localStorage.setItem('user', JSON.stringify(result.data.user));
//           setTimeout(() => {
//             navigate('/');
//           }, 1000);
//         } else {
//           toast.error(`Login Failed! ${result.data.message}`);
//         }
//       } catch (error) {
//         toast.error('An error occurred. Please try again later.');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleValidation = () => {
//     const { email, password } = input;
//     if (email === '' || password === '') {
//       toast.error('Both fields are required');
//       return false;
//     }
//     if (!email.includes('@')) {
//       toast.error('Invalid email format');
//       return false;
//     }
//     return true;
//   };


//   const googleLogin = ()=>{
//     loginWithRedirect();
//   }
//   useEffect(() => {
//     if (localStorage.getItem('user') || isAuthenticated) {
//       navigate('/');
//     }
//   }, []);

//   return (
//     <div className={Style.loginContainer}>
//       <div className={Style.loginForm}>
//         <h2>Login</h2>
//         <div className={Style.inputGroup}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="text"
//             id="email"
//             name="email"
//             onChange={handleChange}
//             placeholder="Enter your email"
//             required
//             disabled={loading}
//           />
//         </div>
//         <div className={Style.inputGroup}>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             onChange={handleChange}
//             placeholder="Enter your password"
//             required
//             disabled={loading}
//           />
//         </div>
//         <button
//           type="submit"
//           className={Style.loginButton}
//           disabled={loading}
//           onclick={handleSubmit}
//         >
//           {loading ? 'Logging in...' : 'Login'}
        
//         </button>

//   <button onclick={googleLogin} className={Style.googleLoginButton}>
//     Login With Google
//   </button>

//         <div className={Style.extraOptions}>
//           <Link to="/forgot-password">Forgot Password?</Link>
//           <Link to="/register">Register</Link>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;



import React, { useState, useEffect } from 'react';
import Style from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { postLogin } from '../util/roughts.js';
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      setLoading(true);
      const { email, password } = input;
      try {
        const result = await axios.post(postLogin, { email, password });
        if (result.data.status === true) {
          toast.success('Login Successful');
          localStorage.setItem('user', JSON.stringify(result.data.user));
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          toast.error(`Login Failed! ${result.data.message}`);
        }
      } catch (error) {
        toast.error('An error occurred. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleValidation = () => {
    const { email, password } = input;
    if (email === '' || password === '') {
      toast.error('Both fields are required');
      return false;
    }
    if (!email.includes('@')) {
      toast.error('Invalid email format');
      return false;
    }
    return true;
  };

  const googleLogin = () => {
    loginWithRedirect();
  };

  useEffect(() => {
    if (localStorage.getItem('user') || isAuthenticated) {
      navigate('/');
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className={Style.loginContainer}>
      <form className={Style.loginForm} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className={Style.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            required
            disabled={loading}
          />
        </div>
        <div className={Style.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className={Style.loginButton}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button
          type="button"
          onClick={googleLogin}
          className={Style.googleLoginButton}
        >
          Login With Google
        </button>
        <div className={Style.extraOptions}>
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/register">Register</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
