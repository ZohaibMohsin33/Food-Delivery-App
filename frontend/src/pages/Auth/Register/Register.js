import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    location: '',
    username: ''
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/createuser', credentials); // Adjust the endpoint URL as needed
      if (response.data.success) {
        alert('User registered successfully!');
        navigate("/auth/signin");
        
      } else {
        alert('Error during registration.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className='container topper'>
      <div className="row d-flex justify-content-center align-items-center mt-3">
        <div className="col-6 boxer p-5 rounded">
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

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" onChange={handleChange} name='username' value={credentials.username} />
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input type="text" className="form-control" onChange={handleChange} name='location' value={credentials.location} />
            </div>

            <button type="submit" className="btn btn-success m-3">Submit</button>
            <button type="button" className="btn btn-danger">Already User</button>
          </form>
        </div>
      </div>
    </div>
  );
}
