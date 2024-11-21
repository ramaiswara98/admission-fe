import axios from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;

const createNewSchools = async(data) => {
    try {
        const result = await axios.post(`${BASEURL}/schools/create-schools`,{data});
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}

const getSchoolsById = async(id) => {
    try {
        const result = await axios.post(`${BASEURL}/schools/get-schools-by-id`,{id});
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}

const findSchools = async (data) => {
  try {
    const result = await axios.post(`${BASEURL}/schools/find-schools`, { data }); 
    return result.data;
  } catch (error) {
    return error;
  }
};

const setSchoolContact = async(body) => {
    try {
        const result = await axios.post(`${BASEURL}/schools/set-schools-contact`,{body});
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}

const getSchools = async(data) => {
    try {
        const result = await axios.get(`${BASEURL}/schools/get-schools`,{params:{data}});
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}

const getElectiveList = async() => {
    try {
        const result = await axios.get(`${BASEURL}/schools/get-elective-list`);
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}

const saveSchoolElective = async(data)=> {
    try {
        const result = await axios.post(`${BASEURL}/schools/save-school-elective`, {data});
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}

const getElectiveSchool = async(data) => {
    try {
        const result = await axios.post(`${BASEURL}/schools/get-elective-school`, {data});
        return result.data; // Assuming you want to return the user data
    } catch (err) {
        return err; // Handle error appropriately
    }
}

//PSLE

const savePSLEScore = async(data) => {
    try{
        const result = await axios.post(`${BASEURL}/schools/save-psle-score`, {data});
        return result.data; 
    }catch(error){
        console.log(error)
        return error;
    }
}

const getPSLE = async(data) => {
    try{
        const result = await axios.post(`${BASEURL}/schools/get-psle-score`, {data});
        return result.data; 
    }catch(error){
        console.log(error)
        return error;
    }
}

//ccas
const getCCAsList = async() => {
    try{
        const result = await axios.get(`${BASEURL}/schools/get-ccas-list`);
        return result.data; 
    }catch(error){
        return error;
    } 
}

const saveSchoolCCAs = async(data) => {
    try{
        const result = await axios.post(`${BASEURL}/schools/save-school-ccas`, {data});
        return result.data; 
    }catch(error){
        return error
    }
}

const getSchoolCCAs = async(data) => {
    try{
        const result = await axios.post(`${BASEURL}/schools/get-school-ccas`, {data});
        return result.data; 
    }catch(error){
        return error
    }
}

//DSA

const getDSATalentList = async() => {
    try{
        const result = await axios.get(`${BASEURL}/schools/get-dsa-talent`);
        return result.data; 
    }catch(error){
        return error
    }
}

const saveSchoolDSAs = async (data) => {
    try {
      const result = await axios.post(`${BASEURL}/schools/save-school-dsa`, {data});
      return result.data;
    } catch (error) {
      return error;
    }
  };
  
  const getSchoolDSAs = async (data) => {
    try {
      const result = await axios.post(`${BASEURL}/schools/get-school-dsa`, {data});
      return result.data;
    } catch (error) {
      return error;
    }
  };

  //Curriculum Inter

  const getCurriculumInter = async () => {
    try {
      const result = await axios.get(`${BASEURL}/schools/get-curriculum-inter`);
      return result.data;
    } catch (error) {
      return error;
    }
  };

  const saveSchoolCurriculumInter = async(data) => {
    try {
        const result = await axios.post(`${BASEURL}/schools/save-school-curriculum-inter`, {data});
        return result.data;
      } catch (error) {
        return error;
      }
  }

  const getSchoolCurriculumInter = async(data) => {
    try {
        const result = await axios.post(`${BASEURL}/schools/get-school-curriculum-inter`, {data});
        return result.data;
      } catch (error) {
        return error;
      }
  }

  //Language

  const getLanguageInter = async() => {
    try {
        const result = await axios.get(`${BASEURL}/schools/get-language-inter`);
        return result.data;
      } catch (error) {
        return error;
      }
  }

  const saveSchoolLanguageInter = async (data) => { // Updated function name
    try {
      const result = await axios.post(`${BASEURL}/schools/save-school-language-inter`, { data }); // Updated endpoint
      return result.data;
    } catch (error) {
      return error;
    }
  };
  
  const getSchoolLanguageInter = async (data) => { // Updated function name
    try {
      const result = await axios.post(`${BASEURL}/schools/get-school-language-inter`, { data }); // Updated endpoint
      return result.data;
    } catch (error) {
      return error;
    }
  };

  //School Inter Classes

  const saveSchoolInterClasses = async (data) => { 
    try {
      const result = await axios.post(`${BASEURL}/schools/save-school-inter-classes`, { data }); 
      return result.data;
    } catch (error) {
      return error;
    }
  };
  
  const getSchoolInterClasses = async (data) => {
    try {
      const result = await axios.post(`${BASEURL}/schools/get-school-inter-classes`, { data }); 
      return result.data;
    } catch (error) {
      return error;
    }
  };

    //School Inter Extracurricular

    const saveSchoolInterExtracurricular = async (data) => { 
      try {
        const result = await axios.post(`${BASEURL}/schools/save-school-inter-extracurricular`, { data }); 
        return result.data;
      } catch (error) {
        return error;
      }
    };
    
    const getSchoolInterExtracurricular = async (data) => {
      try {
        const result = await axios.post(`${BASEURL}/schools/get-school-inter-extracurricular`, { data }); 
        return result.data;
      } catch (error) {
        return error;
      }
    };

    const getSchoolGovermentFees = async (data) => {
      try {
        const result = await axios.post(`${BASEURL}/schools/get-school-goverment-fees`, { data }); 
        return result.data;
      } catch (error) {
        return error;
      }
    };

    const saveSchoolGovermentFees = async (data) => {
      try {
        const result = await axios.post(`${BASEURL}/schools/save-school-goverment-fees`, { data }); 
        return result.data;
      } catch (error) {
        return error;
      }
    };

    const createSchoolInterFees = async (data) => {
      try {
        const result = await axios.post(`${BASEURL}/schools/create-school-inter-fees`, { data }); 
        return result.data;
      } catch (error) {
        return error;
      }
    };

    const getSchoolInterFees = async (data) => {
      try {
        const result = await axios.post(`${BASEURL}/schools/get-school-inter-fees`, { data }); 
        return result.data;
      } catch (error) {
        return error;
      }
    };

    const deleteSchoolInterFees = async (data) => {
      try {
        const result = await axios.post(`${BASEURL}/schools/delete-school-inter-fees`, { data }); 
        return result.data;
      } catch (error) {
        return error;
      }
    };
  

export default{
    createNewSchools,
    getSchoolsById,
    setSchoolContact,
    getSchools,
    getElectiveList,
    saveSchoolElective,
    getElectiveSchool,
    savePSLEScore,
    getPSLE,
    getCCAsList,
    saveSchoolCCAs,
    getSchoolCCAs,
    getDSATalentList,
    saveSchoolDSAs,
    getSchoolDSAs,
    getCurriculumInter,
    saveSchoolCurriculumInter,
    getSchoolCurriculumInter,
    getLanguageInter,
    saveSchoolLanguageInter,
    getSchoolLanguageInter,
    saveSchoolInterClasses,
    getSchoolInterClasses,
    saveSchoolInterExtracurricular,
    getSchoolInterExtracurricular,
    findSchools,
    getSchoolGovermentFees,
    saveSchoolGovermentFees,
    getSchoolInterFees,
    createSchoolInterFees,
    deleteSchoolInterFees
}