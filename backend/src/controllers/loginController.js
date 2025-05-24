import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import customersModel from "../models/Customers.js";
import { config } from "../config.js";

// Array de funciones
const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userFound; // Guardar el usuario encontrado
    let userType; // Guardar el tipo de usuario

    // Admin, Empleados y Clientes
    if (email === config.admin.email && password === config.admin.password) {
      userType = "admin";
      userFound = { _id: "admin" };
    } else {
      //cliente
      userFound = await customersModel.findOne({ email });
      userType = "Customer";

    }

    // Si no encuentra el usuario en ningun lado
    if (!userFound) {
      return res.json({ message: "user not found" });
    }

    // Desincriptar la contraseña si no es admin
    if (userType !== "admin") {
      const isMatch = bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        res.json({ message: "Invalid password" });
      }
    }

    //TOKEN
    jsonwebtoken.sign(
      //1- ¿que voy a guardar?
      { id: userFound._id, userType },
      //2- secreto
      config.JWT.secret,
      //3- ¿cuando expira?
      { expiresIn: config.JWT.expires },
      //4- función flecha
      (error, token) => {
        if (error) console.log("error" + error);
        res.cookie("authToken", token);
        res.json({ message: "login successful" });
      }
    );
  } catch (error) {
    console.log("error" + error);
  }
};

export default loginController;
