import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PrimerUso from './pages/PrimerUso';
import PropertyCategories from './pages/PropertyCategories';
import InicioSesion from './pages/InicioSesion';
import RecuperarContraseña from './pages/RecuperarContrasena';
import PropertyView from './pages/PropertyView';
import SavedProperties from './pages/SavedProperties';
import ShoppingCart from './pages/ShoppingCart';
import AboutUs from './pages/AboutUs';
import PrivacyPolicies from './pages/PrivacyPolicies';
import TermsConditions from './pages/TermsConditions';
import CambiarContrasena from './pages/CambiarContrasena';
import ContrasenaCambiada from './pages/ContrasenaCambiada';
import Registro from './pages/Registro';
import CodigoVerificacion from './pages/CodigoVerificacion';
import NavBarAdmin from './components/NavBarAdmin';
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
      </Routes>
    </Router>
  );
}

export default App;