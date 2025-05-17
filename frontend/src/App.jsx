import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Importa el componente para la página de inicio
import PrimerUso from './pages/PrimerUso'; // Importa el componente para la página de primer uso
import PropertyCategories from './pages/PropertyCategories'; // Importa el componente para la página de categorías de propiedades
import InicioSesion from './pages/InicioSesion'; // Importa el componente para la página de inicio de sesión
import RecuperarContraseña from './pages/RecuperarContrasena'; // Importa el componente para la página de recuperación de contraseña
import PropertyView from './pages/PropertyView'; // Importa el componente para la página de vista de propiedad
import SavedProperties from './pages/SavedProperties'; // Importa el componente para la página de propiedades guardadas
import ShoppingCart from './pages/ShoppingCart'; // Importa el componente para la página del carrito de compras
import AboutUs from './pages/AboutUs'; // Importa el componente para la página "Acerca de nosotros"
import PrivacyPolicies from './pages/PrivacyPolicies'; // Importa el componente para la página de políticas de privacidad
import TermsConditions from './pages/TermsConditions'; // Importa el componente para la página de términos y condiciones
import CambiarContrasena from './pages/CambiarContrasena'; // Importa el componente para la página de cambiar contraseña
import ContrasenaCambiada from './pages/ContrasenaCambiada'; // Importa el componente para la página de contraseña cambiada exitosamente
import Registro from './pages/Registro'; // Importa el componente para la página de registro de usuario
import CodigoVerificacion from './pages/CodigoVerificacion'; // Importa el componente para la página de código de verificación
import NavBarAdmin from './components/NavBarAdmin';
import Dashboard from "./pages/Dashboard";
import PropertyAdmin from './pages/PropertyAdmin';
import PropertyViewAdmin from './pages/PropertyViewAdmin';

function App() {
  // Define un estado local 'count' con valor inicial 0 y la función 'setCount' para actualizarlo
  const [count, setCount] = useState(0);

  return (

    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="inicio-sesion"/>}/>
        <Route path='/inicio-sesion' element={<InicioSesion/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/propertyViewAdmin' element={<PropertyViewAdmin/>}/>
        <Route path='/propertyAdmin' element={<PropertyAdmin/>}/>
      </Routes>
    </Router>

  );
}

export default App;