import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { errorHandler, successHandler } from '../utils'

const Login = () => {

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const changeHandler = (e)=>{
    const {name, value} = e.target;
    console.log(name, value);
    const copySignupInfo = {...loginInfo};
    copySignupInfo[name] = value;
    setLoginInfo(copySignupInfo);
  }
  console.log('signup info-> ', loginInfo);

  const loginHandler =async (e)=>{
    e.preventDefault();
    const {email, password} = loginInfo;
    if(!email||  !password){
      return errorHandler("please provide all field")
    }

    try{
      const url = "http://localhost:8080/api/v1/auth/login"
      const reasponce = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const data = await reasponce.json();
      console.log(data);
      const  {success, message, jwtToken, name, error} = data;
      if(success){
        successHandler(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(()=>{
          navigate('/home')
        },1000)
      }else if(error){
        const details = error?.details[0].message;
        errorHandler(details);
      }else if(!success){
        errorHandler(message);
      }
    }catch(err){
      return errorHandler(err);
    }
  }

  return (
    <div className='container'>
      <h1> Login</h1> 
      <form onSubmit={loginHandler}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
          onChange={changeHandler}
            type='email'
            name='email'
            placeholder='Enter Your Email'
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
          onChange={changeHandler}
            type='text'
            name='password'
            placeholder='Enter password'
            value={loginInfo.password}
          />
        </div>
        <button>Login</button>
          <span>wan't have an account ?
          <Link to='/signup'>Signup</Link>
          </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login
