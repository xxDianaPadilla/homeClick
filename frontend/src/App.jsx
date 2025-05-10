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

function App() {
  // Define un estado local 'count' con valor inicial 0 y la función 'setCount' para actualizarlo
  const [count, setCount] = useState(0);

  return (

    <>
      <PropertyAdmin/>
    </>
    // Configura el enrutamiento de la aplicación utilizando BrowserRouter
    //<Router>
    /*{/* Define las diferentes rutas de la aplicación dentro de un componente Routes}
          /*<Routes>
      <Route path='/' element={<Navigate to="primer-uso"/>}/>
      <Route path='/primer-uso' element={<PrimerUso/>}/>
      <Route path='/inicio-sesion' element={<Navigate to="/dashboard"/>}/> {/* Ruta modificada */
    /*<Route path='/registro' element={<Registro/>}/>
    <Route path='/recuperarContrasena' element={<RecuperarContraseña/>}/>
    <Route path='/navBarAdmin' element={<NavBarAdmin/>}/> {/* Nueva ruta para el componente admin */
    /*<Route path='/dashboard' element={<Dashboard/>}/> {/* Ruta para el dashboard */
    /*<Route path='/propertyCategories' element={<PropertyCategories/>}/>
    <Route path='/propertyView' element={<PropertyView/>}/>
    <Route path='/shoppingCart' element={<ShoppingCart/>}/>
    <Route path='/savedProperties' element={<SavedProperties/>}/>
    <Route path='/aboutUs' element={<AboutUs/>}/>
    <Route path='/privacyPolicies' element={<PrivacyPolicies/>}/>
    <Route path='/termsConditions' element={<TermsConditions/>}/>
    <Route path='/passwordCode' element={<CodigoVerificacion/>}/>
    <Route path='/changePassword' element={<CambiarContrasena/>}/>
    <Route path='/changedPassword' element={<ContrasenaCambiada/>}/>
  </Routes>
</Router>*/
  );
}

export default App;