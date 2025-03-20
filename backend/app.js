import express from 'express';
import propertiesRoutes from "./src/routes/properties.js";
import administratorsRoutes from "./src/routes/administrators.js";
import categoriesRoutes from "./src/routes/categories.js";

const app = express();

app.use(express.json());

app.use("/api/properties", propertiesRoutes);
app.use("/api/administrators", administratorsRoutes);
app.use("/api/categories", categoriesRoutes);

export default app;