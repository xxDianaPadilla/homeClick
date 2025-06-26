import React, { useState } from 'react';
import { UserPlus, Calendar, Shield, User, Phone, Mail, MapPin, CreditCard } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import EnhancedInput from '../components/EnhancedInput';
import useRegistroForm from '../components/Customers/Hooks/useRegistroForm';
import EmailVerificationModal from '../components/EmailVerificationModal.jsx';
import '../styles/RegistroEnhanced.css';

function Registro() {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    message,
    validatePassword,
    watchedPassword,
    watchedEmail, // Nuevo: email que se está observando
    setValue,
    trigger,
    validationRules,
    handleEmailChange, // Nuevo: función para manejar cambios en email
    isCheckingEmail,  // Nuevo: estado de verificación de email
    // Estados para modal de verificación
    showVerificationModal,
    setShowVerificationModal,
    handleVerificationSuccess,
    pendingRegistrationData
  } = useRegistroForm();

  const passwordValidation = validatePassword(watchedPassword);

  const handleTermsChange = async (e) => {
    setValue("termsAccepted", e.target.checked);
    await trigger("termsAccepted");
  };

  const handleModalOpen = (e) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  const handleModalAccept = () => {
    setValue("termsAccepted", true);
    trigger("termsAccepted");
    setShowTermsModal(false);
  };

  const handleModalClose = () => {
    setShowTermsModal(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  // Nuevo: Función para manejar el enfoque del campo email
  const handleEmailFocus = () => {
    handleEmailChange();
  };

  return (
    <>
      <AuthLayout
        title="Crear Cuenta"
        subtitle="Únete a HomeClick y encuentra tu hogar ideal"
        containerClass="large"
      >
        <div className="registro-enhanced">
          {/* Mensaje de estado */}
          {message && (
            <div className={`auth-${message.includes('exitoso') ? 'success' : 'error'}-message`}>
              <span>{message}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* GRID PRINCIPAL 3 COLUMNAS */}
            <div className="registro-grid">
              {/* Fila 1 */}
              <EnhancedInput
                type="text"
                placeholder="Nombres"
                register={register}
                name="firstName"
                validationRules={validationRules.firstName}
                error={errors.firstName?.message}
                disabled={isLoading}
              />

              <EnhancedInput
                type="text"
                placeholder="Apellidos"
                register={register}
                name="lastName"
                validationRules={validationRules.lastName}
                error={errors.lastName?.message}
                disabled={isLoading}
              />

              <EnhancedInput
                type="text"
                placeholder="Teléfono"
                register={register}
                name="phone"
                validationRules={validationRules.phone}
                error={errors.phone?.message}
                disabled={isLoading}
              />

              {/* Fila 2 */}
              <EnhancedInput
                type="email"
                placeholder="Correo electrónico"
                register={register}
                name="email"
                validationRules={validationRules.email}
                error={errors.email?.message}
                disabled={isLoading || isCheckingEmail} // Nuevo: deshabilitar mientras verifica
                onFocus={handleEmailFocus} // Nuevo: limpiar validaciones al enfocar
              />

              <EnhancedInput
                type="text"
                placeholder="Dirección"
                register={register}
                name="address"
                validationRules={validationRules.address}
                error={errors.address?.message}
                disabled={isLoading}
              />

              <div className="password-container">
                <EnhancedInput
                  type="password"
                  placeholder="Contraseña"
                  register={register}
                  name="password"
                  validationRules={validationRules.password}
                  error={errors.password?.message}
                  disabled={isLoading}
                  showPasswordToggle={true}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                />
                
                {/* Requisitos de contraseña flotante - solo se muestran cuando está enfocado */}
                {isPasswordFocused && watchedPassword && (
                  <div className="password-requirements-popup" style={{ 
                    top: '100%', 
                    left: '0',
                    right: 'auto',
                    marginTop: '8px',
                    minWidth: '260px'
                  }}>
                    <div className="requirements-header">
                      🔐 Requisitos de seguridad
                    </div>
                    
                    <div className={`requirement-item ${passwordValidation.minLength ? 'requirement-valid' : 'requirement-invalid'}`}>
                      <div className="requirement-icon">
                        {passwordValidation.minLength ? '✓' : '✗'}
                      </div>
                      <span className="requirement-text">8 caracteres mínimos</span>
                    </div>
                    
                    <div className={`requirement-item ${passwordValidation.hasUppercase ? 'requirement-valid' : 'requirement-invalid'}`}>
                      <div className="requirement-icon">
                        {passwordValidation.hasUppercase ? '✓' : '✗'}
                      </div>
                      <span className="requirement-text">Una letra mayúscula</span>
                    </div>
                    
                    <div className={`requirement-item ${passwordValidation.hasNumber ? 'requirement-valid' : 'requirement-invalid'}`}>
                      <div className="requirement-icon">
                        {passwordValidation.hasNumber ? '✓' : '✗'}
                      </div>
                      <span className="requirement-text">Un número</span>
                    </div>
                    
                    <div className={`requirement-item ${passwordValidation.hasSpecialChar ? 'requirement-valid' : 'requirement-invalid'}`}>
                      <div className="requirement-icon">
                        {passwordValidation.hasSpecialChar ? '✓' : '✗'}
                      </div>
                      <span className="requirement-text">Un carácter especial</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Fila 3 */}
              <EnhancedInput
                type="text"
                placeholder="DUI"
                register={register}
                name="dui"
                validationRules={validationRules.dui}
                error={errors.dui?.message}
                disabled={isLoading}
              />

              <div className="birth-date-container">
                <div className="birth-date-grid">
                  <select
                    className={`birth-select ${errors.birthDay ? 'field-error' : ''}`}
                    {...register("birthDay", validationRules.birthDay)}
                    disabled={isLoading}
                  >
                    <option value="">Día</option>
                    {[...Array(31)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>

                  <select
                    className={`birth-select ${errors.birthMonth ? 'field-error' : ''}`}
                    {...register("birthMonth", validationRules.birthMonth)}
                    disabled={isLoading}
                  >
                    <option value="">Mes</option>
                    {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'].map((month, i) => (
                      <option key={i} value={i + 1}>
                        {month}
                      </option>
                    ))}
                  </select>

                  <select
                    className={`birth-select ${errors.birthYear ? 'field-error' : ''}`}
                    {...register("birthYear", validationRules.birthYear)}
                    disabled={isLoading}
                  >
                    <option value="">Año</option>
                    {[...Array(80)].map((_, i) => {
                      const year = new Date().getFullYear() - 18 - i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
                
                {(errors.birthDay || errors.birthMonth || errors.birthYear) && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    marginTop: '4px',
                    color: '#fca5a5',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    ⚠️ {errors.birthDay?.message || errors.birthMonth?.message || errors.birthYear?.message}
                  </div>
                )}
              </div>

              {/* Espacio vacío para mantener la estructura del grid */}
              <div></div>
            </div>

            {/* TÉRMINOS Y CONDICIONES CREATIVOS */}
            <div className="terms-section">
              <div className="terms-checkbox-container" onClick={(e) => {
                if (e.target.type !== 'checkbox') {
                  const checkbox = e.currentTarget.querySelector('input[type="checkbox"]');
                  checkbox.click();
                }
              }}>
                <input
                  type="checkbox"
                  className="terms-checkbox"
                  {...register("termsAccepted", validationRules.termsAccepted)}
                  onChange={handleTermsChange}
                  disabled={isLoading}
                />
                <div className="terms-text">
                  Acepto los{' '}
                  <a 
                    href="#" 
                    className="terms-link"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModalOpen(e);
                    }}
                  >
                    términos y condiciones
                  </a>
                  {' '}de HomeClick y autorizo el procesamiento de mis datos personales.
                </div>
              </div>
              
              {errors.termsAccepted && (
                <div style={{
                  marginTop: '12px',
                  color: '#fca5a5',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  ⚠️ {errors.termsAccepted.message}
                </div>
              )}
            </div>

            {/* BOTÓN DE REGISTRO CREATIVO */}
            <button
              type="submit"
              className="register-button"
              disabled={isLoading || isCheckingEmail} // Nuevo: deshabilitar mientras verifica email
            >
              <div className="button-content">
                {isLoading ? (
                  <>
                    <div className="loading-spinner-enhanced"></div>
                    Creando tu cuenta...
                  </>
                ) : isCheckingEmail ? ( // Nuevo: mostrar estado de verificación de email
                  <>
                    <div className="loading-spinner-enhanced"></div>
                    Verificando email...
                  </>
                ) : (
                  <>
                    <UserPlus size={22} />
                    Registrarte
                  </>
                )}
              </div>
            </button>

            {/* NAVEGACIÓN MEJORADA */}
            <div className="auth-navigation-enhanced">
              ¿Ya tienes una cuenta creada?{' '}
              <a href="/inicio-sesion" className="nav-link">
                Inicia sesión
              </a>
            </div>
          </form>
        </div>
      </AuthLayout>

      {/* Modal de verificación de email */}
      <EmailVerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        email={watchedEmail}
        firstName={pendingRegistrationData?.firstName || ''}
        onVerificationSuccess={handleVerificationSuccess}
      />

      {/* Modal de términos y condiciones - Mejorado */}
      {showTermsModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '1rem',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2.5rem',
            maxWidth: '650px',
            width: '100%',
            maxHeight: '85vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
           <div style={{
             display: 'flex',
             justifyContent: 'space-between',
             alignItems: 'center',
             marginBottom: '2rem',
             paddingBottom: '1rem',
             borderBottom: '2px solid #f1f5f9'
           }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
               <div style={{
                 width: '40px',
                 height: '40px',
                 background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                 borderRadius: '12px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 fontSize: '18px'
               }}>
                 📋
               </div>
               <h2 style={{ 
                 margin: 0, 
                 fontSize: '1.6rem', 
                 color: '#1e293b',
                 fontFamily: 'Poppins, sans-serif',
                 fontWeight: '600'
               }}>
                 Términos y Condiciones
               </h2>
             </div>
             <button
               onClick={handleModalClose}
               style={{
                 background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                 border: 'none',
                 borderRadius: '10px',
                 width: '40px',
                 height: '40px',
                 cursor: 'pointer',
                 color: '#64748b',
                 fontSize: '18px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 transition: 'all 0.2s ease'
               }}
               onMouseEnter={(e) => {
                 e.target.style.background = 'linear-gradient(135deg, #e2e8f0, #cbd5e1)';
                 e.target.style.color = '#475569';
               }}
               onMouseLeave={(e) => {
                 e.target.style.background = 'linear-gradient(135deg, #f1f5f9, #e2e8f0)';
                 e.target.style.color = '#64748b';
               }}
             >
               ×
             </button>
           </div>

           <div style={{
             flex: 1,
             overflow: 'auto',
             color: '#334155',
             lineHeight: '1.7',
             fontSize: '0.95rem',
             fontFamily: 'Poppins, sans-serif'
           }}>
             <div style={{ 
               background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
               padding: '1rem',
               borderRadius: '12px',
               marginBottom: '1.5rem',
               border: '1px solid #93c5fd'
             }}>
               <p style={{ 
                 fontWeight: '600', 
                 marginBottom: '0.5rem',
                 color: '#1e40af'
               }}>
                 📅 Fecha de entrada en vigor: Febrero 25, 2025
               </p>
               <p style={{ margin: 0, fontSize: '0.9rem' }}>
                 Bienvenido a HomeClick. Al registrarte y utilizar nuestra plataforma, aceptas estos Términos y Condiciones.
               </p>
             </div>

             <div style={{ marginBottom: '1.5rem' }}>
               <h3 style={{ 
                 fontSize: '1.2rem', 
                 marginBottom: '0.75rem',
                 color: '#0f172a',
                 fontWeight: '600',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '8px'
               }}>
                 🏠 Uso de la Plataforma
               </h3>
               <ul style={{ 
                 paddingLeft: '1.5rem', 
                 marginBottom: 0,
                 listStyle: 'none'
               }}>
                 <li style={{ marginBottom: '0.5rem', position: 'relative' }}>
                   <span style={{ position: 'absolute', left: '-1.2rem', color: '#10b981' }}>✓</span>
                   La plataforma está diseñada exclusivamente para la compra de inmuebles
                 </li>
                 <li style={{ marginBottom: '0.5rem', position: 'relative' }}>
                   <span style={{ position: 'absolute', left: '-1.2rem', color: '#ef4444' }}>✗</span>
                   Queda prohibido el uso fraudulento de HomeClick
                 </li>
                 <li style={{ marginBottom: '0.5rem', position: 'relative' }}>
                   <span style={{ position: 'absolute', left: '-1.2rem', color: '#f59e0b' }}>⚠️</span>
                   Nos reservamos el derecho de suspender cuentas que incumplan estas normas
                 </li>
               </ul>
             </div>

             <div style={{ marginBottom: '1.5rem' }}>
               <h3 style={{ 
                 fontSize: '1.2rem', 
                 marginBottom: '0.75rem',
                 color: '#0f172a',
                 fontWeight: '600',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '8px'
               }}>
                 🔐 Registro y Seguridad
               </h3>
               <ul style={{ 
                 paddingLeft: '1.5rem', 
                 marginBottom: 0,
                 listStyle: 'none'
               }}>
                 <li style={{ marginBottom: '0.5rem', position: 'relative' }}>
                   <span style={{ position: 'absolute', left: '-1.2rem', color: '#10b981' }}>✓</span>
                   Los usuarios son responsables de mantener la confidencialidad de sus credenciales
                 </li>
                 <li style={{ marginBottom: '0.5rem', position: 'relative' }}>
                   <span style={{ position: 'absolute', left: '-1.2rem', color: '#f59e0b' }}>⚠️</span>
                   HomeClick no será responsable de accesos no autorizados por negligencia del usuario
                 </li>
               </ul>
             </div>

             <div style={{
               background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
               padding: '1rem',
               borderRadius: '12px',
               border: '1px solid #86efac'
             }}>
               <h3 style={{ 
                 fontSize: '1.1rem', 
                 marginBottom: '0.5rem',
                 color: '#15803d',
                 fontWeight: '600',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '8px'
               }}>
                 📧 Contacto
               </h3>
               <p style={{ margin: 0, fontSize: '0.9rem' }}>
                 Para dudas sobre estos términos, contáctanos en: 
                 <strong style={{ color: '#15803d' }}> homeclick@gmail.com</strong>
               </p>
             </div>
           </div>

           <div style={{
             paddingTop: '1.5rem',
             borderTop: '2px solid #f1f5f9',
             display: 'flex',
             gap: '1rem',
             justifyContent: 'flex-end'
           }}>
             <button
               onClick={handleModalClose}
               style={{
                 padding: '0.875rem 1.75rem',
                 background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                 color: 'white',
                 border: 'none',
                 borderRadius: '12px',
                 cursor: 'pointer',
                 fontFamily: 'Poppins, sans-serif',
                 fontWeight: '500',
                 fontSize: '0.9rem',
                 transition: 'all 0.2s ease'
               }}
               onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
               onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
             >
               Cancelar
             </button>
             <button
               onClick={handleModalAccept}
               style={{
                 padding: '0.875rem 1.75rem',
                 background: 'linear-gradient(135deg, #10b981, #059669)',
                 color: 'white',
                 border: 'none',
                 borderRadius: '12px',
                 cursor: 'pointer',
                 fontFamily: 'Poppins, sans-serif',
                 fontWeight: '500',
                 fontSize: '0.9rem',
                 transition: 'all 0.2s ease',
                 boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
               }}
               onMouseEnter={(e) => {
                 e.target.style.transform = 'translateY(-1px)';
                 e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
               }}
               onMouseLeave={(e) => {
                 e.target.style.transform = 'translateY(0)';
                 e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
               }}
             >
               ✓ Aceptar términos
             </button>
           </div>
         </div>
       </div>
     )}
   </>
 );
}

export default Registro;