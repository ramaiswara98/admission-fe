import axios from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;

const getAllSubject = async() => {
    try {
        const result = await axios.get(`${BASEURL}/subject/get-all-subject`
        );
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}

//school_subject
const saveSchoolSubject = async(data) => {
    try {
        const result = await axios.post(`${BASEURL}/subject/save-school-subject`,{data}
        );
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}

const getSchoolSubject = async(data) => {
    try{
        const result = await axios.post(`${BASEURL}/subject/get-school-subject`,{data}
        );
        return result.data; // Assuming you want to return the user data
    }catch(err){
        return err
    }
}

export default {
    getAllSubject,
    saveSchoolSubject,
    getSchoolSubject
}