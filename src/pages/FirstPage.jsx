import React from 'react';
import { Link } from 'react-router-dom';

const FirstPage = () => (
  <div className="bg-gradient-to-r from-indigo-400 to-cyan-200 flex justify-center items-center h-screen">
    <Link to="/login">
      <button type="button" className="text-black border bg-blue-300 shadow-2xl p-5 text-4xl rounded">
        Click Here!
      </button>
    </Link>
  </div>
);

export default FirstPage;
