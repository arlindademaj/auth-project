import User from "../models/User.js";
import hashPassword from "../utils/hashPassword.js";
import generateToken from "../utils/generateToken.js";
import comparePassword from "../utils/comparePassword.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingEmail = await User.findOne({ email });

    if (!existingEmail) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const passwordMatches = await comparePassword(
      password,
      existingEmail.password,
    );

    if (!passwordMatches) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(existingEmail);

    res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        id: existingEmail._id,
        username: existingEmail.username,
        email: existingEmail.email,
        role: existingEmail.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true },
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
