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
      {/* Define las diferentes rutas de la aplicación dentro de un componente Routes */}
      <Routes>
        {/* Redirige la ruta principal ('/') a la ruta '/primer-uso' */}
        <Route path='/' element={<Navigate to="primer-uso"/>}/>
        {/* Define la ruta '/primer-uso' y asocia el componente PrimerUso para renderizar cuando se acceda a esta ruta */}
        <Route path='/primer-uso' element={<PrimerUso/>}/>
        <Route path='/inicio-sesion' element={<InicioSesion/>}/> 
        {/* Define la ruta '/inicio-sesion' y asocia el componente InicioSesion */}
        <Route path='/inicio-sesion' element={<InicioSesion/>}/>
        {/* Define la ruta '/registro' y asocia el componente Registro */}
        <Route path='/registro' element={<Registro/>}/>
        {/* Define la ruta '/recuperarContrasena' y asocia el componente RecuperarContraseña */}
        <Route path='/recuperarContrasena' element={<RecuperarContraseña/>}/>
        {/* Define la ruta '/landingPage' y asocia el componente LandingPage */}
        <Route path='/landingPage' element={<LandingPage/>}/>
        {/* Define la ruta '/propertyCategories' y asocia el componente PropertyCategories */}
        <Route path='/propertyCategories' element={<PropertyCategories/>}/>
        {/* Define la ruta '/propertyView' y asocia el componente PropertyView */}
        <Route path='/propertyView' element={<PropertyView/>}/>
        {/* Define la ruta '/shoppingCart' y asocia el componente ShoppingCart */}
        <Route path='/shoppingCart' element={<ShoppingCart/>}/>
        {/* Define la ruta '/savedProperties' y asocia el componente SavedProperties */}
        <Route path='/savedProperties' element={<SavedProperties/>}/>
        {/* Define la ruta '/aboutUs' y asocia el componente AboutUs */}
        <Route path='/aboutUs' element={<AboutUs/>}/>
        {/* Define la ruta '/privacyPolicies' y asocia el componente PrivacyPolicies */}
        <Route path='/privacyPolicies' element={<PrivacyPolicies/>}/>
        {/* Define la ruta '/termsConditions' y asocia el componente TermsConditions */}
        <Route path='/termsConditions' element={<TermsConditions/>}/>
        {/* Define la ruta '/passwordCode' y asocia el componente CodigoVerificacion */}
        <Route path='/passwordCode' element={<CodigoVerificacion/>}/>
        {/* Define la ruta '/changePassword' y asocia el componente CambiarContrasena */}
        <Route path='/changePassword' element={<CambiarContrasena/>}/>
        {/* Define la ruta '/changedPassword' y asocia el componente ContrasenaCambiada */}
        <Route path='/changedPassword' element={<ContrasenaCambiada/>}/>
      </Routes>
    </Router>
  );
}

export default App;