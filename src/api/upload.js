import axios from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;

const uploadLogo = async(data) => {
    const {image, item, school_id} = data;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("item", item);
    formData.append("school_id", school_id);

    try {
        const response = await axios.post(`${BASEURL}/upload/school-logo`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data
      } catch (error) {
        console.error("Error uploading file:", error);
      }
}

export default{
    uploadLogo
}