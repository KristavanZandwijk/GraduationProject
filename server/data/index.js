import mongoose from "mongoose";


export const buildings = [
  {
    buildingID: "Atlas123",
    buildingDataSpaceID: "Atlas4321",
    archivedBuildingDataSpaceID: "AtlasArchived",
    buildingOwner: "personKrista",
    buildingName: "Atlas",
    buildingLocation: "TU/e campus Eindhoven",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
];

export const elements = [
  {
    elementID: "ele12345",
    elementDataSpaceID: "edsp12345",
    isPartOfBuilding: [
    {
      buildingID: "Atlas1234"
    },
  ],
    elementOwner: "personIngrid",
    elementName: "Element A",
    elementLocation: "TU/e campus Eindhoven",
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
    relatesTo: [
      {
      buildingID: "Atlas123"
      }
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
    relatesTo: [
      {
        buildingID: "JerryHome"
      },
    ],
  }
]