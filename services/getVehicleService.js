
const axios = require('axios');
const { report } = require('process');



const getVehicleServices = async (sidToken, reportFrom, reportTo) =>{
    try {
      console.log(`welcome to get vehicle service ${reportFrom} , ${reportTo}`);
      // return 'hello';
      
      const res = await axios({
          method: 'POST',
          url:'https://hst-api.wialon.com/wialon/ajax.html',
          params:{
              svc: 'token/login',
              params: '{"token":"9e582221ad39b510b1c6951d6df5a2a4ECE871EDFDFE3D78EC0ABC72929B578A4A12DD04","operateAs":"","appName":"","checkService":""}'
          }
      });
      // console.log('Hey wialon');
      // console.log(res.data.eid);
      let token = res.data.eid;
      // return token;
      

      // Making vehicle detail call
      console.log(`welcome to get vehicle data`);
      const vehicleDetails = await axios({
          method: 'get',
          url:'https://hst-api.wialon.com/wialon/ajax.html',
          params:{
              svc: 'report/exec_report',
              params: '{"reportResourceId":22542222,"reportTemplateId":1,"reportTemplate":null,"reportObjectId":"27732669","reportObjectSecId":0,"interval":{"from":1710418433,"to":1710504833,"flags":0}}',
              sid: token
          }
      });

      const resultRows = vehicleDetails.layerCount;
      console.log(resultRows);

      // Fetching result rows
      // Making vehicle detail call
      const resultRowsData = await axios({
          method: 'get',
          url:'https://hst-api.wialon.com/wialon/ajax.html',
          params:{
              svc: 'report/get_result_rows',
              params: '{"tableIndex":0,"indexFrom":0,"indexTo":15}',
              sid: token
          }
      });

      console.log(resultRowsData.data[0].c);

      const responseData = [
        {
           "mapping":[
              "id",
              "group_vehicle",
              "mileage",
              "engine_hours",
              "parkings",
              "cons_fls",
              "kmpl",
              "filled",
              "stolen"
           ]
        },
        {
           "data": resultRowsData.data[0].c
        }
      ];


      const vehicleData = responseData;
      return vehicleData;

      } catch (error) {
        console.error(error); // `error` will be whatever you passed to `reject()` at the top
      }
}
module.exports = {getVehicleServices};