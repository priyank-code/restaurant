import express from 'express'
import dotenv from 'dotenv'
import User from "./routes/User.js"
import Restaurant from './routes/Restaurant.js'
import connectDB from './config/db.js'
import morgan from 'morgan'
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));
app.get("/",(req, res) => {
  res.send("Server is running");
});

app.use("/api/user", User);
app.use("/api/restaurants", Restaurant);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
})