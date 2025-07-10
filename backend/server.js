const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require("./routes/dashboardRoutes");
const goalRoutes = require("./routes/goalRoutes");
const passport = require('passport');
const session = require('express-session');

// path to the config 
require('dotenv').config();
require('./config/passport');

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



app.use("/api/dashboard", dashboardRoutes);

app.use("/api/goals", goalRoutes);

app.use(session({ secret: 'yourSecret', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
