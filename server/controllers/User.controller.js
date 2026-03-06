import User from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashPass });
    await user.save();

    res.status(201).json({
      message: "User Register Successfull",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "Invalid Credential",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({
        message: "Invalid Credential",
      });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};