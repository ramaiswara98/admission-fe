import axios from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;

const getToken = async() => {

}

const createMeeting = async(data) => {
    try{
        const result = await axios.post(BASEURL+'/meeting/create-meetings',{data});
        return result.data;
    }catch(error){
        return error
    }
}

export default{
    getToken,
    createMeeting
}