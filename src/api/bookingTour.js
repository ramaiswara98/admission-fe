import axios from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;

const createBookingTour = async(data) => {
    try{
        const result = await axios.post(BASEURL+'/booking-tour/create', data);
        return result.data
    }catch(err){
        return err;
    }
}

const getBookTourById = async(data)=> {
     try{
        const result = await axios.post(BASEURL+'/booking-tour/get-by-id', data);
        return result.data
    }catch(err){
        return err;
    }
}

export default {
    createBookingTour,
    getBookTourById
}