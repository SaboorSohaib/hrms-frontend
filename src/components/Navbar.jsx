import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/user/authentication';

const Navbar = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const handellogout = () => {
    dispatch(logout());
    naviagte('/login');
  };
  return (
    <section>
      <nav>
        <NavLink to="/" exact="true" activeclassname="active" className="mr-2">Home</NavLink>
        <NavLink to="/employees" exact="true" activeclassname="active" className="mr-2">Employees</NavLink>
        <NavLink to="/departments" exact="true" activeclassname="active" className="mr-2">Departments</NavLink>
        <NavLink to="/projects" exact="true" activeclassname="active" className="mr-2">Projects</NavLink>
        <NavLink to="/reports" exact="true" activeclassname="active" className="mr-2">Reports</NavLink>
        <button type="button" onClick={handellogout}>Log Out</button>
      </nav>
    </section>
  );
};

export default Navbar;
