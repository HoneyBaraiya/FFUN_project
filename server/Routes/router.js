const express = require("express");
const router = express.Router();
const vehicleControl = require("../Controller/vehicleControl");

// router.get("/",(req,res)=>{
//     res.send("hello from server")
// })

router.post("/", vehicleControl.addNewVehicle);

router.post("/viewSingleVehicle", vehicleControl.viewSingleVehicle);

router.put("/:id", vehicleControl.updateVehicle);

router.get("/", vehicleControl.fetchVehicalWithSearch);

module.exports = router;
