import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { errorHandler, successHandler } from '../utils'

const Signup = () => {

  const [signupInfo, setSignupInfo] = useState({
    name:'',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const changeHandler = (e)=>{
    const {name, value} = e.target;
    console.log(name, value);
    const copySignupInfo = {...signupInfo};
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  }
  console.log('signup info-> ', signupInfo);

  const SignupHandler =async (e)=>{
    e.preventDefault();
    const {name, email, password} = signupInfo;
    if(!name || !email||  !password){
      return errorHandler("please provide all field")
    }

    try{
      const url = "http://localhost:8080/api/v1/auth/signup"
      const reasponce = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const data = await reasponce.json();
      console.log(data);
      const  {success, message, error} = data;
      if(success){
        successHandler(message);
        setTimeout(()=>{
          navigate('/login')
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
      <h1> Signup</h1> 
      <form onSubmit={SignupHandler }>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            onChange={changeHandler}
            type='text'
            name='name'
            autoFocus
            placeholder='Enter Your Name'
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
          onChange={changeHandler}
            type='email'
            name='email'
            placeholder='Enter Your Email'
            value={setSignupInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
          onChange={changeHandler}
            type='text'
            name='password'
            placeholder='Enter 6 digit password'
            value={signupInfo.password}
          />
        </div>
        <button>Signup</button>
          <span>Already have an account ?
          <Link to='/login'>Login</Link>
          </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Signup
