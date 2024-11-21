import axios from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;

const create = async(data) => {
    try {
        const result = await axios.post(`${BASEURL}/booking-consultation/create`, {data});
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}

const getMyConsultation = async(data) => {
    try {
        const result = await axios.post(`${BASEURL}/booking-consultation/get-my-consultation`, {data});
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}

const getAllConsultation = async(data) => {
    try {
        const result = await axios.post(`${BASEURL}/booking-consultation/get-all`, {data});
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}

export default{
    create,
    getMyConsultation,
    getAllConsultation
}