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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SavedProperties/>
    </>
  )
}

export default App