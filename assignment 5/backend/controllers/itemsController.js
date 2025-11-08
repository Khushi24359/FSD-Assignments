// backend/controllers/itemsController.js
const Item = require('../models/Item');


exports.getAll = async (req, res, next) => {
try {
const items = await Item.find().sort({ createdAt: -1 });
res.json(items);
} catch (err) { next(err); }
};


exports.getOne = async (req, res, next) => {
try {
const item = await Item.findById(req.params.id);
if (!item) return res.status(404).json({ message: 'Item not found' });
res.json(item);
} catch (err) { next(err); }
};


exports.create = async (req, res, next) => {
try {
const newItem = new Item(req.body);
const saved = await newItem.save();
res.status(201).json(saved);
} catch (err) { next(err); }
};


exports.update = async (req, res, next) => {
try {
const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
if (!updated) return res.status(404).json({ message: 'Item not found' });
res.json(updated);
} catch (err) { next(err); }
};


exports.remove = async (req, res, next) => {
try {
const deleted = await Item.findByIdAndDelete(req.params.id);
if (!deleted) return res.status(404).json({ message: 'Item not found' });
res.json({ message: 'Deleted successfully' });
} catch (err) { next(err); }
};