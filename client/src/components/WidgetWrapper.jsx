import { Box } from "@mui/material";
import { styled } from "@mui/system";
import useTheme from "@mui/material";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "0.75rem",
}));

export default WidgetWrapper;