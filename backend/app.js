import express from 'express';
import propertiesRoutes from "./src/routes/properties.js";
import administratorsRoutes from "./src/routes/administrators.js";
import categoriesRoutes from "./src/routes/categories.js";
import customersRoutes from "./src/routes/customers.js";
import invoicesRoutes from "./src/routes/invoices.js";
import notificationsRoutes from "./src/routes/notifications.js"
import purchasesRoutes from "./src/routes/purchases.js";
import reviewsRoutes from "./src/routes/reviews.js";

const app = express();

app.use(express.json());

app.use("/api/properties", propertiesRoutes);
app.use("/api/administrators", administratorsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/invoices", invoicesRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/purchases", purchasesRoutes);
app.use("/api/reviews", reviewsRoutes);

export default app;