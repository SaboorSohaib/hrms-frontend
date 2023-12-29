import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/user/authentication';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelSubmit = async (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    const reqBody = {
      email,
      password,
    };
    await dispatch(login(reqBody));
    navigate('/');
  };

  return (
    <section className="flex justify-center items-center h-screen bg-gradient-to-r from-cyan-200 to-indigo-400">
      <form onSubmit={handelSubmit} className="flex flex-col gap-y-4 lg:w-1/4 md:w-1/3 sm:w-3/4">
        <h2 className="text-center text-blue-700">Login Here!</h2>
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            className="border rounded-md p-2 outline-none w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter your password"
            className="border rounded-md p-2 outline-none w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="border rounded-md bg-blue-700 text-white p-2">
          Login
        </button>
        <div className="flex justify-center">
          <h3 className="mr-1">Do not have account!</h3>
          <button type="button" onClick={() => navigate('/signup')} className="font-bold">
            Sign up
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
