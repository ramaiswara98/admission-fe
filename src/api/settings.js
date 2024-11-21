import axios from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;

const getSettings = async() => {
    try {
        const result = await axios.get(`${BASEURL}/settings/get`
        );
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}

const saveSettings = async(data) => {
    try {
        const result = await axios.post(`${BASEURL}/settings/save`,{data}
        );
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}


export default{
    getSettings,
    saveSettings
}