import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SavedPropertiesProvider } from './context/SavedPropertiesContext';
import { CartProvider } from './context/CartContext'; 
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast'; 

import InicioSesion from './pages/InicioSesion';
import RecuperarContraseña from './pages/RecuperarContrasena';
import CambiarContrasena from './pages/CambiarContrasena';
import ContrasenaCambiada from './pages/ContrasenaCambiada';
import Registro from './pages/Registro';
import CodigoVerificacion from './pages/CodigoVerificacion';
import Dashboard from "./pages/Dashboard";
import PropertyAdmin from './pages/PropertyAdmin';
import PropertyViewAdmin from './pages/PropertyViewAdmin';
import ListadoVentas from './pages/ListadoVentas';
import LandingPage from './pages/LandingPage';
import PropertyCategories from './pages/PropertyCategories';
import PropertyView from './pages/PropertyView';
import ShoppingCart from './pages/ShoppingCart';
import SavedProperties from './pages/SavedProperties';
import AboutUs from './pages/AboutUs';
import PrivacyPolicies from './pages/PrivacyPolicies';
import TermsConditions from './pages/TermsConditions';
import Categorias from './pages/Categorias';

function App() {
  return (
    <AuthProvider>
      <SavedPropertiesProvider>
        <CartProvider>
          <Router>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  style: {
                    background: '#4ade80',
                    color: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  style: {
                    background: '#ef4444',
                    color: '#fff',
                  },
                },
              }}
            />

            <Routes>
              <Route path='/' element={<Navigate to="/landingPage" replace />} />

              <Route path='/inicio-sesion' element={<InicioSesion />} />
              <Route path='/registro' element={<Registro />} />
              <Route path='/recuperarContrasena' element={<RecuperarContraseña />} />
              <Route path='/passwordCode' element={<CodigoVerificacion />} />
              <Route path='/changePassword' element={<CambiarContrasena />} />
              <Route path='/changedPassword' element={<ContrasenaCambiada />} />

              <Route
                path='/dashboard'
                element={
                  <ProtectedRoute requiredUserType="admin">
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/propertyAdmin'
                element={
                  <ProtectedRoute requiredUserType="admin">
                    <PropertyAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/propertyViewAdmin'
                element={
                  <ProtectedRoute requiredUserType="admin">
                    <PropertyViewAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/listadoVentas'
                element={
                  <ProtectedRoute requiredUserType="admin">
                    <ListadoVentas />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/categorias'
                element={
                  <ProtectedRoute requiredUserType="admin">
                    <Categorias />
                  </ProtectedRoute>
                }
              />

              <Route path='/landingPage' element={<LandingPage />} />
              <Route path='/propertyCategories' element={<PropertyCategories />} />
              <Route path='/propertyView' element={<PropertyView />} />
              <Route path='/aboutUs' element={<AboutUs />} />
              <Route path='/privacyPolicies' element={<PrivacyPolicies />} />
              <Route path='/termsConditions' element={<TermsConditions />} />

              <Route
                path='/shoppingCart'
                element={
                  <ProtectedRoute requiredUserType="Customer">
                    <ShoppingCart />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/savedProperties'
                element={
                  <ProtectedRoute requiredUserType="Customer">
                    <SavedProperties />
                  </ProtectedRoute>
                }
              />

              <Route path='*' element={<Navigate to="/inicio-sesion" replace />} />
            </Routes>
          </Router>
        </CartProvider>
      </SavedPropertiesProvider>
    </AuthProvider>
  );
}

export default App;