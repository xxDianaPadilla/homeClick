import React from 'react'; // Importa React y el hook useState para gestionar el estado local.
import "../styles/Registro.css"; // Importa los estilos CSS específicos para la página de registro.
import bgImgHouse from "../assets/imgLoginFondo.png"; // Importa la imagen de fondo para la página.
import usePasswordToggle from '../components/Customers/Hooks/usePasswordToggle';
import useTermsModal from '../components/Customers/Hooks/useTermsModal';
import useRegistroForm from '../components/Customers/Hooks/useRegistroForm';

// Define el componente funcional Registro, que permite a los usuarios crear una nueva cuenta.
function Registro() {
  // Estado para controlar la visibilidad de la contraseña (mostrar u ocultar).
  const { showPassword, togglePasswordVisibility } = usePasswordToggle();
  const { showModal, handleModalOpen, handleModalClose } = useTermsModal();

  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    message,
    resetForm,
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

  const handleModalAccept = () => {
    setValue("termsAccepted", true);
    trigger("termsAccepted");
    handleModalClose();
  };

  // Renderiza la estructura de la página de registro.
  return (
    <div className="register-container">
      <img
        src={bgImgHouse}
        alt="Row of Victorian houses with warm sunlight"
        className="background-image"
      />

      <div className="register-overlay">
        <h1 className="form-title3">Registro</h1>

        {/* Mensaje de estado */}
        {message && (
          <div className={`message ${message.includes('exitoso') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form className="registro-form" onSubmit={handleSubmit}>
          {/* Campo de entrada para el nombre */}
          <div className="input-group">
            <input
              type="text"
              placeholder="Nombres"
              className={`text-input ${errors.firstName ? 'error' : ''}`}
              {...register("firstName", validationRules.firstName)}
            />
            {errors.firstName && <span className="error-text">{errors.firstName.message}</span>}
          </div>

          {/* Campo de entrada para los apellidos */}
          <div className="input-group">
            <input
              type="text"
              placeholder="Apellidos"
              className={`text-input ${errors.lastName ? 'error' : ''}`}
              {...register("lastName", validationRules.lastName)}
            />
            {errors.lastName && <span className="error-text">{errors.lastName.message}</span>}
          </div>

          {/* Campo de entrada para el teléfono */}
          <div className="input-group">
            <input
              type="text"
              placeholder="Teléfono"
              className={`text-input ${errors.phone ? 'error' : ''}`}
              {...register("phone", validationRules.phone)}
            />
            {errors.phone && <span className="error-text">{errors.phone.message}</span>}
          </div>

          {/* Campo de entrada para la dirección */}
          <div className="input-group">
            <input
              type="text"
              placeholder="Dirección"
              className={`text-input ${errors.address ? 'error' : ''}`}
              {...register("address", validationRules.address)}
            />
            {errors.address && <span className="error-text">{errors.address.message}</span>}
          </div>

          {/* Campo de entrada para la contraseña */}
          <div className="input-group">
            <div className="input-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className={`text-input ${errors.password ? 'error' : ''}`}
                {...register("password", validationRules.password)}
              />
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                <svg className="eye-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {showPassword ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M1 1l22 22" strokeLinecap="round" strokeLinejoin="round"></path>
                    </>
                  ) : (
                    <>
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"></path>
                    </>
                  )}
                </svg>
              </span>
            </div>
            {errors.password && <span className="error-text">{errors.password.message}</span>}

            {/* Lista de requisitos para la contraseña */}
            <div className="password-requirements">
              <ul>
                <li className={passwordValidation?.minLength ? 'valid' : 'invalid'}>
                  8 caracteres mínimo
                </li>
                <li className={passwordValidation?.hasUppercase ? 'valid' : 'invalid'}>
                  Una mayúscula
                </li>
                <li className={passwordValidation?.hasNumber ? 'valid' : 'invalid'}>
                  Un número
                </li>
                <li className={passwordValidation?.hasSpecialChar ? 'valid' : 'invalid'}>
                  Un caracter especial
                </li>
              </ul>
            </div>
          </div>

          {/* Campo de entrada para el DUI */}
          <div className="input-group">
            <input
              type="text"
              placeholder="DUI (Ej: 12345678-9)"
              className={`text-input ${errors.dui ? 'error' : ''}`}
              {...register("dui", validationRules.dui)}
            />
            {errors.dui && <span className="error-text">{errors.dui.message}</span>}
          </div>

          {/* Campo de entrada para el correo electrónico */}
          <div className="input-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              className={`text-input ${errors.email ? 'error' : ''}`}
              {...register("email", validationRules.email)}
            />
            {errors.email && <span className="error-text">{errors.email.message}</span>}
          </div>

          {/* Contenedor para la selección de la fecha de nacimiento */}
          <div className="input-group">
            <div className="fecha-container">
              <div className="fecha-nacimiento-label">Fecha de nacimiento</div>
              <div className="fecha-nacimiento-container">
                <select
                  className={`${errors.birthDay ? 'error' : ''}`}
                  {...register("birthDay", validationRules.birthDay)}
                >
                  <option value="">Día</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>

                <select
                  className={`${errors.birthMonth ? 'error' : ''}`}
                  {...register("birthMonth", validationRules.birthMonth)}
                >
                  <option value="">Mes</option>
                  {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((month, i) => (
                    <option key={i} value={i + 1}>{month}</option>
                  ))}
                </select>

                <select
                  className={`${errors.birthYear ? 'error' : ''}`}
                  {...register("birthYear", validationRules.birthYear)}
                >
                  <option value="">Año</option>
                  {[...Array(100)].map((_, i) => {
                    const year = new Date().getFullYear() - i;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
              </div>
              {(errors.birthDay || errors.birthMonth || errors.birthYear) && (
                <span className="error-text">
                  {errors.birthDay?.message || errors.birthMonth?.message || errors.birthYear?.message}
                </span>
              )}
            </div>
          </div>

          {/* Casilla de verificación para aceptar los términos y condiciones */}
          <div className="input-group">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="terms"
                {...register("termsAccepted", validationRules.termsAccepted)}
                onChange={handleTermsChange}
              />
              <label htmlFor="terms" className="terms-label" onClick={handleModalOpen}>
                Acepto los términos y condiciones
              </label>
            </div>
            {errors.termsAccepted && <span className="error-text">{errors.termsAccepted.message}</span>}
          </div>

          {/* Botón para enviar el formulario de registro */}
          <button
            className="submit-button2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Regístrate'}
          </button>

          {/* Enlace para iniciar sesión si ya se tiene una cuenta */}
          <div className="login-text">
            ¿Ya tienes una cuenta creada? <a href="/inicio-sesion">Inicia sesión</a>
          </div>
        </form>
      </div>

      {/* Modal para mostrar los términos y condiciones */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Términos y condiciones - HomeClick</h2>
            <div className="terms-content">
              <p className="terms-date">Fecha de entrada en vigor: Febrero 25, 2025</p>

              <div className="terms-welcome">
                <p>Bienvenido a HomeClick. Al acceder y utilizar nuestra plataforma, aceptas estos Términos y Condiciones. Si no estás de acuerdo con los mismos, por favor, no utilices nuestros servicios.</p>
              </div>

              <div className="terms-section">
                <h3>Definiciones</h3>
                <ul>
                  <li><strong>Plataforma:</strong> El sitio web y la aplicación móvil de HomeClick.</li>
                  <li><strong>Usuario:</strong> Cualquier persona que acceda o utilice HomeClick.</li>
                  <li><strong>Contenido:</strong> Textos, imágenes, información disponible para el usuario a través de la plataforma.</li>
                </ul>
              </div>

              <div className="terms-section">
                <h3>Uso de la Plataforma</h3>
                <ul>
                  <li>La plataforma está diseñada exclusivamente para la compra de inmuebles y servicios relacionados.</li>
                  <li>Queda prohibido el uso de HomeClick para actividades fraudulentas.</li>
                  <li>Tenemos el derecho de suspender o eliminar cuentas que incumplan estas normas.</li>
                </ul>
              </div>

              <div className="terms-section">
                <h3>Registro y Seguridad de la Cuenta</h3>
                <ul>
                  <li>Para acceder a ciertas funciones, los usuarios deben registrarse.</li>
                  <li>Los usuarios son responsables de mantener la confidencialidad de sus credenciales.</li>
                  <li>HomeClick no será responsable de accesos no autorizados derivados de negligencia del usuario.</li>
                </ul>
              </div>

              <div className="terms-section">
                <h3>Proceso de Compra</h3>
                <ul>
                  <li>La plataforma facilita el contacto con vendedores y la visualización de propiedades.</li>
                  <li>HomeClick no es responsable de la exactitud de la información proporcionada por terceros ni de la conclusión final exitosa de las compras.</li>
                </ul>
              </div>

              <div className="terms-section">
                <h3>Responsabilidades y Limitaciones</h3>
                <ul>
                  <li>HomeClick no garantiza la disponibilidad continua de la plataforma ni la ausencia de errores técnicos.</li>
                  <li>No somos responsables de cualquier pérdida derivada del uso de la plataforma.</li>
                </ul>
              </div>

              <div className="terms-section">
                <h3>Propiedad Intelectual</h3>
                <ul>
                  <li>Todo el contenido de la plataforma (diseño, logotipos, software, etc.) es propiedad de HomeClick o de sus licenciantes.</li>
                  <li>Queda prohibida cualquier reproducción o distribución del material de HomeClick.</li>
                </ul>
              </div>

              <div className="terms-section">
                <h3>Modificaciones de los Términos</h3>
                <ul>
                  <li>HomeClick puede modificar estos términos en cualquier momento. Los cambios entrarán en vigor con la publicación y su uso continuado implica su aceptación de los mismos.</li>
                </ul>
              </div>

              <div className="terms-section">
                <h3>Ley Aplicable y Jurisdicción</h3>
                <ul>
                  <li>Estos términos se rigen por las leyes aplicables en El Salvador y cualquier disputa será resuelta en los tribunales correspondientes.</li>
                </ul>
              </div>

              <div className="terms-section contact">
                <h3>Contacto</h3>
                <p>Si tienes dudas sobre estos "Términos y Condiciones", contáctanos en:</p>
                <p>homeclick@gmail.com</p>
              </div>
            </div>

            <button className="accept-button" onClick={handleModalAccept}>
              Aceptar términos y condiciones
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Registro;