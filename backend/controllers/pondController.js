const Pond = require('../models/Pond');

// Get all ponds
exports.getAllPonds = async (req, res) => {
  try {
    const ponds = await Pond.getAll();
    res.json(ponds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch ponds' });
  }
};

// Get pond by ID
exports.getPondById = async (req, res) => {
  try {
    const pond = await Pond.getById(req.params.id);
    if (!pond) return res.status(404).json({ message: 'Pond not found' });
    res.json(pond);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch pond' });
  }
};

// Create new pond
exports.createPond = async (req, res) => {
  try {
    const newPond = await Pond.create(req.body);
    res.status(201).json(newPond);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create pond' });
  }
};

// Update pond
exports.updatePond = async (req, res) => {
  try {
    const updatedPond = await Pond.update(req.params.id, req.body);
    if (!updatedPond) return res.status(404).json({ message: 'Pond not found' });
    res.json(updatedPond);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update pond' });
  }
};

// Delete pond
exports.deletePond = async (req, res) => {
  try {
    const deletedPond = await Pond.delete(req.params.id);
    if (!deletedPond) return res.status(404).json({ message: 'Pond not found' });
    res.json({ message: 'Pond deleted', deletedPond });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete pond' });
  }
};
