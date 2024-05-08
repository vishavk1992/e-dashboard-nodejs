import React from 'react'
import { useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [name , setName] = useState("");
    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
      const auth = localStorage.getItem('user');
      if (auth) {
        navigate('/')
      }
    },[]);


    const collectData =async ()=>{
        console.log(name,email,password)
        let result = await fetch("http://localhost:5000/register", {    //to fetch data from api from mongodb
          method : "post",
          body: JSON.stringify({name,email,password}) ,
          headers : {
            'content-type' : 'application/json'}
        },[]);

        result = await result.json()
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(result));   //to store data in local storage . 
        // localStorage.setItem("user", JSON.stringify(result.auth));
        navigate('/')      
    }


  return (
    <div className='register'> 
    <h1>Register</h1>
    <input className="input-box" type='text' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} />
    <input className="input-box" type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}  />
    <input className="input-box" type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}  />
    <button className='appButton' onClick={collectData} type='button'>
        Sign Up
    </button>
    </div>
  )
}

export default SignUp