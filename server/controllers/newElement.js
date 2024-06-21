import Element from "../models/Elements.js";

export const createElement = async (req, res) => {
  try {
    const {elementID, elementDataSpaceID, hasOwner, elementName, elementLocation, hasBuilding } = req.body;

    const newElement = new Element({
      elementID,
      elementDataSpaceID,
      hasOwner,
      elementName,
      elementLocation,
      hasBuilding,
    });

    await newElement.save();
    res.status(201).json(newElement);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
