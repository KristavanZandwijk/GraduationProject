import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import fileRoutes from "./routes/files.js";
import buildingRoutes from "./routes/building.js";
import companyRoutes from "./routes/company.js";
import projectRoutes from "./routes/project.js";
import elementRoutes from "./routes/element.js";
import newBuildingRoutes from "./routes/newBuilding.js";
import newElementRoutes from "./routes/newElement.js";
import newCompanyRoutes from "./routes/newCompany.js";
import newTeamRoutes from "./routes/newTeam.js";
import teamRoutes from "./routes/team.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import Element from "./models/Elements.js";
import { elements, projects, buildings } from "./data/index.js";
import Company from "./models/Company.js";
import { companies} from "./data/index.js";
import Project from "./models/Project.js";
import newProjectRoutes from "./routes/newProject.js";
import Building from "./models/Building.js";
import IFCtoRDFConverterRoutes from "./routes/IFCtoRDFConverter.js";


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/files", fileRoutes);
app.use("/buildings", buildingRoutes);
app.use("/elements", elementRoutes);
app.use("/newbuildings", newBuildingRoutes);
app.use("/newelements", newElementRoutes);
app.use("/newcompanies", newCompanyRoutes);
app.use("/companies", companyRoutes);
app.use("/projects", projectRoutes);
app.use("/newprojects", newProjectRoutes);
app.use('/converter', IFCtoRDFConverterRoutes);
app.use('/teams', teamRoutes);
app.use('/newteam', newTeamRoutes);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
    //Building.insertMany(buildings);
    //Element.insertMany(elements);
    //Company.insertMany(companies);
   //Project.insertMany(projects);
  })
  .catch((error) => console.log(`${error} did not connect`));