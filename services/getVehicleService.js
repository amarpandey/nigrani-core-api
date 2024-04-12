
const axios = require('axios');



const getVehicleServices = async (sidToken) =>{
    try {
      console.log(`welcome to get vehicle service`);
      // return 'hello';
      try{
        const res = await axios({
            method: 'POST',
            url:'https://hst-api.wialon.com/wialon/ajax.html',
            params:{
                svc: 'token/login',
                params: '{"token":"9e582221ad39b510b1c6951d6df5a2a40513B3847580C9B771D0B2EB25462F5D2BBAF337","operateAs":"","appName":"","checkService":""}'
            }
        });
        console.log('Hey wialon');
        console.log(res.data.eid);
        let token = res.data.eid;
        return token;
      } catch (error) {
        console.error(error); // `error` will be whatever you passed to `reject()` at the top
        return error;
      }

        // Making vehicle detail call
        // const vehicleDetails = await axios({
        //     method: 'get',
        //     url:'https://hst-api.wialon.com/wialon/ajax.html',
        //     params:{
        //         svc: 'core/update_data_flags',
        //         params: '{"spec":[{"type":"type","data":"avl_unit","flags":5121,"mode":0}]}',
        //         sid: token
        //     }
        // });
        // const vehicleData = vehicleDetails.data;
        // return vehicleData;

      } catch (error) {
        console.error(error); // `error` will be whatever you passed to `reject()` at the top
      }
}
module.exports = {getVehicleServices};