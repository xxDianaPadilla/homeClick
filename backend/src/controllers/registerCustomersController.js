import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import customersModel from "../models/Customers.js";
import {config} from "../config.js";

const registerCustomersController = {};

registerCustomersController.register = async (req, res) =>{
    const {firstName, lastName, birthDate, dui, password, email, phone, address, budget} = req.body;

    try {
        // Verificar que el email esté verificado antes de proceder
        const token = req.cookies.emailVerificationToken;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Email no verificado. Completa la verificación primero."
            });
        }

        let decoded;
        try {
            decoded = jsonwebtoken.verify(token, config.JWT.secret);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Verificación de email expirada o inválida."
            });
        }

        // Verificar que el email coincida y esté verificado
        if (decoded.email !== email || !decoded.verified) {
            return res.status(400).json({
                success: false,
                message: "Email no verificado correctamente."
            });
        }

        // Verificar si el cliente ya existe
        const existsCustomer = await customersModel.findOne({email});
        if(existsCustomer){
            return res.status(400).json({
                success: false,
                message: "El usuario ya existe"
            });
        }

        // Hashear la contraseña
        const passwordHash = await bcryptjs.hash(password, 10);

        // Crear nuevo cliente con email ya verificado
        const newCustomer = new customersModel({
            firstName, 
            lastName, 
            birthDate, 
            dui, 
            password: passwordHash, 
            email, 
            phone, 
            address, 
            budget, 
            isVerified: true // Email ya verificado
        });

        await newCustomer.save();

        // Limpiar cookie de verificación
        res.clearCookie("emailVerificationToken");

        res.json({
            success: true,
            message: "Registro completado exitosamente"
        });

    } catch (error) {
        console.log("Error en registro: ", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
    }
};

registerCustomersController.verifyCodeEmail = async (req, res) =>{
    const {verificationCodeRequest} = req.body;

    const token = req.cookies.verificationToken;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const {email, verificationCode: storedCode} = decoded;

    if(verificationCodeRequest !== storedCode){
        res.json({message: "Invalid code."});
    }

    const client = await clientsModel.findOne({email});
    client.isVerified = true;
    await client.save();

    res.clearCookie("verificationToken");

    res.json({message: "Email verified successfully"});
};

export default registerCustomersController;