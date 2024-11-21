import axios from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;

const createTuition = async(data) => {
    try {
        const result = await axios.post(`${BASEURL}/tuition/create`,{data}
        );
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}

const getByUserId = async(data) => {
    try {
        const result = await axios.post(`${BASEURL}/tuition/get-by-user-id`,{data}
        );
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}

export default {
    createTuition,
    getByUserId
}