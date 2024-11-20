import express from "express";
import { ENV_VARS } from "./config/envVars.js";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movies.route.js";
import tvRoutes from "./routes/tv.route.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(express.json()); // parse req.body

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/tv", tvRoutes);


const PORT = ENV_VARS.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  connectDB();
});
