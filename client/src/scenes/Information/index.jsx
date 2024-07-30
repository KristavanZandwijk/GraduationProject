import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Header from 'components/Header';
import { GitHub } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';



const Figure = ({ src, alt, caption, figureNumber, style }) => (
  <Box mb={4}>
    <img
      src={src}
      alt={alt}
      style={style}
    />
    <Typography variant="caption" display="block" align="center" mt={1}>
      Figure {figureNumber}: {caption}
    </Typography>
  </Box>
);




const Information = () => {
  const linkUrl = 'https://github.com/KristavanZandwijk/GraduationProject'; // Replace with your target URL

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex">
      {/* Left side content */}
      <Box flex="1" mr={4}>
        <Header
          title="Information"
          subtitle="This page explains (1) what the AECO data space it, (2) how it works for users and admins, and (3) who and why it was developed."
        />

        {/* Text content */}
        <Box mt={3}>
          <Typography color={theme.palette.secondary[100]} fontWeight="bold" variant="h5" gutterBottom>
            Explanation AECO Data Space
          </Typography>
          <Typography variant="body1" gutterBottom>
            This website represents the AECO (Architecture, Engineering, Construction, and Operations) data space, which is designed to facilitate seamless information exchange and collaboration among different stakeholders involved during the different life-cycle stages of a building. 
          </Typography>
          <Typography variant="body1" gutterBottom>
            The AECO data space contains different smaller data spaces that together form the AECO data space. Hence, the AECO data space consists of several building data spaces, which in turn consist of element data spaces, as shown in Figure 1.
          </Typography>
          <Typography variant="body1" gutterBottom>
            During a building's life cycle, different stakeholders generate information at various stages. Following the ISO 19650 recommended workflow for data sharing, this information undergoes different stages before becoming publicly accessible. Initially, data is labeled as Work In Progress (W.I.P) and is not publicly accessible. It is then shared within the company or team (shared). Finally, once all stakeholders agree, the data can be made publicly available.
          </Typography>
          <Typography variant="body1" gutterBottom>
            The AECO data space follows a hierarchical structure comprising several data spaces, ranging from personal to project, team, element, building, and urban data spaces, as shown in Figure 2.
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
          <ol>
            <li>
              <Typography
                onClick={() => navigate('/personaldataspace')}
                sx={{ cursor: 'pointer' }}
              >
                <strong>Personal Data Space:</strong> This space contains the data that is still private and only accessible to the user that uploaded the data.
              </Typography>
            </li>
            <li>
              <Typography
                onClick={() => navigate('/companydataspace')}
                sx={{ cursor: 'pointer' }}
              >
                 <strong>Project Data Space:</strong> Each user works for a company, and every company has one or more projects related to a building or building element. For each project, a project data space is created. Files in this space are accessible to all employees assigned to the project within the company.
              </Typography>
             
            </li>
            <li>
              <Typography
                onClick={() => navigate('/teamdataspace')}
                sx={{ cursor: 'pointer' }}
              >
                <strong>Team Data Space:</strong> The AECO industry is interconnected, with different companies often collaborating on the design, construction, maintenance, or deconstruction of a building. The team data spaces are collections of related project data spaces from multiple companies, allowing inter-company file sharing.
              </Typography>
              
            </li>
            <li>
              <Typography
                onClick={() => navigate('/elementdataspace')}
                sx={{ cursor: 'pointer' }}
              >
                <strong>Element/Building Data Space:</strong> When all stakeholders within the team agree about the content of the data, the data can be made publicly available and thus moves to the related building or element data space.
              </Typography>
            </li>
            <li>
              <Typography
                onClick={() => navigate('/urbanscale')}
                sx={{ cursor: 'pointer'}}
              >
                <strong>Urban Data Space:</strong> This data space includes all building data spaces.
              </Typography>
              
            </li>
          </ol>
          </Typography>

          <Typography color={theme.palette.secondary[100]} fontWeight="bold" variant="h5" gutterBottom>
            User Guide
          </Typography>
          <Typography variant="body1" gutterBottom>
          <ol>
          <li>
            <Typography
                onClick={() => navigate(`/`)}
                sx={{ cursor: 'pointer' }}
            >
                <strong>Register as a user:</strong> When new to the dataspace, a user should register itself. At the log-in page, there is an option to register as a new user. 
            </Typography>
            </li>
            <li>
            <Typography
                onClick={() => navigate(`/dataupload`)}
                sx={{ cursor: 'pointer' }}
            >
                <strong>Upload Data:</strong> Next, the user should upload their data. In doing so, it is important to indicate the owner of the file, to which element or building the file is related, and the company, project, and possibly the team that are involved with the file. Finally, the user should indicate the sharing status of the file, chosing the file to be private, shared, or public. 
            </Typography>
            </li>
            <li>
            <Typography
                onClick={() => navigate(`/personaldataspace`)}
                sx={{ cursor: 'pointer' }}
            >
                <strong>Update File Status:</strong> Over time, the sharing status of a file could change. It is important that the user updates this infromation in their personal data space. When changing the status, the file will become acccessible in the different data spaces, and thus for different users. See the personal data space for an elaborat explanation of which file is accessible to which user with what file status.
            </Typography>
            </li>
            <li>
            <Typography>
                <strong>Explore Data Spaces:</strong> Finally, the user can explore the different data spaces. In the personal data space, the user can find all their uploaded files. Next, the project data spaces shows the files related to the projects the user is involved in, same for the team data space. The building and element data space shows all files that are publicly available for every user.
            </Typography>
            </li>
            </ol>
          </Typography>
          <Typography color={theme.palette.secondary[100]} fontWeight="bold" variant="h5" gutterBottom>
            Admin Information
          </Typography>
          <Typography variant="body1" gutterBottom>
            As an admin it is important to keep track of the following meta deta;
          </Typography>
          <Typography variant="body1" gutterBottom>
          <ol>
            <li>
            <Typography
                onClick={() => navigate(`/companyinformation/newcompany`)}
                sx={{ cursor: 'pointer' }}
            >
                <strong>New Companies:</strong> When a new company is founded, the admin should create a new company in the company information tab.
            </Typography>
            </li>

              <li>
              <Typography
                onClick={() => navigate(`/companydataspace/newproject`)}
                sx={{ cursor: 'pointer' }}
            >
                <strong>New Project:</strong> When a new project is established, the admin should create a new project in the company data space tab. The project should include the employees that are working on the project, the client, and to which building the company is related. If the project is related to a specific element, please select in which building the element is located.  
            </Typography>
              </li>
              <li>
              <Typography
                onClick={() => navigate(`/teamdataspace/newteam`)}
                sx={{ cursor: 'pointer' }}
            >
                <strong>New Teams:</strong> When a new team is established, the admin should create a new team in the team data space. In doing so, it is important to select the companies that are involved in the team, the client of the job, and the projects of specific companies that are related to this team.  
                </Typography>
                </li>
                <li>
              <Typography
                onClick={() => navigate(`/urbanscale/newbuilding`)}
                sx={{ cursor: 'pointer' }}
            >
                <strong>New Building:</strong> When a new building is build, the admin should create a new building in the urban data space. In doing so, the building owner, name and place need to be determined. 
                </Typography>
                </li>
                <li>
              <Typography
                onClick={() => navigate(`/elementdataspace/newelement`)}
                sx={{ cursor: 'pointer' }}
            >
                <strong>New Element:</strong> When a new element is created, the admin should create a new element in the element data space. In doing so, the element owner, name and place need to be determined.  
                </Typography>
                </li>
            </ol>
          </Typography>

          {/* Header and additional text */}
          <Box mt={4}>
            <Typography color={theme.palette.secondary[100]} fontWeight="bold" variant="h5" gutterBottom>
              Acknowledgement
            </Typography>
            <Typography variant="body1" gutterBottom>
              This AECO data space is developed by Krista van Zandwijk and is part of a final master project of a double degree master program including the masters' Construction Management & Engineering (CME) and Innovation Sciences (IS). The defense of this thesis took place on the XXX of November 2024, after which the research became public. The development code of the data space can be found on Github  
              <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                <GitHub style={{ fontSize: 16, color: 'black', marginLeft: '0.5rem' }} />
              </a>.
              The code is openly accessible, and is allowed to be re-used. If you use this code, please cite it as:
            </Typography>
            <Typography variant="body1">
              van Zandwijk, G. R. K. (2024). [Title report] 
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right side content */}
      <Box flex="1" ml={4}>
        <Figure
          src="/DataSpaces.png"
          alt="Data Spaces"
          style={{ maxWidth: '80%', height: 'auto' }}
          caption="Overview of the AECO data spaces."
          figureNumber="1"
        />
        <Figure
          src="/ExplanationDataSpaceStructure.png"
          alt="Data Space Structure"
          style={{ maxWidth: '100%', height: 'auto' }}
          caption="Explanation of the data space structure."
          figureNumber="2"
        />
      </Box>
    </Box>
  );
};

export default Information;
