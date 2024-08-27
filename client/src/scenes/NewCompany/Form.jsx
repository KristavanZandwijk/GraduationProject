import {
  Box,
  Divider,
  InputBase,
  Button,
  Typography,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompanies, setUsers } from "state";
import axios from "axios";

const CompanyDrop = () => {
  const dispatch = useDispatch();
  const [companyID, setCompanyID] = useState("");
  const [companyDataSpaceID, setCompanyDataSpaceID] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedCompanyOwner, setSelectedCompanyOwner] = useState([]); // Correct state for company owner
  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUsers(Array.isArray(response.data) ? response.data : []));
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, [token, dispatch]);

  const handleCompany = async () => {
    const companyData = {
      companyID,
      companyDataSpaceID,
      companyName,
      city,
      country,
      employees: selectedEmployees.map((employeeID) => ({ personID: employeeID })),
      companyOwner: Array.isArray(selectedCompanyOwner) ? selectedCompanyOwner.map((companyOwnerID) => ({ personID: companyOwnerID })) : [],
    };
  
    try {
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
        setSelectedEmployees([]);
        setSelectedCompanyOwner([]);
      } else {
        console.error(newCompany.message);
      }
    } catch (error) {
      console.error("Failed to create company:", error);
    }
  };
  

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.default,
        borderRadius: "1rem",
        padding: "2rem",
        border: "1px solid",
        borderColor: theme.palette.secondary[100],
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "2rem",
          textAlign: "center",
          color: theme.palette.secondary[100],
          fontWeight: "bold",
        }}
      >
        Create the meta-data of a new company here!
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
          placeholder="Add the company's location"
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
        <Select
          multiple
          value={selectedEmployees}
          onChange={(e) => setSelectedEmployees(e.target.value)}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select the Employees</em>; // Placeholder when no employee is selected
            }

            return selected.map((value) => {
              const user = users.find((user) => user.personID === value);
              return user ? `${user.personID} - ${user.firstName} ${user.lastName}` : null;
            }).join(", ");
          }}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.primary.default,
            borderRadius: "1rem",
            padding: "0.75rem 1.5rem",
            border: `1px solid ${theme.palette.secondary[100]}`,
          }}
        >
          <MenuItem value="" disabled>Select the Employees</MenuItem> {/* Placeholder option */}
          {users.map((user) => (
            <MenuItem key={user.personID} value={user.personID}>
              {`${user.personID} - ${user.firstName} ${user.lastName}`}
            </MenuItem>
          ))}
        </Select>


        <Select
          multiple
          value={selectedCompanyOwner}
          onChange={(e) => setSelectedCompanyOwner(e.target.value)}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select the Company Owner</em>; // Placeholder when no owner is selected
            }

            return selected.map((value) => {
              const user = users.find((user) => user.personID === value);
              return user ? `${user.personID} - ${user.firstName} ${user.lastName}` : null;
            }).join(", ");
          }}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.primary.default,
            borderRadius: "1rem",
            padding: "0.75rem 1.5rem",
            border: `1px solid ${theme.palette.secondary[100]}`,
          }}
        >
          <MenuItem value="" disabled>Select the Company Owner</MenuItem> {/* Placeholder option */}
          {users.map((user) => (
            <MenuItem key={user.personID} value={user.personID}>
              {`${user.personID} - ${user.firstName} ${user.lastName}`}
            </MenuItem>
          ))}
        </Select>


      </Box>
      <Divider sx={{ margin: "2rem 0" }} />
      <Button
        disabled={
          !companyID ||
          !companyDataSpaceID ||
          !companyName ||
          !city ||
          !country ||
          !selectedEmployees.length ||
          !selectedCompanyOwner.length 
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
        CREATE NEW COMPANY!
      </Button>
    </Box>
  );
};

export default CompanyDrop;
