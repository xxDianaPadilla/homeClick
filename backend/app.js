import express from 'express';
import propertiesRoutes from "./src/routes/properties.js";
import categoriesRoutes from "./src/routes/categories.js";
import customersRoutes from "./src/routes/customers.js";
import invoicesRoutes from "./src/routes/invoices.js";
import notificationsRoutes from "./src/routes/notifications.js"
import purchasesRoutes from "./src/routes/purchases.js";
import reviewsRoutes from "./src/routes/reviews.js";
import cookieParser from "cookie-parser";
import loginRoute from "./src/routes/login.js";
import logoutRoute from "./src/routes/logout.js";
import registerClientsRouter from "./src/routes/registerClients.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/properties", propertiesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/invoices", invoicesRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/purchases", purchasesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/registerClients", registerClientsRouter);

export default app;