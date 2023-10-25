const vehicleService = require("../Services/vehicaleService");
var vehicleObj = new vehicleService();

exports.getAllVehicle = async (req, res) => {
  try {
    vehicleObj.getAllVehicle(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    console.log("error in controller...", err);
  }
};

exports.addNewVehicle = async (req, res) => {
  try {
    vehicleObj.addVehicle(req.body, function (err, data) {
      if (err) {
        console.log(err);
        res.status(err.status).send(err.message);
      } else {
        res.status(200).json({ message: "Added Vehicle Successfully!", data });
      }
    });
  } catch (err) {
    console.log("error while adding new vehicle; ", err);
  }
};

exports.viewSingleVehicle = async (req, res) => {
  try {
    vehicleObj.viewSingleVehicle(req.body.id, function (err, data) {
      if (err) {
        res.status(err.status).send(err.message);
      } else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    console.err(err);
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    vehicleObj.updateVehicle(req.params.id, req.body, function (err, data) {
      if (err) {
        res.status(err?.status || 500).json({
          data: {},
          message: err?.message || "Something went Wrong",
        });
      } else {
        res
          .status(200)
          .json({ staus: 200, message: "updated successfully", data });
      }
    });
  } catch (err) {
    console.error(err);
  }
};

exports.fetchVehicalWithSearch = async (req, res) => {
  try {
    vehicleObj.searchVehicle(
      req?.query?.item,
      parseInt(req?.query?.page || 1),
      parseInt(req?.query?.limit || 10),
      function (err, data) {
        if (err) {
          res.status(err.status).send(err.message);
        } else {
          res
            .status(200)
            .send({ message: "Fetched Vehical Successfully!", data });
        }
      }
    );
  } catch (err) {
    console.err(err);
  }
};
