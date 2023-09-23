import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../redux/user/authentication';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const success = useSelector((state) => state.auth.success);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    if (password !== confirmedPassword) {
      toast.error("Passwords don't match");
      return;
    }

    const reqBody = {
      email,
      password,
    };
    await dispatch(signup(reqBody));
  };

  useEffect(() => {
    if (success) {
      navigate('/login');
    }
  }, [success, navigate]);

  return (
    <section className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-400 to-cyan-200">
      <form onSubmit={handelSubmit} className="flex flex-col gap-y-4 lg:w-1/4 md:w-1/3 sm:w-3/4">
        <h2 className="text-center text-blue-700">Create Your Account Here!</h2>
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
        <div>
          <input
            type="password"
            placeholder="Confirm your password"
            className="border rounded-md p-2 outline-none w-full"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="border rounded-md bg-blue-700 text-white p-2">
          Signup
        </button>

        <div className="flex justify-center">
          <p className="mr-1">Already have an account?</p>
          <button type="button" onClick={() => navigate('/login')} className="font-bold">Login</button>
        </div>
      </form>
    </section>
  );
};

export default Signup;
