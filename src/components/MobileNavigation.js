import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { CgCloseO } from 'react-icons/cg';
import Navigation from './Navigation';
import './MobileNavigation.css';

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);

  const hamburguerIcon = (
    <HiMenu
      className="Hamburguer"
      size="40px"
      color="white"
      onClick={ () => {
        setOpen(!open);
      } }
    />
  );
  const closeIcon = (
    <CgCloseO
      className="Hamburguer"
      size="40px"
      color="white"
      onClick={ () => {
        setOpen(!open);
      } }
    />
  );
  const closeMobileMenu = () => {
    setOpen(false);
  };
  return (
    <div className="MobileNavigation">
      { open ? closeIcon : hamburguerIcon }
      { open && <Navigation isMobile closeMobileMenu={ closeMobileMenu } /> }
    </div>
  );
};

export default MobileNavigation;
