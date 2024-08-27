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