import axios from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;

const createPaymentIntent = async(data) => {
    try {
        const result = await axios.post(`${BASEURL}/payment/create-payment-intent`,data);
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}

export default{
    createPaymentIntent
}