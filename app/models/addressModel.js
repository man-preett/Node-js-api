const mongoose = require("mongoose");
const countrySchema = mongoose.Schema({
  country_name: { type: String },
});

const stateSchema = mongoose.Schema({
  country_name: { type: String, required: true },
});

const citySchema = mongoose.Schema({
  state_name: { type: String, required: true },
});

const Country = mongoose.model("Country", countrySchema, "em_countries");
const State = mongoose.model("State", stateSchema, "em_states");
const City = mongoose.model("City", citySchema, "em_cities");

module.exports = { Country, State, City };
