import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { usetheme } from "@mui/material"

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const theme = useTheme();

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={theme.palette.secondary[200]} fontWeight="bold" variant="h6">
          In collaboration with
        </Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:5001/assets/info4.png"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography
          component="a"
          href="https://www.witteveenbos.com/nl"
          target="_blank"
          rel="noopener noreferrer"
          color={theme.palette.secondary[200]}
          fontWeight="bold"
          sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
        >
          Witteveen + Bos
        </Typography>
      </FlexBetween>
      <Typography color={theme.palette.secondary.main} m="0.5rem 0">
        Advice and designs in the fields of water, infrastructure, the environment, and construction.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
