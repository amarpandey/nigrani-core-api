console.log('inside controller');
const getVehicleService = require('../services/getVehicleService');

const getVehicleDetails = async (req, res)=>{
    try{
        console.log('inside getVehicleDetails controller:: ');
        // Calling getVehicle service 
        const userToken = req.query.token;
        const reportFrom = (new Date(req.query.from).getTime() / 1000);
        const reportTo = (new Date(req.query.to).setHours(23, 59) / 1000);
        console.log('token :: '+ userToken);
        console.log('from :: '+ reportFrom);
        console.log('to :: '+ reportTo);
        console.log('reportType :: '+ reportType);

        const vehicleData = await getVehicleService.getVehicleServices(userToken,reportFrom, reportTo, reportType = 'summary-report');
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


