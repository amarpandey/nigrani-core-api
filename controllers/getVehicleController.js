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
        console.log('from :: '+ new Date(reportFrom).getTime() / 1000);
        console.log('to :: '+ new Date(reportTo).getTime() / 1000);
        const vehicleData = await getVehicleService.getVehicleServices(userToken, new Date(reportFrom).getTime() / 1000, new Date(reportTo).getTime() / 1000);
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


