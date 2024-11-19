import express from "express";
import { ENV_VARS } from "./config/envVars.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
app.use("/api/auth", authRoutes);

const PORT = ENV_VARS.PORT;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
