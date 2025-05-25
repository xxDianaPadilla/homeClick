import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import customersModel from "../models/Customers.js";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userFound; 
    let userType; 

    if (email === config.admin.email && password === config.admin.password) {
      userType = "admin";
      userFound = { _id: "admin" };
    } else {
      userFound = await customersModel.findOne({ email });
      userType = "Customer";
    }

    if (!userFound) {
      return res.json({ message: "user not found" });
    }

    if (userType !== "admin") {
      const isMatch = await bcryptjs.compare(password, userFound.password); 
      if (!isMatch) {
        return res.json({ message: "Invalid password" }); 
      }
    }

    jsonwebtoken.sign(
      { id: userFound._id, userType },
      config.JWT.secret,
      { expiresIn: config.JWT.expires },
      (error, token) => {
        if (error) {
          console.log("error" + error);
          return res.status(500).json({ message: "Error generating token" });
        }
        res.cookie("authToken", token, {
          httpOnly: false, 
          secure: false, 
          sameSite: 'lax'
        });
        res.json({ message: "login successful" });
      }
    );
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default loginController;