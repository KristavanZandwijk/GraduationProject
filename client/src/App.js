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
import Personal from "scenes/Personal"
import Profile from "scenes/Profile";
import ProfilePage from "scenes/ProfilePage";

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
            <Route path="/personaldataspace" element={isAuth ? <Personal /> : <Navigate to="/" />} />
            <Route path="/profile/:userId"   element={isAuth ? <ProfilePage /> : <Navigate to="/" />}/>
            <Route path="/buildingdataspace" element={ isAuth ? <BuildingDataSpace /> : <Navigate to="/" />}/>
            <Route path="/elementdataspace" element={isAuth ? <ElementDataSpace /> : <Navigate to="/" />}/>
            <Route path="/searchfunction" element={isAuth ? <SearchFunction /> : <Navigate to="/" />}/>
            <Route path="/projectlearning" element={isAuth ? <ProjectLearning /> : <Navigate to="/" />}/>
            <Route path="/elementpassport" element={isAuth ? <ElementPassport /> : <Navigate to="/" />}/>
            <Route path="/elementreuse" element={isAuth ? <ElementReuse /> : <Navigate to="/" />}/>
            <Route path="/emergencyplans" element={isAuth ? <EmergencyPlans /> : <Navigate to="/" />}/>
            <Route path="/dataprivacy" element={isAuth ? <DataPrivacy /> : <Navigate to="/" />}/>
            <Route path="/personaldataspace" element={isAuth ? <Personal /> : <Navigate to="/" />}/>
            <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/" />}/>
          </Route>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;