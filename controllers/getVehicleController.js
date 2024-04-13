console.log('inside controller');
const getVehicleService = require('../services/getVehicleService');

const getVehicleDetails = async (req, res)=>{
    try{
        console.log('inside getVehicleDetails controller:: ');
        // Calling getVehicle service 
        const userToken = req.query.token;
        const reportFrom = req.query.from;
        const reportTo = req.query.to;
        console.log('token :: '+ userToken);
        console.log('from :: '+ new Date(reportFrom).valueOf());
        console.log('to :: '+ new Date(reportTo).valueOf());
        const vehicleData = await getVehicleService.getVehicleServices(userToken, new Date(reportFrom).valueOf(), new Date(reportTo).valueOf());
        res.send(vehicleData);
    }catch(err){
        return err;
    }
    
}

function sortData (data){
    let sortedData;
    {
        sortedData = data.sort(function(a,b){
        return a.x - b.x;
        })
    }
    return sortedData;
}

function inRange(x, min, max) {
    return ((x-min)*(x-max) <= 0);
}


module.exports = getVehicleDetails;


