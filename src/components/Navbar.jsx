import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { useNavbar } from './NavbarContext';
import { logout } from '../redux/user/authentication';

const Navbar = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const { isMobile, toggle, toggleNavbar } = useNavbar();

  const handellogout = () => {
    dispatch(logout());
    naviagte('/login');
  };

  const navbarData = [
    {
      id: 'home',
      title: 'Home',
      href: '/',
      cname:
        'border-t font-medium w-full flex justify-center p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto',
    },
    {
      id: 'employees',
      title: 'Employees',
      href: '/employees',
      cname:
        'border-t font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
    },
    {
      id: 'departments',
      title: 'Departments',
      href: '/departments',
      cname:
        'border-t font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
    },
    {
      id: 'projects',
      title: 'Projects',
      href: '/projects',
      cname:
        'border-t font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
    },
    {
      id: 'reports',
      title: 'Reports',
      href: '/reports',
      cname:
        'border-t border-b font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
    },
  ];

  return (
    <nav className="sticky top-0 w-full bg-blue-600 items-center flex p-4 md:flex">
      <div className="flex justify-between items-center w-full flex-wrap md:flex-nowrap">
        <h1 className="text-xl text-white font-bold cursor-pointer">Logo</h1>
        {isMobile && (
          <button
            className="flex justify-end md:hidden p-1 ring-1 ring-black rounded"
            onClick={toggleNavbar}
            type="button"
          >
            <AiOutlineMenu className="text-white w-9 h-9 flex justify-center items-center hover:text-black" />
          </button>
        )}
        <ul
          className={`${
            (isMobile && toggle) || !isMobile ? 'flex' : 'hidden'
          } lg: flex flex-col justify-center items-center w-full first:mt-2 md:flex-row md:w-auto md:space-x-10`}
        >
          {navbarData.map((link) => (
            <li key={link.id} className={link.cname}>
              <Link
                className="text-white hover:text-gray-300"
                to={link.href}
                onClick={isMobile ? toggleNavbar : undefined}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        {/* Logout */}
        <button
          type="button"
          onClick={handellogout}
          className={`${
            (isMobile && toggle) || !isMobile ? 'flex' : 'hidden'
          } lg:flex text-white-800 hover:bg-gray-300 mx-auto md:mx-0 md:flex md:mt-0 items-center justify-center font-medium bg-gray-100 px-1 p-2 rounded-lg mt-4 w-24`}
        >
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
