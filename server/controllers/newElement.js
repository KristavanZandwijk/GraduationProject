import Element from "../models/Elements.js";

export const createElement = async (req, res) => {
  try {
    const {elementID, elementDataSpaceID, elementOwner, elementName, elementLocation, isPartOfBuilding } = req.body;

    const newElement = new Element({
      elementID,
      elementDataSpaceID,
      elementOwner,
      elementName,
      elementLocation,
      isPartOfBuilding,
    });

    await newElement.save();
    res.status(201).json(newElement);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
