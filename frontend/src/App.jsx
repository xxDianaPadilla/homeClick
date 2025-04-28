import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router";
import LandingPage from './pages/LandingPage'
import PrimerUso from './pages/PrimerUso';
import PropertyCategories from './pages/PropertyCategories';
import InicioSesion from './pages/InicioSesion'
import RecuperarContraseña from './pages/RecuperarContrasena';
import EnvioCorreo from './pages/EnvioCorreo';
import PropertyView from './pages/PropertyView';
import SavedProperties from './pages/SavedProperties';
import ShoppingCart from './pages/shoppingCart';
import AboutUs from './pages/AboutUs';
import PrivacyPolicies from './pages/PrivacyPolicies';
import TermsConditions from './pages/TermsConditions';
import CambiarContrasena from './pages/CambiarContrasena'
import ContrasenaCambiada from './pages/ContrasenaCambiada';
import Registro from './pages/Registro';
import TermYcon from './pages/TermYcon';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TermsConditions/>
    </>
  )
}

export default App