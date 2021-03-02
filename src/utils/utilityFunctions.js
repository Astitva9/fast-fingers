import axios from 'axios';

export const callApi = async(config) => {
    try {
        if(config){
            const result  = await axios(config);
            return result; 
        }
    } catch (error) {
        if (error.response) {
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
          }
        return error;
    }
}