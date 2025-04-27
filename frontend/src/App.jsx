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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AboutUs/>
    </>
  )
}

export default App