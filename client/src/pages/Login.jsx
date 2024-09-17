
import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/authContext'

const Login = () => {

    //creating state to store the form inputs
const [inputs,setInputs]=useState({
  username:"",
  password:""
})

//error state
const [err,setError]=useState(null)
//navigate hook
const navigate=useNavigate();

const {login}=useContext(AuthContext);

//throw the input values in the state
const handleChange = (e) => {
  setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};


//submit the form
const handleSubmit= async (e)=>{
e.preventDefault();
try{
   await login(inputs);

  navigate("/"); //everything is correct then we will navigate to homepage

}catch(err){
  
 setError(err.response.data)
}

}







  return (
    <div className='auth'>
      <h1>Login</h1>
      
      <form>
        <input required type="text" placeholder='username'  name='username' onChange={handleChange}/>
        <input  required type="password" placeholder='password'  name='password' onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
       {err  && <p>{err}</p>}
        <span>Don't you have an account ?</span>  
        <Link to="/register">Register</Link>
        
      </form>
    
    </div>
  )
}

export default Login
