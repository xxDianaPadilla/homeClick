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
        <Route path='/' element={<Navigate to="primer-uso"/>}/>
        <Route path='/primer-uso' element={<PrimerUso/>}/>
        {/* Modificamos esta línea para que renderice el componente Usuarios */}
        <Route path='/inicio-sesion' element={<Usuarios/>}/>
        <Route path='/registro' element={<Registro/>}/>
        <Route path='/recuperarContrasena' element={<RecuperarContraseña/>}/>
        <Route path='/landingPage' element={<LandingPage/>}/>
        <Route path='/propertyCategories' element={<PropertyCategories/>}/>
        <Route path='/propertyView' element={<PropertyViewAdmin/>}/>
        <Route path='/shoppingCart' element={<ShoppingCart/>}/>
        <Route path='/savedProperties' element={<SavedProperties/>}/>
        <Route path='/aboutUs' element={<AboutUs/>}/>
        <Route path='/privacyPolicies' element={<PrivacyPolicies/>}/>
        <Route path='/termsConditions' element={<TermsConditions/>}/>
        <Route path='/passwordCode' element={<CodigoVerificacion/>}/>
        <Route path='/changePassword' element={<CambiarContrasena/>}/>
        <Route path='/changedPassword' element={<ContrasenaCambiada/>}/>
      </Routes>
    </Router>
  );
}

export default App;