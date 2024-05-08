import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate("/")
    }
  });

  const handleLogin = async () => {
    console.log("email,password", email, password)
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        'content-type': 'application/json'
      }
    });
    // result = await result.json();
    // console.log(result)
    // if (result.name) {
    //   localStorage.setItem('user', JSON.stringify(result));     //without jwt token 
    //   navigate('/')
    // }
    // else {
    //   alert('Please enter correct details')
    // }

    result = await result.json();
    console.log(result)
    if (result.auth) {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', JSON.stringify(result.auth));
      navigate('/')
    }
    else {
      alert('Please enter correct details')
    }

  }

  return (
    <div className='login'>
      <h1>Login</h1>
      <input type='text' className='input-box' placeholder='Enter Email'
        onChange={(e) => setEmail(e.target.value)} value={email} />
      <input type='password' className='input-box' placeholder='Enter Password'
        onChange={(e) => setPassword(e.target.value)} value={password} />
      <button onClick={handleLogin} className='appButton' type='button'>Login</button>
    </div>
  )
}

export default Login