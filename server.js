require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON data

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const taskRoutes = require("./routes/tasks");

app.use("/api/tasks", taskRoutes);
ii
