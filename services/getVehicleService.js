
const axios = require('axios');



const getVehicleServices = async (sidToken) =>{
    try {
      console.log(`welcome to get vehicle service`);
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
      const groupVehicleData = await axios({
          method: 'get',
          url:'https://hst-api.wialon.com/wialon/ajax.html',
          params:{
              svc: 'report/exec_report',
              params: '{"reportResourceId":22542222,"reportTemplateId":1,"reportTemplate":null,"reportObjectId":"22624236","reportObjectSecId":0,"reportObjectIdList":[22616131],"interval":{"from":1710961449,"to":1711047849,"flags":0}}',
              sid: token
          }
      });

      // Fetching result rows
      const vehicleReportData = await axios({
          method: 'get',
          url:'https://hst-api.wialon.com/wialon/ajax.html',
          params:{
              svc: 'report/get_result_rows',
              params: '{"tableIndex":0,"indexFrom":0,"indexTo":100}',
              sid: token
          }
      });

      const vehicleData = vehicleReportData;
      return vehicleData;

      } catch (error) {
        console.error(error); // `error` will be whatever you passed to `reject()` at the top
      }
}
module.exports = {getVehicleServices};