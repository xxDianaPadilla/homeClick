import React from 'react';
import NavBarAdmin from '../components/NavBarAdmin';
import UsuariosCards from '../components/UsuariosCards'
import '../styles/Usuarios.css';

const Usuarios = () => {
  return (
    <div className='usuarios-page'>
      <NavBarAdmin/>
      <UsuariosCards/>
    </div>
  );
};

export default Usuarios;