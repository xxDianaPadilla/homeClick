import nodemailer from "nodemailer";
import { config } from "../config.js";

// Configurar transporter de nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.emailUser.user_email,
        pass: config.emailUser.user_pass
    },
});

// Función para enviar emails
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"HomeClick - Verificación de Email" <${config.emailUser.user_email}>`,
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

// Template HTML para email de verificación
const HTMLVerificationEmail = (verificationCode, firstName = "Usuario") => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #E9631A; margin: 0; font-size: 28px;">HomeClick</h1>
                <p style="color: #666; margin: 5px 0; font-size: 14px;">Tu hogar ideal a un solo click</p>
            </div>
            
            <!-- Title -->
            <h2 style="color: #333; text-align: center; margin-bottom: 20px; font-size: 24px;">
                ¡Bienvenido a HomeClick!
            </h2>
            
            <!-- Greeting -->
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
                Hola <strong style="color: #333;">${firstName}</strong>,
            </p>
            
            <!-- Message -->
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px; font-size: 16px;">
                Gracias por registrarte en HomeClick. Para completar tu registro y verificar tu dirección de correo electrónico, 
                utiliza el siguiente código de verificación:
            </p>
            
            <!-- Verification Code -->
            <div style="background: linear-gradient(135deg, #E9631A, #ff8559); padding: 20px; border-radius: 10px; text-align: center; margin: 25px 0; box-shadow: 0 4px 15px rgba(233, 99, 26, 0.3);">
                <h3 style="color: white; margin: 0 0 10px 0; font-size: 18px;">Código de Verificación:</h3>
                <div style="font-size: 36px; font-weight: bold; color: white; letter-spacing: 8px; font-family: 'Courier New', monospace; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                    ${verificationCode}
                </div>
            </div>
            
            <!-- Warning -->
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="color: #856404; margin: 0; font-size: 14px; text-align: center;">
                    <strong>⚠️ Importante:</strong> Este código expira en <strong>5 minutos</strong> por motivos de seguridad.
                </p>
            </div>
            
            <!-- Instructions -->
            <div style="background-color: #e7f3ff; border: 1px solid #b3d9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h4 style="color: #0066cc; margin: 0 0 10px 0; font-size: 16px;">📋 Instrucciones:</h4>
                <ol style="color: #0066cc; margin: 0; padding-left: 20px; font-size: 14px;">
                    <li style="margin-bottom: 5px;">Ingresa este código en la página de verificación</li>
                    <li style="margin-bottom: 5px;">Completa tu registro con los datos adicionales</li>
                    <li>¡Listo! Ya podrás acceder a tu cuenta de HomeClick</li>
                </ol>
            </div>
            
            <!-- Welcome message -->
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px; font-size: 14px;">
                Una vez verificado tu correo, podrás disfrutar de todas las funcionalidades de HomeClick: 
                buscar propiedades, guardar favoritos, contactar vendedores y mucho más.
            </p>
            
            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; margin: 0;">
                    Este es un correo automático, por favor no responder directamente.
                </p>
                <p style="color: #999; font-size: 12px; margin: 5px 0;">
                    Si necesitas ayuda, contáctanos en: 
                    <a href="mailto:${config.emailUser.user_email}" style="color: #E9631A; text-decoration: none;">
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

export { sendEmail, HTMLVerificationEmail };