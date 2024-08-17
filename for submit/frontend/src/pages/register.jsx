
import Style from './rgister.module.css';
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { postRegister } from '../util/roughts.js';
import { useNavigate } from 'react-router-dom';
const Register = () => {




  const [input,setInput] = useState({username:'',password:'',email:'',confirmPassword:'',gender:''});


  const handleChange = (e)=>{
      setInput({...input,[e.target.name]:e.target.value});
  }

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
      e.preventDefault();
      if(handleValidation()){
          const {username,password,email,gender} = input;
          const result = await axios.post(postRegister,{
              username,password,email,gender
          });
          console.log(result);
          
          if(result.data.status===true){
              toast.success('Register Sucessfull')
              setTimeout(() => {
                navigate('/login');
              }, 1000); 
          }else{
              toast.error('Registration Failed');
          }  
      }
  }

  const handleValidation = ()=>{
      const {username,password,confirmPassword,email,gender} = input;
      console.log(username,password,confirmPassword,email,gender);
      
      if(username ===''|| password==="" || email==="" || confirmPassword==="" || gender===""){
          toast.error('all the fields are required');
          return false;
      }else if(password!==confirmPassword){
        toast.error('both the password and confirm password should be same');
        return false;
      }
      return true;
  }

  useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate('/')
    }
  },[])

return (
  <div className={Style.loginContainer}>
    <form className={Style.loginForm}>
      <h2>Register</h2>
      <div className={Style.inputGroup}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username"  onChange={(e)=>handleChange(e)} placeholder="Enter your username" required />
      </div>

      <div className={Style.inputGroup}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={(e)=>handleChange(e)}  placeholder="Enter your Email" required />
      </div>


      <div className={Style.inputGroup}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={(e)=>handleChange(e)}  placeholder="Enter your password" required />
      </div>

      <div className={Style.inputGroup}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="Text" id="confirmPassword" name="confirmPassword" onChange={(e)=>handleChange(e)}  placeholder="Conform your password" required />
      </div>

      <div className={Style.inputGroup}>
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender" onChange={(e)=>handleChange(e)}>
        <option value="">Select your gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Other'>Other</option>
        </select>
      </div>

      <button type="submit" onClick={(e)=>handleSubmit(e)} className={Style.loginButton}>Register</button>

      <div className={Style.extraOptions}>
        <Link to="/login">Already Have an Account</Link>
      </div>
    </form>
    <ToastContainer />
  </div>
);

}

export default Register;