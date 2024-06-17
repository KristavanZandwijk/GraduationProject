import User from "../models/User.js";

export const getUser2 = async(req, res) => {
    try {
        const user2 = await User.find();
        res.status(200).json(user2);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}