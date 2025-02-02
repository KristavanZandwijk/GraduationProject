import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      personID,
      firstName,
      lastName,
      BSNNumber,
      email,
      password,
      city,
      country,
      dataSpaceID,
      role,
      roleID,
      phoneNumber,
      picturePath,
    } = req.body;

    // Ensure role is an array (e.g., role: ["admin", "team leader"])
    const rolesArray = Array.isArray(role) ? role : role.split(',').map(item => item.trim());

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      personID,
      firstName,
      lastName,
      BSNNumber,
      email,
      password: passwordHash,
      city,
      country,
      dataSpaceID,
      role: rolesArray,
      roleID,
      phoneNumber,
      picturePath,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};