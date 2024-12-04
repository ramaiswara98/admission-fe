import axios from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;


const getGeoCode = async(data) => {
    try{
        const result = await axios.get(`https://nominatim.openstreetmap.org/search?q=${data.address}&format=json`);
        return result.data;
    }catch(err){
        return err;
    }
}

export default{
    getGeoCode
}