import nodemailer from "nodemailer";
import { config } from "../config.js";

// Configurar transporter de nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true para 465, false para otros puertos
    auth: {
        user: config.emailUser.user_email,
        pass: config.emailUser.user_pass
    },
});

// Función para enviar emails
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"HomeClick Soporte" <${config.emailUser.user_email}>`,
            to,
            subject,
            text,
            html,
        });

        console.log("Email sent successfully:", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

// Template HTML para email de recuperación
const HTMLRecoveryEmail = (code, firstName = "Usuario") => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #ff6b35; margin: 0; font-size: 28px;">HomeClick</h1>
                <p style="color: #666; margin: 5px 0; font-size: 14px;">Tu hogar ideal a un solo click</p>
            </div>
            
            <!-- Title -->
            <h2 style="color: #333; text-align: center; margin-bottom: 20px; font-size: 24px;">
                Recuperación de Contraseña
            </h2>
            
            <!-- Greeting -->
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
                Hola <strong style="color: #333;">${firstName}</strong>,
            </p>
            
            <!-- Message -->
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px; font-size: 16px;">
                Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en HomeClick. 
                Para continuar con el proceso, utiliza el siguiente código de verificación:
            </p>
            
            <!-- Verification Code -->
            <div style="background: linear-gradient(135deg, #ff6b35, #ff8559); padding: 20px; border-radius: 10px; text-align: center; margin: 25px 0; box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);">
                <h3 style="color: white; margin: 0 0 10px 0; font-size: 18px;">Código de Verificación:</h3>
                <div style="font-size: 36px; font-weight: bold; color: white; letter-spacing: 8px; font-family: 'Courier New', monospace; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                    ${code}
                </div>
            </div>
            
            <!-- Warning -->
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="color: #856404; margin: 0; font-size: 14px; text-align: center;">
                    <strong>⚠️ Importante:</strong> Este código expira en <strong>20 minutos</strong> por motivos de seguridad.
                </p>
            </div>
            
            <!-- Instructions -->
            <div style="background-color: #e7f3ff; border: 1px solid #b3d9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h4 style="color: #0066cc; margin: 0 0 10px 0; font-size: 16px;">📋 Instrucciones:</h4>
                <ol style="color: #0066cc; margin: 0; padding-left: 20px; font-size: 14px;">
                    <li style="margin-bottom: 5px;">Ingresa este código en la página de verificación</li>
                    <li style="margin-bottom: 5px;">Crea una nueva contraseña segura</li>
                    <li>¡Listo! Ya podrás acceder con tu nueva contraseña</li>
                </ol>
            </div>
            
            <!-- Security note -->
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px; font-size: 14px;">
                Si no solicitaste este cambio, puedes ignorar este correo. Tu contraseña actual seguirá siendo válida 
                y tu cuenta permanecerá segura.
            </p>
            
            <!-- Security tips -->
            <div style="background-color: #f8f9fa; border-left: 4px solid #ff6b35; padding: 15px; margin: 20px 0;">
                <h4 style="color: #333; margin: 0 0 10px 0; font-size: 14px;">💡 Consejos de seguridad:</h4>
                <ul style="color: #666; margin: 0; padding-left: 20px; font-size: 12px;">
                    <li style="margin-bottom: 3px;">Usa una contraseña única y segura</li>
                    <li style="margin-bottom: 3px;">Incluye números, letras y símbolos</li>
                    <li style="margin-bottom: 3px;">No compartas tu contraseña con nadie</li>
                    <li>Mantén tu información de contacto actualizada</li>
                </ul>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; margin: 0;">
                    Este es un correo automático, por favor no responder directamente.
                </p>
                <p style="color: #999; font-size: 12px; margin: 5px 0;">
                    Si necesitas ayuda, contáctanos en: 
                    <a href="mailto:${config.emailUser.user_email}" style="color: #ff6b35; text-decoration: none;">
                        ${config.emailUser.user_email}
                    </a>
                </p>
                <p style="color: #999; font-size: 12px; margin: 15px 0 0 0;">
                    © 2025 HomeClick. Todos los derechos reservados.
                </p>
            </div>
        </div>
        
        <!-- External footer -->
        <div style="text-align: center; margin-top: 20px;">
            <p style="color: #999; font-size: 11px; margin: 0;">
                HomeClick - La manera más fácil de encontrar tu hogar ideal
            </p>
        </div>
    </div>
    `;
};

export { sendEmail, HTMLRecoveryEmail };