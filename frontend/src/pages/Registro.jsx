import React, { useState } from 'react';
import { UserPlus, Check, X } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import AuthInput from '../components/AuthInput';
import PasswordRequirements from '../components/PasswordRequirements';
import useRegistroForm from '../components/Customers/Hooks/useRegistroForm';

function Registro() {
  const [showTermsModal, setShowTermsModal] = useState(false);

  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    message,
    validatePassword,
    watchedPassword,
    setValue,
    trigger,
    validationRules
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

  return (
    <>
      <AuthLayout
        title="Crear Cuenta"
        subtitle="Únete a HomeClick y encuentra tu hogar ideal"
        containerClass="large"
      >
        {/* Mensaje de estado */}
        {message && (
          <div className={`auth-${message.includes('exitoso') ? 'success' : 'error'}-message`}>
            <span>{message}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <AuthInput
              type="text"
              placeholder="Nombres"
              register={register}
              name="firstName"
              validationRules={validationRules.firstName}
              error={errors.firstName?.message}
              disabled={isLoading}
            />

            <AuthInput
              type="text"
              placeholder="Apellidos"
              register={register}
              name="lastName"
              validationRules={validationRules.lastName}
              error={errors.lastName?.message}
              disabled={isLoading}
            />

            <AuthInput
              type="text"
              placeholder="Teléfono (ej: 1234-5678)"
              register={register}
              name="phone"
              validationRules={validationRules.phone}
              error={errors.phone?.message}
              disabled={isLoading}
            />

            <AuthInput
              type="text"
              placeholder="DUI (ej: 12345678-9)"
              register={register}
              name="dui"
              validationRules={validationRules.dui}
              error={errors.dui?.message}
              disabled={isLoading}
            />

            <AuthInput
              type="email"
              placeholder="Correo electrónico"
              register={register}
              name="email"
              validationRules={validationRules.email}
              error={errors.email?.message}
              disabled={isLoading}
            />

            <div style={{ gridColumn: '1 / -1' }}>
              <AuthInput
                type="text"
                placeholder="Dirección"
                register={register}
                name="address"
                validationRules={validationRules.address}
                error={errors.address?.message}
                disabled={isLoading}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <AuthInput
                type="password"
                placeholder="Contraseña"
                register={register}
                name="password"
                validationRules={validationRules.password}
                error={errors.password?.message}
                disabled={isLoading}
                showPasswordToggle={true}
              />
              
              {watchedPassword && (
                <PasswordRequirements 
                  password={watchedPassword} 
                  className="mt-2"
                />
              )}
            </div>

            {/* Fecha de nacimiento */}
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.875rem', fontWeight: '500' }}>
                  Fecha de nacimiento
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <select
                  className={`auth-input ${errors.birthDay ? 'error' : ''}`}
                  {...register("birthDay", validationRules.birthDay)}
                  disabled={isLoading}
                  style={{ color: errors.birthDay ? '#ef4444' : 'white' }}
                >
                  <option value="">Día</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1} style={{ color: '#333' }}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <select
                  className={`auth-input ${errors.birthMonth ? 'error' : ''}`}
                  {...register("birthMonth", validationRules.birthMonth)}
                  disabled={isLoading}
                  style={{ color: errors.birthMonth ? '#ef4444' : 'white' }}
                >
                  <option value="">Mes</option>
                  {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((month, i) => (
                    <option key={i} value={i + 1} style={{ color: '#333' }}>
                      {month}
                    </option>
                  ))}
                </select>

                <select
                  className={`auth-input ${errors.birthYear ? 'error' : ''}`}
                  {...register("birthYear", validationRules.birthYear)}
                  disabled={isLoading}
                  style={{ color: errors.birthYear ? '#ef4444' : 'white' }}
                >
                  <option value="">Año</option>
                  {[...Array(100)].map((_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year} style={{ color: '#333' }}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
              {(errors.birthDay || errors.birthMonth || errors.birthYear) && (
                <div className="auth-error-message" style={{ marginTop: '0.5rem' }}>
                  <span>{errors.birthDay?.message || errors.birthMonth?.message || errors.birthYear?.message}</span>
                </div>
              )}
            </div>

            {/* Términos y condiciones */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.875rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  {...register("termsAccepted", validationRules.termsAccepted)}
                  onChange={handleTermsChange}
                  disabled={isLoading}
                  style={{ width: '16px', height: '16px' }}
                />
                <span>
                  Acepto los{' '}
                  <a 
                    href="#" 
                    onClick={handleModalOpen}
                    style={{ color: '#60a5fa', textDecoration: 'underline' }}
                  >
                    términos y condiciones
                  </a>
                </span>
              </label>
              {errors.termsAccepted && (
                <div className="auth-error-message" style={{ marginTop: '0.5rem' }}>
                  <span>{errors.termsAccepted.message}</span>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="auth-button success"
            disabled={isLoading}
            style={{ marginTop: '1rem' }}
          >
            {isLoading ? (
              <>
                <div className="auth-loading-spinner" />
                Registrando...
              </>
            ) : (
              <>
                <UserPlus size={20} />
                Crear cuenta
              </>
            )}
          </button>

          <div className="auth-navigation">
            ¿Ya tienes una cuenta?{' '}
            <a href="/inicio-sesion" className="auth-navigation-link">
              Inicia sesión aquí
            </a>
          </div>
        </form>
      </AuthLayout>

      {/* Modal de términos y condiciones */}
      {showTermsModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>
                Términos y Condiciones
              </h2>
              <button
                onClick={handleModalClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            <div style={{
              flex: 1,
              overflow: 'auto',
              color: '#333',
              lineHeight: '1.6',
              fontSize: '0.9rem'
            }}>
              <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                Fecha de entrada en vigor: Febrero 25, 2025
              </p>

              <p style={{ marginBottom: '1rem' }}>
                Bienvenido a HomeClick. Al acceder y utilizar nuestra plataforma, aceptas estos Términos y Condiciones.
              </p>

              <h3 style={{ fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                Uso de la Plataforma
              </h3>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                <li>La plataforma está diseñada exclusivamente para la compra de inmuebles</li>
                <li>Queda prohibido el uso fraudulento de HomeClick</li>
                <li>Nos reservamos el derecho de suspender cuentas que incumplan estas normas</li>
              </ul>

              <h3 style={{ fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                Registro y Seguridad
              </h3>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                <li>Los usuarios son responsables de mantener la confidencialidad de sus credenciales</li>
                <li>HomeClick no será responsable de accesos no autorizados por negligencia del usuario</li>
              </ul>

              <h3 style={{ fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                Contacto
              </h3>
              <p>
                Para dudas sobre estos términos, contáctanos en: <strong>homeclick@gmail.com</strong>
              </p>
            </div>

            <div style={{
              paddingTop: '1rem',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={handleModalClose}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleModalAccept}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Aceptar términos
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Registro;