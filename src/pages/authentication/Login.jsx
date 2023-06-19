import "./login.scss" 
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase'
import { AuthContext } from '../../Context/AuthContext';
import Navbar from "../../components/navbar/Navbar";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate()

  const {dispatch}= useContext( AuthContext)
  const handleLogin = (e) => {
    e.preventDefault();
     if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user })
        
        alert("Logged In Successfully")
        console.log(user);
        navigate("/")
      })
      .catch((error) => {
        alert("incorrect email or password")
        setError(true)
      });
  };

  return (
    <div className="login">
      <Navbar/>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <span>Wrong email or password!</span>}
      </form>
    </div>

  );
};
export default Login;
