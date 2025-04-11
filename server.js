const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'https://student-tracker-app-beryl.vercel.app', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.use("/api/jobs", require("./routes/jobRoutes"));

app.get('/', (req, res) => {
  res.send('Welcome to the Student Job Tracker Backend!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
