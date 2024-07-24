// controllers/building.js
import Team from "../models/Team.js";

/* READ */
export const getUserTeam = async (req, res) => {
  try {
    const personID = req.userData.personID;  // user data is attached by verifyToken middleware
    const teams = await Team.find({ employee: personID });

    if (!teams.length) {
      return res.status(404).json({ message: "No teams found for this user." });
    }

    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
