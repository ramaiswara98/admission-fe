import axios from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;

const getAllUsers = async () => {
    try {
        const result = await axios.get(`${BASEURL}/users`);
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
};

const createNewUser = async (data) => {
    try{
        const result = await axios.post(`${BASEURL}/users`,data);
        return result.data;
    }catch(err){
        return err;
    }
}

const loginUser = async (data) => {
    try{
        const result = await axios.post(`${BASEURL}/users/login`,data);
        return result.data;
    }catch(err){
        return(err);
    }
}

export default {
    getAllUsers,
    createNewUser,
    loginUser
};
