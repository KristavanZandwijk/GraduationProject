import mongoose from "mongoose";


export const buildings = [
  {
    buildingID: "sdkjhsfh",
    buildingDataSpaceID: "sdfasddfh",
    archivedBuildingDataSpaceID: "sdfasasdfh",
    hasOwner: "9027hdjs",
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
    hasBuilding: "sdkjhsfh",
    hasOwner: "personIngrid",
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
    projects: [],  // Added to match the schema
    clients: [],    // Added to match the schema
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
    picturePath: "info4.png",
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
    projects: [],  // Added to match the schema
    clients: [],    // Added to match the schema
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
];