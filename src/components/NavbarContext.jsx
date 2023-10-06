import React, {
  createContext, useContext, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';

const NavbarContext = createContext();

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768px for mobile)
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    // Function to update isMobile state based on the media query
    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };

    // Attach event listener for media query changes
    mediaQuery.addListener(handleMediaQueryChange);

    // Initial check
    handleMediaQueryChange(mediaQuery);

    // Clean up the listener when the component unmounts
    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const [toggle, setToggle] = useState(false); // Initialize as false for desktop

  const toggleNavbar = () => {
    setToggle(!toggle); // Toggle the state
  };

  return (
    <NavbarContext.Provider value={{ isMobile, toggle, toggleNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

NavbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
