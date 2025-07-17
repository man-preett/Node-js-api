const { Country, State, City } = require("../models/addressModel");

exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    if (!countries) {
      return res.status(404).json({
        status: true,
        message: "No country found",
        data: countries,
      });
    }
    return res.status(200).json({
      status: true,
      message: "All countries are fetched successfully",
      data: countries,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.getStates = async (req, res) => {
  try {
    const country = await Country.find(req.body);
    if (!country) {
      res.status(404).json({
        status: false,
        message: "No country found",
      });
    }
    country_id = country[0]._id;
    const state = await State.find({ country_id: country_id });
    res.json({
      state: true,
      message: "States found successfully",
      data: state,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.getCities = async (req, res) => {
  try {
    const state = await State.find(req.body);
    if (!state) {
      res.status(404).json({
        status: false,
        message: "No state found",
      });
    }
    state_id = state[0]._id;
    const city = await City.find({ state_id: state_id });
    res.json({
      state: true,
      message: "Cities found successfully",
      data: city,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
