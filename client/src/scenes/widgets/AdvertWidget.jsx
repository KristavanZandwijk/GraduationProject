import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { usetheme } from "@mui/material"
import { GitHub } from '@mui/icons-material';

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
          Graduation Project of Krista van Zandwijk
        </Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:5001/assets/tue.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>

      </FlexBetween>
      <Typography variant="body1" m="0.5rem 0">
      This project is part of the final master project of a double degree master program including the masters’ Construction
      Management & Engineering (CME) and Innovation Sciences (IS) at the Eindhoven University of Technology. 
      </Typography>
      <FlexBetween>
        <Typography color={theme.palette.secondary[200]} fontWeight="bold" variant="h6">
          In collaboration with Witteveen + Bos
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
      </FlexBetween>
      <Typography variant="body1" m="0.5rem 0">
        An engineering consultancy in the fields of water, infrastructure, the environment, and construction.
      </Typography>
      <Typography color={theme.palette.secondary[200]} fontWeight="bold" variant="h6">
          Acknowledgement
        </Typography>
        <Typography variant="body1" gutterBottom>
              The defense of this thesis took place on the 28th of November 2024, after which the research became public. The development code of the data space can be found on Github  
              <a href='https://github.com/KristavanZandwijk/GraduationProject' target="_blank" rel="noopener noreferrer">
                <GitHub style={{ fontSize: 16, color: 'black', marginLeft: '0.5rem' }} />
              </a>.
              The code is openly accessible, and is allowed to be re-used. If you use this code, please cite it as:
            </Typography>
            <Typography variant="body1">
              van Zandwijk, G. R. K. (2024). Improving Information Exchange in the Architecture, Engineering, Construction, and Operations Industry: Governance and Development of a Data Space 
            </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
