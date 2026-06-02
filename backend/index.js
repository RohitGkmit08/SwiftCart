const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const userRoutes = require("./routes/user.routes");

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);

app.get("/health", (req, res) => {
    res.send("App is running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});