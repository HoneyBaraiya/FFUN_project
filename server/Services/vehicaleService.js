const { default: mongoose } = require("mongoose");
const vehicleModel = require("../Model/vehicle");

class vehicle {
  async getAllVehicle(callback) {
    try {
      const data = await vehicleModel.find();
      if (data.length > 0) {
        callback(null, data);
      } else {
        callback({ status: 404, message: "No vehicle found!" }, null);
      }
    } catch (err) {
      callback({ status: 404, message: "Something went wrong!" }, null);
    }
  }
  async addVehicle(vehicalData, callback) {
    const getLastNumber = await vehicleModel.countDocuments();
    vehicalData = {
      ...vehicalData,
      no: getLastNumber + 1,
    };
    let newVehicle = new vehicleModel(vehicalData);

    await newVehicle
      .save()
      .then((res) => {
        callback(null, res);
      })
      .catch((err) => {
        console.log("error", err);
        callback(
          {
            status: 500,
            message: err?.message,
          },
          null
        );
      });
  }
  async viewSingleVehicle(id, callback) {
    const data = await vehicleModel.findById({ _id: id });
    if (data) {
      callback(null, data);
    } else {
      callback({ status: 404, message: "No record found" });
    }
  }
  async updateVehicle(vehicalId, vehicalData, callback) {
    const data = await vehicleModel.findOneAndUpdate(
      { _id: vehicalId },
      vehicalData,
      { new: true }
    );
    if (data) {
      callback(null, data);
    } else {
      callback({ status: 404, message: "Unable to update the data!" }, null);
    }
  }
  async searchVehicle(searchString, page, limit, callback) {
    try {
      console.log("come ehre");
      let aggregationQuery = [];
      if (!page) page = 1;
      if (!limit) limit = 10;

      if (searchString) {
        const pattern = new RegExp(searchString, "i"); // 'i' flag for case-insensitive search
        aggregationQuery.push({
          $match: {
            $or: [
              {
                no: isNaN(parseInt(searchString))
                  ? null
                  : parseInt(searchString),
              },
              { make: { $regex: pattern } },
              { model: { $regex: pattern } },
              {
                year: isNaN(parseInt(searchString))
                  ? null
                  : parseInt(searchString),
              },
              { status: { $regex: pattern } },
            ],
          },
        });
      }

      aggregationQuery.push({
        $facet: {
          count: [{ $count: "totalVehicals" }],
          list: [
            { $sort: { no: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit },
          ],
        },
      });

      const data = await vehicleModel.aggregate(aggregationQuery);

      callback(null, {
        total: data[0]?.count?.[0]?.totalVehicals || 0,
        list: data[0]?.list || 0,
        page: page,
        limit: limit,
      });
    } catch (error) {
      console.error("Error in Fetching Vechicals:", error);
      callback({ status: 500, message: "Internal Server Error" }, null);
    }
  }
}

module.exports = vehicle;
