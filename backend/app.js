import express from 'express';
import propertiesRoutes from "./src/routes/properties.js";
import categoriesRoutes from "./src/routes/categories.js";
import customersRoutes from "./src/routes/customers.js";
import reviewsRoutes from "./src/routes/reviews.js";
import shoppingCartRoutes from "./src/routes/shoppingCart.js";
import salesRoutes from "./src/routes/sales.js";
import registerCustomersRoutes from "./src/routes/registerCustomers.js";
import loginRoutes from "./src/routes/login.js";
import logOutRoutes from './src/routes/logout.js';
import authRoutes from './src/routes/auth.js';
import recoveryPasswordRoutes from './src/routes/recoveryPassword.js'; 
import contactRoutes from './src/routes/contact.js';
import uploadRoutes from './src/routes/upload.js';
import paymentRoutes from './src/routes/payment.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ 
    limit: '50mb', 
    extended: true,
    parameterLimit: 50000
}));
app.use(cookieParser());

app.use("/api/properties", propertiesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/shoppingCart", shoppingCartRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/registerCustomers", registerCustomersRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logOutRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/recovery-password", recoveryPasswordRoutes); 
app.use("/api/contact", contactRoutes);
app.use("/api", uploadRoutes);
app.use("/api/payment", paymentRoutes);

export default app;