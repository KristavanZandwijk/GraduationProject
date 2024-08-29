import Element from "../models/Elements.js";

/* READ */
export const getAllElements = async (req, res) => {
  try {
    const elements = await Element.find({ });

    if (!elements.length) {
      return res.status(404).json({ message: "No elements found at all" });
    }

    res.status(200).json(elements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//Update Element Meta data
export const updateElement= async (req, res) => {
  try {
    const { elementID } = req.params;
    const updatedElement = await Element.findOneAndUpdate({ elementID }, req.body, { new: true });
    res.status(200).json(updatedElement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
