import express from "express";
import cors from "cors";

import connectDatabase from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDatabase();

app.use("/api/employees", employeeRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});