import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import InicioSesion from './pages/InicioSesion';
import RecuperarContraseña from './pages/RecuperarContrasena';
import CambiarContrasena from './pages/CambiarContrasena';
import ContrasenaCambiada from './pages/ContrasenaCambiada';
import Registro from './pages/Registro';
import CodigoVerificacion from './pages/CodigoVerificacion';
import Dashboard from "./pages/Dashboard";
import PropertyAdmin from './pages/PropertyAdmin';
import PropertyViewAdmin from './pages/PropertyViewAdmin';
import Usuarios from './pages/Usuarios';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="inicio-sesion" />} />
        <Route path='/inicio-sesion' element={<InicioSesion />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/propertyViewAdmin' element={<PropertyViewAdmin />} />
        <Route path='/propertyAdmin' element={<PropertyAdmin />} />
        <Route path='/usuariosAdmin' element={<Usuarios />} />
        <Route path='/recuperarContrasena' element={<RecuperarContraseña />} />
        <Route path='/passwordCode' element={<CodigoVerificacion />} />
        <Route path='/changePassword' element={<CambiarContrasena />} />
        <Route path='/changedPassword' element={<ContrasenaCambiada />} />
        <Route path='/registro' element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;