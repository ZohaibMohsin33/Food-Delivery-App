import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signin() {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
    
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/loginuser', credentials); // Adjust the endpoint URL as needed
      if (response.data.success) {
        alert('User login successfully!');
        localStorage.setItem("authToken",response.data.authToken);
        console.log(localStorage.getItem("authToken"));
        localStorage.setItem("userMail",credentials.email);
        navigate("/");
        
      } else {
        alert('Error during loginn.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className='container topper'>
      <div className="row h-100 d-flex justify-content-center align-items-center">
        <div className="col-6 rounded boxer p-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" onChange={handleChange} name='email' value={credentials.email} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" onChange={handleChange} name='password' value={credentials.password} />
            </div>

            <button type="submit" className="btn btn-success m-3">Submit</button>
            <button type="button" className="btn btn-danger">Already User</button>
          </form>
        </div>
      </div>
    </div>
  );
}
