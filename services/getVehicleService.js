
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
              params: '{"token":"9e582221ad39b510b1c6951d6df5a2a40513B3847580C9B771D0B2EB25462F5D2BBAF337","operateAs":"","appName":"","checkService":""}'
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
              params: '{"reportResourceId":22542222,"reportTemplateId":1,"reportTemplate":null,"reportObjectId":"22616131","reportObjectSecId":0,"reportObjectIdList":[22624236,22624322,22627878,22872953,22880405,22889944,22609985,22618448,22632187,22638873,22678071,22680020, 22704401,22709985,22710261,22717503,22728500,22734282,23826889,23826989],"interval":{"from":'+reportFrom+',"to":'+reportTo+',"flags":0}}',
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
              params: '{"tableIndex":0,"indexFrom":0,"indexTo":3}',
              sid: token
          }
      });

      console.log(resultRowsData.data);

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
           "data": resultRowsData.data
        }
      ];


      const vehicleData = responseData;
      return vehicleData;

      } catch (error) {
        console.error(error); // `error` will be whatever you passed to `reject()` at the top
      }
}
module.exports = {getVehicleServices};