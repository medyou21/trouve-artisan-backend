const Category = require("../models/category");

exports.getAll = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};
