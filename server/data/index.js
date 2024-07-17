import mongoose from "mongoose";


export const buildings = [
  {
    buildingID: "Atlas123",
    buildingDataSpaceID: "Atlas4321",
    archivedBuildingDataSpaceID: "AtlasArchived",
    hasOwner: "personKrista",
    buildingName: "Atlas",
    buildingLocation: "TU/e campus Eindhoven",
    hasFiles:[
      {
        fileID: "file1"
      },
      {
        fileID: "file2"
      }
    ],
    hasElements: [
      {
        elementID: "element1"
      },
      {
        elementID: "element2"
      },
      {
        elementID: "element3"
      },
    ],
    hasProjects: [
      {
        projectID: "project1"
      },
      {
        projectID: "project2"
      },
    ],
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
];

export const elements = [
  {
    elementID: "ele12345",
    elementDataSpaceID: "edsp12345",
    hasBuilding: "sdkjhsfh",
    hasOwner: "personIngrid",
    elementName: "Element A",
    elementLocation: "TU/e campus Eindhoven",
    hasFiles:[
      {
        fileID: "file3"
      },
      {
        fileID: "file4"
      }
    ],
    hasElements: [
      {
        elementID: "element4"
      },
      {
        elementID: "element5"
      },
      {
        elementID: "element6"
      },
    ],
    hasProjects: [
      {
        projectID: "project3"
      },
      {
        projectID: "project4"
      },
    ],
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
];

export const companies = [
  {
    companyID: "TUE12345",
    companyDataSpaceID: "TUE54321",
    companyName: "Eindhoven University of Eindhoven",
    city: "Eindhoven",
    country: "The Netherlands",
    picturePath: "tue-logo.jpg",
    employees: [
      { 
        personID: "personJan"
      },
      { 
        personID: "personKrista"
      },
      {
        personID: "personHasti"
      }, 
    ],
    projects: [
      {
        projectID:"project1"
      },
      {
        projectID: "project2"
      },
    ],  // Added to match the schema
    createdAt: 1115211422,
    updatedAt: 1115211422, 
    __v: 0,
  },
  {
    companyID: "Witte2024",
    companyDataSpaceID: "Witte2024",
    companyName: "Witteveen + Bos",
    city: "Deventer",
    country: "The Netherlands",
    picturePath: "witteveenbos.jpg",
    employees: [
      { 
        personID: "personIngrid"
      },
      { 
        personID: "personJerry"
      },
      {
        personID: "personElla"
      }, 
      {
        personID: "personGerda"
      },  
    ],
    projects: [
      {
        projectID: "project3"
      },
      {
        projectID: "project4"
      },
    ],
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
];

export const projects = [
  {
    projectID: "Project1",
    projectName: "Renovation of Atlas",
    projectDescription: "This project is about the renovation of Atlas, which is the head building at the campus of the Eindhoven Univeristy of Technology",
    companies: [
      {
        companyID: "Witte2024"
      },
      {
        companyID: "TUE12345"
      },
    ],
    employees:[
      {
        personID: "personJerry"
      },
      {
        personID: "personIngrid"
      },
      {
        personID: "personHasti"
      },
    ],
    clients: [
      {
        personID: "personKrista"
      },
    ],
    files: [
      {
        fileID: "file1"
      },
      {
        fileID: "file2"
      },
      {
        fileID: "file3"
      },
    ],
  },
  {
    projectID: "project2",
    projectName: "Renovation of Jerry's home",
    projectDescription: "This project is about the renovation of Jerry's Home!",
    companies: [
      {
        companyID: "Witte2024"
      },
    ],
    employees:[
      {
        personID: "personJerry"
      },
      {
        personID: "personIngrid"
      },
    ],
    clients: [
      {
        personID: "personJerry"
      },
    ],
    files: [
      {
        fileID: "file3"
      },
      {
        fileID: "file4"
      },
    ],
  }
]