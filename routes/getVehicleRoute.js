console.log('inside route');

const express = require('express');
const router = express.Router();
const getVehicleController = require('../controllers/getVehicleController').default;

router.route("/").get((req, res)=>{
    res.send('Welcome to Nigrani vehicle report service');
});
router.route("/getVehicles").get(getVehicleController)

module.exports = router; 