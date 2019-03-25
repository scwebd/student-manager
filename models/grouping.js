const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupingSchema = new Schema({
  name: { type: String, required: true },
  class: String,
  groups: [[{}]],
  dateCreated: String,
  date: { type: Date, default: Date.now }
});

const Grouping = mongoose.model("Grouping", groupingSchema);

module.exports = Grouping;
