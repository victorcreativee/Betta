const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');


// Load env variables
dotenv.config();

// Connect to DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (we'll add later)
app.use("/api/transactions", require("./routes/transactionRoutes"));

app.get("/", (req, res) => res.send("🎉 Betta backend running"));

app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
