import {
    Box,
    Divider,
    InputBase,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
  } from "@mui/material";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setCompanies } from "state";
  
  const CompanyDrop = () => {
    const dispatch = useDispatch();
    const [companyID, setCompanyID] = useState("");
    const [companyDataSpaceID, setCompanyDataSpaceID] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const theme = useTheme();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  
    const handleCompany = async () => {
      const companyData = {
        companyID,
        companyDataSpaceID,
        companyName,
        city,
        country,
      };
  
      const response = await fetch(`http://localhost:5001/newcompanies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(companyData),
      });
  
      const newCompany = await response.json(); 
      if (response.status === 201) {
        dispatch(setCompanies(newCompany));
        setCompanyID("");
        setCompanyDataSpaceID("");
        setCompanyName("");
        setCity("");
        setCountry("");
      } else {
        console.error(newCompany.message);
      }
    };
  
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.primary.default,
          borderRadius: "1rem",
          padding: "2rem",
          border: "1px solid", // Set the border width and style
          borderColor: theme.palette.secondary[100] // Set the border colo
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: "2rem",
            textAlign: "center",
            color: theme.palette.secondary[100],
            fontweight: "bold",
          }}
        >
          Create the meta-data of a new company here!
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <InputBase
            placeholder="Add a company ID"
            onChange={(e) => setCompanyID(e.target.value)}
            value={companyID}
            sx={{
              width: "100%",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
          <InputBase
            placeholder="Add a company data space ID"
            onChange={(e) => setCompanyDataSpaceID(e.target.value)}
            value={companyDataSpaceID}
            sx={{
              width: "100%",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
          <InputBase
            placeholder="Add a company name"
            onChange={(e) => setCompanyName(e.target.value)}
            value={companyName}
            sx={{
              width: "100%",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
          <InputBase
            placeholder="Add the Company's location"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            sx={{
              width: "100%",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
                    <InputBase
            placeholder="Add the company's country"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            sx={{
              width: "100%",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
        </Box>
        <Divider sx={{ margin: "2rem 0" }} />
        <Button
          disabled={
            !companyID ||
            !companyDataSpaceID ||
            !companyName ||
            !city ||
            !country 
          }
          onClick={handleCompany}
          sx={{
            backgroundColor: theme.palette.secondary[300],
            color: theme.palette.primary.main,
            "&:hover": { color: theme.palette.primary[800] },
            borderRadius: "3rem",
            width: "100%",
            padding: "1rem 2rem",
          }}
        >
          UPLOAD
        </Button>
      </Box>
    );
  };
  
  export default CompanyDrop;
  