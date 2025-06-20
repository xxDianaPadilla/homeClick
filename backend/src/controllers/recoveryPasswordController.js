import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import customersModel from "../models/Customers.js"; // Cambiado de clientsModel a customersModel
import { sendEmail, HTMLRecoveryEmail } from "../utils/mailRecoveryPassword.js";
import { config } from "../config.js";

const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
    const { email } = req.body;

    try {
        // Validar que el email esté presente
        if (!email) {
            return res.status(400).json({ 
                success: false,
                message: "El correo electrónico es requerido" 
            });
        }

        // Buscar usuario en el modelo de customers
        let userFound = await customersModel.findOne({ email });
        let userType = "customer";

        // También verificar si es admin (usando el email del config)
        if (!userFound && email === config.admin.email) {
            userFound = { 
                _id: "admin", 
                email: config.admin.email,
                firstName: "Administrador",
                lastName: "HomeClick"
            };
            userType = "admin";
        }

        if (!userFound) {
            // Por seguridad, no revelamos si el email existe o no
            return res.json({ 
                success: true,
                message: "Si el correo electrónico está registrado, recibirás las instrucciones para recuperar tu contraseña" 
            });
        }

        // Generar código de 5 dígitos
        const code = Math.floor(10000 + Math.random() * 90000).toString();

        // Crear token con información del usuario
        const token = jsonwebtoken.sign(
            { 
                email, 
                code, 
                userType, 
                userId: userFound._id,
                verified: false 
            },
            config.JWT.secret,
            { expiresIn: "20m" }
        );

        // Guardar token en cookie
        res.cookie("tokenRecoveryCode", token, { 
            maxAge: 20 * 60 * 1000, // 20 minutos
            httpOnly: true, // Más seguro
            secure: false, // Cambiar a true en producción con HTTPS
            sameSite: 'lax'
        });

        // Enviar email con el código
        await sendEmail(
            email,
            "Recuperación de contraseña - HomeClick",
            `Tu código de verificación es: ${code}`,
            HTMLRecoveryEmail(code, userFound.firstName || "Usuario")
        );

        console.log(`Recovery code sent to: ${email}, Code: ${code}`);

        res.json({ 
            success: true,
            message: "Se ha enviado un código de verificación a tu correo electrónico" 
        });

    } catch (error) {
        console.error("Error in requestCode:", error);
        res.status(500).json({ 
            success: false,
            message: "Error interno del servidor. Intenta nuevamente más tarde." 
        });
    }
};

recoveryPasswordController.verifyCode = async (req, res) => {
    const { code } = req.body;

    try {
        // Validar que el código esté presente
        if (!code) {
            return res.status(400).json({ 
                success: false,
                message: "El código de verificación es requerido" 
            });
        }

        // Verificar que existe el token en las cookies
        const token = req.cookies.tokenRecoveryCode;
        if (!token) {
            return res.status(400).json({ 
                success: false,
                message: "Sesión expirada. Solicita un nuevo código" 
            });
        }

        // Verificar y decodificar el token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        // Verificar que el código coincida
        if (decoded.code !== code) {
            return res.status(400).json({ 
                success: false,
                message: "Código de verificación inválido" 
            });
        }

        // Crear nuevo token marcado como verificado
        const newToken = jsonwebtoken.sign(
            {
                email: decoded.email,
                code: decoded.code,
                userType: decoded.userType,
                userId: decoded.userId,
                verified: true,
            },
            config.JWT.secret,
            { expiresIn: "20m" }
        );

        // Actualizar cookie con el nuevo token
        res.cookie("tokenRecoveryCode", newToken, { 
            maxAge: 20 * 60 * 1000,
            httpOnly: true,
            secure: false, // Cambiar a true en producción
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

        console.error("Error in verifyCode:", error);
        res.status(500).json({ 
            success: false,
            message: "Error interno del servidor" 
        });
    }
};

recoveryPasswordController.newPassword = async (req, res) => {
    const { newPassword } = req.body;

    try {
        // Validar que la nueva contraseña esté presente
        if (!newPassword) {
            return res.status(400).json({ 
                success: false,
                message: "La nueva contraseña es requerida" 
            });
        }

        // Validar longitud mínima de contraseña
        if (newPassword.length < 6) {
            return res.status(400).json({ 
                success: false,
                message: "La contraseña debe tener al menos 6 caracteres" 
            });
        }

        // Verificar token en cookies
        const token = req.cookies.tokenRecoveryCode;
        if (!token) {
            return res.status(400).json({ 
                success: false,
                message: "Sesión expirada. Reinicia el proceso de recuperación" 
            });
        }

        // Verificar y decodificar token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        // Verificar que el código haya sido verificado
        if (!decoded.verified) {
            return res.status(400).json({ 
                success: false,
                message: "Código no verificado. Verifica tu código primero" 
            });
        }

        const { email, userType } = decoded;

        // Hashear nueva contraseña
        const hashedPassword = await bcryptjs.hash(newPassword, 10);

        let updatedUser;

        if (userType === "customer") {
            // Actualizar contraseña del customer
            updatedUser = await customersModel.findOneAndUpdate(
                { email },
                { password: hashedPassword },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ 
                    success: false,
                    message: "Usuario no encontrado" 
                });
            }
        } else if (userType === "admin") {
            // Para admin, no se puede cambiar la contraseña desde aquí
            // porque está en las variables de entorno
            return res.status(400).json({ 
                success: false,
                message: "No se puede cambiar la contraseña del administrador desde este método" 
            });
        }

        // Limpiar cookie del token
        res.clearCookie("tokenRecoveryCode");

        console.log(`Password updated successfully for user: ${email}`);

        res.json({ 
            success: true,
            message: "Contraseña actualizada exitosamente" 
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
                message: "La sesión ha expirado. Reinicia el proceso" 
            });
        }

        console.error("Error in newPassword:", error);
        res.status(500).json({ 
            success: false,
            message: "Error interno del servidor" 
        });
    }
};

export default recoveryPasswordController;