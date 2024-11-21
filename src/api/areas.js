import axios from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;

const getAllAreas = async() => {
    try {
        const result = await axios.get(`${BASEURL}/areas`);
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}

export default{
    getAllAreas
}