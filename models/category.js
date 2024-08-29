// const mongoose = require('mongoose');

// const CategorySchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Category', CategorySchema);


const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  categoryname: {
    type: String,
    required: false,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", CategorySchema);