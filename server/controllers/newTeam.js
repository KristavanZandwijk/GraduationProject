import Team from "../models/Team.js";

export const createTeam = async (req, res) => {
  try {
    const {teamID, teamName, teamDataSpaceID, companies, clients, projects} = req.body;

    const newTeam = new Team({
      teamID,
      teamName,
      teamDataSpaceID,
      companies,
      clients,
      projects,

    });

    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
