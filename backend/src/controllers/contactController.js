import nodemailer from 'nodemailer';
import { config } from '../config.js';

const contactController = {};

const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.emailUser.user_email,
            pass: config.emailUser.user_pass
        }
    });
};

contactController.sendMessage = async (req, res) => {
    try {
        const {
            senderName,
            senderEmail,
            senderPhone,
            message,
            subject,
            propertyName
        } = req.body;

        if (!senderName || !senderEmail || !senderPhone || !message) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son requeridos'
            });
        }

        const transporter = createTransporter();

        const emailContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                    Nuevo Mensaje de Contacto - HomeClick
                </h2>
                
                ${propertyName ? `
                    <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 5px;">
                        <h3 style="color: #007bff; margin: 0;">Consulta sobre propiedad:</h3>
                        <p style="margin: 5px 0; font-weight: bold;">${propertyName}</p>
                    </div>
                ` : ''}
                
                <div style="background-color: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                    <h3 style="color: #333; margin-top: 0;">Información del contacto:</h3>
                    <p><strong>Nombre:</strong> ${senderName}</p>
                    <p><strong>Email:</strong> ${senderEmail}</p>
                    <p><strong>Teléfono:</strong> ${senderPhone}</p>
                    
                    <h3 style="color: #333; margin-top: 30px;">Mensaje:</h3>
                    <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
                        <p style="margin: 0; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
                    </div>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px; text-align: center;">
                    <p style="margin: 0; color: #666; font-size: 14px;">
                        Este mensaje fue enviado desde el formulario de contacto de HomeClick<br>
                        Fecha: ${new Date().toLocaleString('es-ES', {
            timeZone: 'America/El_Salvador',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}
                    </p>
                </div>
            </div>
        `;

        const mailOptions = {
            from: `"HomeClick - Formulario de Contacto" <${config.emailUser.user_email}>`,
            to: config.admin.email,
            replyTo: senderEmail,
            subject: subject || 'Nuevo mensaje de contacto - HomeClick',
            html: emailContent
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Email enviado exitosamente: ', info.messageId);

        res.status(200).json({
            success: true,
            message: 'Mensaje enviado exitosamente',
            messageId: info.messageId
        });
    } catch (error) {
        console.error('Error sending email: ', error);

        let errorMessage = 'Error interno del servidor al enviar el mensaje';

        if(error.code === 'EAUTH'){
            errorMessage = 'Error de autenticación del servidor de email';
        }else if(error.code === 'ECONNECTION'){
            errorMessage = 'Error de conexión con el servidor de email';
        }else if(error.responseCode === 550){
            errorMessage = 'Email de destino no válido';
        }

        res.status(500).json({
            success: false,
            message: errorMessage,
        });
    }
};

export default contactController;