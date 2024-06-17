import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundColor={theme.palette.background.default}
    >
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          color={theme.palette.secondary[200]}
          fontWeight="bold"
          variant="h2"
          sx={{ mb: "1.5rem" }}
        >
          Welcome to the AECO Data Space!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
