import User from "../models/User.js";

export const getUser3 = async(req, res) => {
    try {
        const user3 = await User.find();
        res.status(200).json(user3);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}