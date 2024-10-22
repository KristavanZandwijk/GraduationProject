import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
  personID: yup.string().required("required"),
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  BSNNumber: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  city: yup.string().required("required"),
  country: yup.string().required("required"),
  dataSpaceID: yup.string().required("required"),
  role: yup.array().of(yup.string()).required("required"),
  roleID: yup.string().required("required"),
  phoneNumber: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  personID: "",
  firstName: "",
  lastName: "",
  BSNNumber: "",
  email: "",
  password: "",
  city: "",
  country: "",
  dataSpaceID: "",
  role: [],
  roleID: "",
  phoneNumber: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const theme = useTheme();

  const roles = [
    "admin",
    "architect",
    "BIM manager",
    "building manager",
    "building owner",
    "CEO",
    "civil engineer",
    "client",
    "company owner",
    "contract officer",
    "contractor",
    "cost estimator",
    "design manager",
    "digital twin specialist",
    "director",
    "electrical engineer",
    "element owner",
    "employee",
    "energy consultant",
    "engineering manager",
    "facility manager",
    "finance manager",
    "geotechnical engineer",
    "health and safety officer",
    "HR manager",
    "HVAC specialist",
    "installation engineer",
    "IT support",
    "legal advisor",
    "logistics manager",
    "MEP engineer",
    "project director",
    "project leader",
    "procurement manager",
    "quality manager",
    "site manager",
    "structural engineer",
    "sustainability consultant",
    "team leader",
    "urban designer",
    "urban planner",
    "visitor"
  ];

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:5001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:5001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="Person ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.personID}
                  name="personID"
                  error={
                    Boolean(touched.personID) && Boolean(errors.personID)
                  }
                  helperText={touched.personID && errors.personID}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="BSN Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.BSNNumber}
                  name="BSNNumber"
                  error={Boolean(touched.BSNNumber) && Boolean(errors.BSNNumber)}
                  helperText={touched.BSNNumber && errors.BSNNumber}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="City"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                  name="city"
                  error={Boolean(touched.city) && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Country"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.country}
                  name="country"
                  error={Boolean(touched.country) && Boolean(errors.country)}
                  helperText={touched.country && errors.country}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Dataspace ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dataSpaceID}
                  name="dataSpaceID"
                  error={
                    Boolean(touched.dataSpaceID) && Boolean(errors.dataSpaceID)
                  }
                  helperText={touched.dataSpaceID && errors.dataSpaceID}
                  sx={{ gridColumn: "span 2" }}
                />
                <FormControl
                  fullWidth
                  sx={{ gridColumn: "span 4", marginTop: theme.spacing(2) }}
                  error={Boolean(touched.role) && Boolean(errors.role)}
                >
                  <InputLabel id="role-label">Roles</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    multiple  // Allow multiple selections
                    value={values.role || []}  // Ensure value is an array
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="role"
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                  {Boolean(touched.role) && Boolean(errors.role) && (
                    <Typography variant="caption" color="error">
                      {errors.role}
                    </Typography>
                  )}
                </FormControl>


                <TextField
                  label="Role ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.roleID}
                  name="roleID"
                  error={Boolean(touched.roleID) && Boolean(errors.roleID)}
                  helperText={touched.roleID && errors.roleID}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  name="phoneNumber"
                  error={
                    Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
                  }
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{ gridColumn: "span 2" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${theme.palette.secondary[200]}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: theme.palette.secondary[300],
                color: theme.palette.primary.main,
                "&:hover": { color: theme.palette.primary[800] },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: theme.palette.secondary[200],
                "&:hover": {
                  cursor: "pointer",
                  color: theme.palette.primary[200],
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
