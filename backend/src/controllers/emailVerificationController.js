import jsonwebtoken from "jsonwebtoken";
import customersModel from "../models/Customers.js";
import { sendEmail, HTMLVerificationEmail } from "../utils/mailEmailVerification.js";
import { config } from "../config.js";

const emailVerificationController = {};

// Enviar código de verificación para registro
emailVerificationController.sendVerificationCode = async (req, res) => {
    const { email, firstName } = req.body;

    try {
        if (!email || !firstName) {
            return res.status(400).json({ 
                success: false,
                message: "El correo electrónico y nombre son requeridos" 
            });
        }

        // Verificar si el email ya está registrado
        const existingUser = await customersModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: "Este correo electrónico ya está registrado" 
            });
        }

        // Generar código de 5 dígitos
        const verificationCode = Math.floor(10000 + Math.random() * 90000).toString();

        // Crear token con información del usuario
        const token = jsonwebtoken.sign(
            { 
                email, 
                verificationCode, 
                firstName,
                type: 'email_verification',
                verified: false 
            },
            config.JWT.secret,
            { expiresIn: "5m" }
        );

        // Guardar token en cookie
        res.cookie("emailVerificationToken", token, { 
            maxAge: 5 * 60 * 1000, // 5 minutos
            httpOnly: true,
            secure: false, // Cambiar a true en producción con HTTPS
            sameSite: 'lax'
        });

        // Enviar email con el código
        await sendEmail(
            email,
            "Verificación de correo electrónico - HomeClick",
            `Tu código de verificación es: ${verificationCode}`,
            HTMLVerificationEmail(verificationCode, firstName)
        );

        console.log(`Verification code sent to: ${email}, Code: ${verificationCode}`);

        res.json({ 
            success: true,
            message: "Se ha enviado un código de verificación a tu correo electrónico" 
        });

    } catch (error) {
        console.error("Error in sendVerificationCode:", error);
        res.status(500).json({ 
            success: false,
            message: "Error interno del servidor. Intenta nuevamente más tarde." 
        });
    }
};

// Verificar código de email
emailVerificationController.verifyEmailCode = async (req, res) => {
    const { verificationCode } = req.body;

    try {
        if (!verificationCode) {
            return res.status(400).json({ 
                success: false,
                message: "El código de verificación es requerido" 
            });
        }

        // Verificar que existe el token en las cookies
        const token = req.cookies.emailVerificationToken;
        if (!token) {
            return res.status(400).json({ 
                success: false,
                message: "Sesión expirada. Solicita un nuevo código" 
            });
        }

        // Verificar y decodificar el token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        // Verificar que el código coincida
        if (decoded.verificationCode !== verificationCode) {
            return res.status(400).json({ 
                success: false,
                message: "Código de verificación inválido" 
            });
        }

        // Crear nuevo token marcado como verificado
        const newToken = jsonwebtoken.sign(
            {
                email: decoded.email,
                verificationCode: decoded.verificationCode,
                firstName: decoded.firstName,
                type: 'email_verification',
                verified: true,
            },
            config.JWT.secret,
            { expiresIn: "10m" } // Extender tiempo para completar registro
        );

        // Actualizar cookie con el nuevo token
        res.cookie("emailVerificationToken", newToken, { 
            maxAge: 10 * 60 * 1000, // 10 minutos
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });

        res.json({ 
            success: true,
            message: "Código verificado correctamente" 
        });

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ 
                success: false,
                message: "Token inválido" 
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ 
                success: false,
                message: "El código ha expirado. Solicita uno nuevo" 
            });
        }

        console.error("Error in verifyEmailCode:", error);
        res.status(500).json({ 
            success: false,
            message: "Error interno del servidor" 
        });
    }
};

// Verificar si el email está verificado antes del registro final
emailVerificationController.checkEmailVerification = async (req, res) => {
    try {
        const token = req.cookies.emailVerificationToken;
        if (!token) {
            return res.status(400).json({ 
                success: false,
                message: "No hay verificación de email activa" 
            });
        }

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if (!decoded.verified) {
            return res.status(400).json({ 
                success: false,
                message: "Email no verificado" 
            });
        }

        res.json({ 
            success: true,
            email: decoded.email,
            verified: true
        });

    } catch (error) {
        console.error("Error in checkEmailVerification:", error);
        res.status(400).json({ 
            success: false,
            message: "Verificación inválida o expirada" 
        });
    }
};

export default emailVerificationController;