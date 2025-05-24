import express from 'express';
import propertiesRoutes from "./src/routes/properties.js";
import categoriesRoutes from "./src/routes/categories.js";
import customersRoutes from "./src/routes/customers.js";
import reviewsRoutes from "./src/routes/reviews.js";
import shoppingCartRoutes from "./src/routes/shoppingCart.js";
import salesRoutes from "./src/routes/sales.js";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());

app.use("/api/properties", propertiesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/shoppingCart", shoppingCartRoutes);
app.use("/api/sales", salesRoutes);

export default app;