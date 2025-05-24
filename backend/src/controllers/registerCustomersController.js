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
        const existsCustomer = await customersModel.findOne({email});
        if(existsCustomer){
            return res.json({message: "Customer already exists"});
        }

        const passwordHash = await bcryptjs.hash(password, 10);

        const newCustomer = new customersModel({
            firstName, lastName, birthDate, dui, password: passwordHash, email, phone, address, budget, isVerified: false
        });

        await newCustomer.save();

        const verificationCode = crypto.randomBytes(3).toString("hex");

        const tokenCode = jsonwebtoken.sign(
            {email, verificationCode},
            config.JWT.secret,
            {expiresIn: "2h"}
        )

        res.cookie("verificationToken", tokenCode, {maxAge: 2 * 60 * 60 * 1000, httpOnly: true, secure: false});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.emailUser.user_email,
                pass: config.emailUser.user_pass
            }
        });

        const mailOptions = {
            from: config.emailUser.user_email,
            to: email,
            subject: "Verificación de cuenta",
            text: "Para verificar tu cuenta utiliza este código: " + verificationCode + " expira en dos horas"
        }

        transporter.sendMail(mailOptions, (error, info) =>{
            if(error) console.log("error" + error);
            res.json({message: "Email sent" + info});
        });

        res.json({message: "Customer registered, please verify your email"});
    } catch (error) {
        console.log("error" + error);
        res.json({message: "Error" + error});
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