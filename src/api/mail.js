import axios from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;


const sendConsultation = async(data) => {
    try{
        const result = await axios.post(BASEURL+'/mail/send-consultation-mail',{data});
        return result.data;
    }catch(err){
        return err;
    }
}

export default{
    sendConsultation
}