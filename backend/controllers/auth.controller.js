import bcrypt from "bcrypt";
import User from "../models/User.js"
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email})

        if(existingUser) {
            return res.status(400).json({
                message: "email already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        });

        return res.status(201).json({
            message: "user registered successfully",
            user : {
                id: user._id,
                name:user.name,
                email:user.email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
        });
    }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
      }
    );

    // Generate refresh token
    const refreshToken = crypto.randomBytes(64).toString("hex");

    // Hash refresh token before storing it
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // Store hashed refresh token in database
    await User.findByIdAndUpdate(user._id, {
      refreshTokenHash,
    });

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};


export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token is required",
      });
    }

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const user = await User.findOne({ refreshTokenHash });

    if (!user) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
      }
    );

    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "-password -refreshTokenHash"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, {
      refreshTokenHash: null,
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};