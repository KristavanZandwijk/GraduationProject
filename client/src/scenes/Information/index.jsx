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
          subtitle="This page provides an overview of the AECO data space by explaining (1) what it is, (2) how it functions for both users and administrators, and (3) the purpose and rationale behind its development."
        />

        {/* Text content */}
        <Box mt={3}>
          <Typography color={theme.palette.secondary[100]} fontWeight="bold" variant="h5" gutterBottom>
            Explanation AECO Data Space
          </Typography>
          <Typography variant="body1" gutterBottom>
            This prototype represents the AECO (Architecture, Engineering, Construction, and Operations) data space, which is designed to facilitate seamless information exchange and collaboration among different stakeholders involved during the different life-cycle stages of a building. 
          </Typography>
          <Typography variant="body1" gutterBottom>
            The AECO data space contains different smaller data spaces that together form the AECO data space. Hence, the AECO data space consists of several building data spaces, which in turn consist of element data spaces, as shown in Figure 1.
          </Typography>
          <Typography variant="body1" gutterBottom>
          Throughout a building's life cycle, various stakeholders generate information at different stages. According to the ISO 19650 workflow for data sharing, this information progresses through several phases before becoming publicly accessible. Initially, data is classified as Work In Progress (W.I.P.) and remains restricted. Next, it is shared internally within the company, team, or with the client. Once all stakeholders have reviewed and approved the data, it can be made publicly available.
          </Typography>
          <Typography variant="body1" gutterBottom>
            The AECO data space follows a hierarchical structure comprising several data spaces, ranging from personal to project, team, client, element, and building data spaces, as shown in Figure 2.
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
                 <strong>Project Data Space:</strong> Each user works for a company, and every company has one or more projects related to a building or building element. For each project, a project data space is created for which it is indicated which employees are working on that project. Files in this space are accessible to all employees assigned to the project within the company.
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
                onClick={() => navigate('/clientdataspace')}
                sx={{ cursor: 'pointer' }}
              >
                <strong>Client Data Space:</strong> For each project and team, the client of the assignment is indicated. In the client data space, the user has an overview of all projects and teams where the user is registered as a client. When the information is ready to be shared, the user can update the file status to 'shared with client'. The information will then appear in the client data space. 
              </Typography>
              
            </li>
            <li>
              <Typography
                onClick={() => navigate('/elementdataspace')}
                sx={{ cursor: 'pointer' }}
              >
                <strong>Element/Building Data Space:</strong> When all stakeholders within the project or team and the client agree about the content of the data, the data can be made publicly available and thus moves to the related building or element data space.
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
                <strong>Upload Data:</strong> Next, the user should upload their data. In doing so, it is important to indicate the owner of the file, to which element or building the file is related, and the company, project, and possibly the team that are involved with the file. Finally, the user should indicate the sharing status of the file, chosing the file to be private, shared (with project, team or client), or public. 
            </Typography>
            </li>
            <li>
            <Typography
                onClick={() => navigate(`/personaldataspace`)}
                sx={{ cursor: 'pointer' }}
            >
                <strong>Update File Status:</strong> Over time, the sharing status of a file could change. It is important that the user updates this infromation in their personal data space. When changing the status, the file will become visible in the different data spaces, and thus for different users. Navigate to the personal data space for an elaborate explanation of which file is accessible to which user with what file status.
            </Typography>
            </li>
            <li>
            <Typography>
                <strong>Explore Data Spaces:</strong> Finally, the user can explore the different data spaces. In the personal data space, the user can find all their uploaded files. Next, the project data spaces shows the files related to the projects the user is involved in, same for the team data space. When the user is registered as a client, the client data space gives an overview of the progress of all these projects and teams. The building and element data space shows all files that are publicly available for every user.
            </Typography>
            </li>
            </ol>
          </Typography>
          <Typography color={theme.palette.secondary[100]} fontWeight="bold" variant="h5" gutterBottom>
            Role Dependent Functions
          </Typography>
          <Typography variant="body1" gutterBottom>
          In the AECO data space, certain functions are accessible only to users with specific roles. For example, users with the appropriate permissions can create and update metadata, such as new projects, teams, companies, buildings, or elements. Additionally, administrators have the ability to manage and update user roles.
          </Typography>
          <Typography variant="body1" gutterBottom>
          <ol>
            <li>
            <Typography
                onClick={() => navigate(`/companyinformation/newcompany`)}
                sx={{ cursor: 'pointer' }}
            >
                <strong>New Companies:</strong> When a new company is founded, the user should create a new company in the company information tab. This can only be done by users with the roles: admin or company owner.  
            </Typography>
            </li>

              <li>
              <Typography
                onClick={() => navigate(`/companydataspace/newproject`)}
                sx={{ cursor: 'pointer' }}
            >
                <strong>New Project:</strong> When a new project is established, the user should create a new project in the company data space tab. The project should include the employees that are working on the project, the client, and to which building the company is related. If the project is related to a specific element, please select in which building the element is located. Users with the roles admin, team or project leader are authorized to do this. 
            </Typography>
              </li>
              <li>
              <Typography
                onClick={() => navigate(`/teamdataspace/newteam`)}
                sx={{ cursor: 'pointer' }}
            >
                <strong>New Teams:</strong> When a new team is established, the user should create a new team in the team data space. In doing so, it is important to select the companies that are involved in the team, the client of the job, and the projects of specific companies that are related to this team. Admin or team leaders have the authority to do this. 
                </Typography>
                </li>
                <li>
              <Typography
                onClick={() => navigate(`/urbanscale/newbuilding`)}
                sx={{ cursor: 'pointer' }}
            >
                <strong>New Building:</strong> When a new building is build, the admin should create a new building in the urban data space. In doing so, the building owner, name and place need to be determined. This function is accessible for users with the roles: admin, building owner, element owner, team leader, or project leader.
                </Typography>
                </li>
                <li>
              <Typography
                onClick={() => navigate(`/elementdataspace/newelement`)}
                sx={{ cursor: 'pointer' }}
            >
                <strong>New Element:</strong> When a new element is created, the admin should create a new element in the element data space. In doing so, the element owner, name and place need to be determined. This function is accessible for users with the roles: admin, building owner, element owner, team leader, or project leader. 
                </Typography>
                </li>
                <li>
              <Typography>
                <strong>Editting Meta Data:</strong> After a company, project, team, building, or element is created, the associated metadata may need to be updated. Users with specific permissions can make these changes. For building and element metadata, changes can be made by the user designated as the building or element owner. Team metadata can be updated by the team leader, and project metadata by the project leader. Company information can be edited by the company itself. Additionally, users registered as admins have the authority to modify any of these metadata.
                </Typography>
                </li>
                <li>
              <Typography
                onClick={() => navigate(`/admin`)}
                sx={{ cursor: 'pointer' }}
            >
                <strong>Admin Page:</strong> The information above highlights that certain functions are role-dependent, making it essential for users to have the correct roles assigned. However, to ensure security and proper access control, changing these roles should not be too easy. Therefore, only administrators have the authority to modify user roles. This can be done through the admin page, which only appears in the sidebar for users registered as admins. 
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
              This AECO data space is developed by Krista van Zandwijk and is part of a final master project of a double degree master program including the masters' Construction Management & Engineering (CME) and Innovation Sciences (IS). The defense of this thesis took place on the 28th of November 2024, after which the research became public. The development code of the data space can be found on Github  
              <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                <GitHub style={{ fontSize: 16, color: 'black', marginLeft: '0.5rem' }} />
              </a>.
              The code is openly accessible, and is allowed to be re-used. If you use this code, please cite it as:
            </Typography>
            <Typography variant="body1">
              van Zandwijk, G. R. K. (2024). Improving Information Exchange in the Architecture, Engineering, Construction, and Operations Industry: Governance and Development of a Data Space
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
