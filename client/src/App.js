import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Layout from "scenes/layout";
import BuildingDataSpace from "scenes/BuildingDataSpace";
import ElementDataSpace from "scenes/ElementDataSpace";
import SearchFunction from "scenes/SearchFunction";
import ProjectLearning from "scenes/ProjectLearning";
import ElementPassport from "scenes/ElementPassport";
import ElementReuse from "scenes/ElementReuse";
import EmergencyPlans from "scenes/EmergencyPlans";
import DataPrivacy from "scenes/DataPrivacy";
import Personal from "scenes/PersonalDataSpace"
import Profile from "scenes/Profile";
import ProfilePage from "scenes/profilePage";
import NewBuilding from "scenes/NewBuilding";
import NewElement from "scenes/NewElement";
import BuildingDataSpaceID from "scenes/BuildingDataSpaceID";
import ElementDataSpaceID from "scenes/ElementDataSpaceID";
import File from "scenes/File";
import UrbanScale from "scenes/UrbanScale";
import CompanyDataSpace from "scenes/CompanyDataSpace";
import NewCompany from "scenes/NewCompany";
import NewProject from "scenes/NewProject";
import CompanyInfoPage from "scenes/CompanyInformation";
import NewFile from "scenes/DataUpload";
import ProjectDataSpace from "scenes/ProjectDataSpace";
import IFCtoRDFConverter from "scenes/IFCtoRDFConverter";
import CompanyDataSpaceID from "scenes/CompanyDataSpaceID";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
          <Route element={<Layout />}>
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />}/>
            <Route path="/personaldataspace/:dataspaceID" element={isAuth ? <Personal /> : <Navigate to="/" />} />
            <Route path="/home/:userId"   element={isAuth ? <ProfilePage /> : <Navigate to="/" />}/>
            <Route path="/buildingdataspace" element={ isAuth ? <BuildingDataSpace /> : <Navigate to="/" />}/>
            <Route path="/buildingdataspace/:buildingDataSpaceID" element={ isAuth ? <BuildingDataSpaceID /> : <Navigate to="/" />}/>
            <Route path="/buildingdataspace/:buildingDataSpaceID/:fileID" element={ isAuth ? <File /> : <Navigate to="/" />}/>
            <Route path="/elementdataspace" element={isAuth ? <ElementDataSpace /> : <Navigate to="/" />}/>
            <Route path="/elementdataspace/:elementDataSpaceID" element={isAuth ? <ElementDataSpaceID /> : <Navigate to="/" />}/>
            <Route path="/elementdataspace/:elementDataSpaceID/:fileID" element={isAuth ? <File /> : <Navigate to="/" />}/>
            <Route path="/searchfunction" element={isAuth ? <SearchFunction /> : <Navigate to="/" />}/>
            <Route path="/projectlearning" element={isAuth ? <ProjectLearning /> : <Navigate to="/" />}/>
            <Route path="/elementpassport" element={isAuth ? <ElementPassport /> : <Navigate to="/" />}/>
            <Route path="/elementreuse" element={isAuth ? <ElementReuse /> : <Navigate to="/" />}/>
            <Route path="/emergencyplans" element={isAuth ? <EmergencyPlans /> : <Navigate to="/" />}/>
            <Route path="/dataprivacy" element={isAuth ? <DataPrivacy /> : <Navigate to="/" />}/>
            <Route path="/personaldataspace" element={isAuth ? <Personal /> : <Navigate to="/" />}/>
            <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/" />}/>
            <Route path="/newbuilding" element={isAuth ? <NewBuilding /> : <Navigate to="/" />}/>
            <Route path="/newelement" element={isAuth ? <NewElement /> : <Navigate to="/" />}/>
            <Route path="/urbanscale" element={isAuth ? <UrbanScale /> : <Navigate to="/" />}/>
            <Route path="/companyinformation" element={isAuth ? <CompanyInfoPage/> : <Navigate to="/" />}/>
            <Route path="/newcompany" element={isAuth ? <NewCompany /> : <Navigate to="/" />}/>
            <Route path="/newproject" element={isAuth ? <NewProject /> : <Navigate to="/" />}/>
            <Route path="/companydataspace" element={isAuth ? <CompanyDataSpace /> : <Navigate to="/" />}/>
            <Route path="/companydataspace/:companyID" element={isAuth ? <CompanyDataSpaceID /> : <Navigate to="/" />}/>
            <Route path="/companydataspace/:companyID/:projectID" element={isAuth ? <ProjectDataSpace /> : <Navigate to="/" />}/>
            <Route path="/dataupload" element={isAuth ? <NewFile /> : <Navigate to="/" />}/>
            <Route path="/dataupload/IFCtoRDFConverter" element={isAuth ? <IFCtoRDFConverter/> : <Navigate to="/" />}/>

          </Route>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;