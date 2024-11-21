import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Lines from "../../component/Lines/Lines";
import SchoolDefault from "../../assets/images/school.png";
import TopNav from "../../component/TopNav/TopNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAtlas,
  faChevronCircleDown,
  faChevronCircleUp,
  faEnvelope,
  faGlobe,
  faLocationDot,
  faMapPin,
  faMoneyBill,
  faPhone,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../component/Button/Button";
import schoolAPI from "../../api/schools";
import subjectAPI from "../../api/subject";

function SchoolDetails() {
  const { id, type } = useParams();
  const [psle, setPsle] = useState(false);
  const [subject, setSubject] = useState(false);
  const [elective, setElective] = useState(false);
  const [dsa, setDsa] = useState(false);
  const [coc, setCoc] = useState(false);
  const [special, setSpecial] = useState(false);
  const [curriculum, setCurriculum] = useState(false);
  const [language, setLanguage] = useState(false);
  const [classes, setClasses] = useState(false);
  const [activity, setActivity] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [singapore, setSingapore] = useState(false);
  const [permanent, setPermanent] = useState(false);
  const [asean, setAsean] = useState(false);
  const [nonasean, setNonAsean] = useState(false);
  const [onetime, setOnetime] = useState(false);
  const [anually, setAnually] = useState(false);

  const [schoolBasic, setSchoolBasic] = useState("");
  const [schoolPsle, setSchoolPsle] = useState(null);
  const [schoolSubject, setSchoolSubject] = useState(null);
  const [schoolDsa, setSchoolDsa] = useState(null);
  const [schoolCCA, setSchoolCCA] = useState(null);
  const [schoolElective, setSchoolElective] = useState(null);
  const [schoolCurriculum, setSchoolCurriculum] = useState(null);
  const [schoolLanguage, setSchoolLanguage] = useState(null);
  const [schoolClasses, setSchoolClasses] = useState(null)
  const [schoolActivity, setSchoolActivity] = useState(null);
  const [schoolGovermentFees, setSchoolGovermentFees] = useState(null);
  const [schoolFeesOne, setSchoolFeesOne] = useState([]);
  const [schoolFeesAn, setSchoolFeesAn] = useState([]);
  const [logo, setLogo] = useState(SchoolDefault)

  useEffect(() => {
    getSchoolInfo();
    if (type == 0 || type == "0") {
      getPSLEScore();
      getSubject();
      getDSA();
      getCCA();
      getElective();
      getGovermentFees();
    } else {
      getCurriculumInter();
      getLanguageInter();
      getClassInter();
      getActivityInter();
      getSchoolFees();
    }
  }, [type]);

  const getData = () => {};

  const getSchoolInfo = async () => {
    const getSchool = await schoolAPI.getSchoolsById(id);
    if (getSchool.status == "success") {
      setSchoolBasic(getSchool.data[0]);
    }
  };

  const getPSLEScore = async () => {
    const data = {
      school_id: id,
    };

    const getPSLE = await schoolAPI.getPSLE(data);
    if (getPSLE.status == "success") {
      if (getPSLE.data.length > 0) {
        setSchoolPsle(getPSLE.data[0]);
      }
    }
  };

  const getSubject = async () => {
    const data = {
      school_id: id,
    };
    const getSchoolSubjectData = await subjectAPI.getSchoolSubject(data);
    if (getSchoolSubjectData.status == "success") {
      if (getSchoolSubjectData.data.length > 0) {
        setSchoolSubject(getSchoolSubjectData.data);
      }
    }
  };

  const getDSA = async () => {
    const data = {
      school_id: id,
    };
    const getSchoolDsa = await schoolAPI.getSchoolDSAs(data);
    if (getSchoolDsa.status == "success") {
      if (getSchoolDsa.data.length > 0) {
        setSchoolDsa(getSchoolDsa.data);
      }
    }
  };

  const getCCA = async () => {
    const data = {
      school_id: id,
    };

    const getSchoolCCA = await schoolAPI.getSchoolCCAs(data);
    if (getSchoolCCA.status == "success") {
      if (getSchoolCCA.data.length > 0) {
        setSchoolCCA(getSchoolCCA.data);
      }
    }
  };

  const getElective = async () => {
    const data = {
      id: id,
    };

    const getElectiveData = await schoolAPI.getElectiveSchool(data);
    if (getElectiveData.status == "success") {
      if (getElectiveData.data.length > 0) {
        setSchoolElective(getElectiveData.data);
      }
    }
  };

  const getCurriculumInter = async () => {
    const data = {
      school_id: id,
    };
    const getSchoolCurriculumInterData =
      await schoolAPI.getSchoolCurriculumInter(data);
    if (getSchoolCurriculumInterData.status == "success") {
      if (getSchoolCurriculumInterData.data.length > 0) {
        setSchoolCurriculum(getSchoolCurriculumInterData.data);
      }
    }
  };

  const getLanguageInter = async () => {
    const data = {
        school_id:id
    }

    const getSchoolLanguage = await schoolAPI.getSchoolLanguageInter(data);
    if(getSchoolLanguage.status == "success"){
        if(getSchoolLanguage.data.length > 0){
            setSchoolLanguage(getSchoolLanguage.data);
        }
    }
  }

  const getClassInter = async()=> {
    const data = {
        school_id:id
    }

    const getSchoolClass = await schoolAPI.getSchoolInterClasses(data);
    if(getSchoolClass.status == "success"){
        if(getSchoolClass.data.length > 0){
            setSchoolClasses(getSchoolClass.data);
        }
    }
  }

  const getActivityInter = async()=> {
    const data = {
        school_id:id
    }

    const getSchoolActivity = await schoolAPI.getSchoolInterExtracurricular(data);
    if(getSchoolActivity.status == "success"){
        if(getSchoolActivity.data.length > 0){
            setSchoolActivity(getSchoolActivity.data);
        }
    }
  }

  const getGovermentFees = async () => {
    const data = {
      school_id:id
    }

    const getSchoolFees = await schoolAPI.getSchoolGovermentFees(data);
    if(getSchoolFees.status == "success"){
      if(getSchoolFees.data.length > 0 ){
        setSchoolGovermentFees(getSchoolFees.data[0]);
      }
    }
  }

  const getSchoolFees = async() => {
    const data = {
        school_id:id
    }

    const getInterFees =  await schoolAPI.getSchoolInterFees(data);
    if(getInterFees.status == "success"){
        if(getInterFees.data.length > 0){
            const ann = [];
            const onetime = []
            await getInterFees.data.map((fees, index) => {
                if(fees.term == 0){
                    onetime.push(fees);
                }else{
                    ann.push(fees)
                }
            })
            setSchoolFeesAn(ann);
            setSchoolFeesOne(onetime)
        }
    }
}
  return (
    <div className="">
      <TopNav />
      <div className="bg-white py-4 fixed bottom-0 left-0 w-full flex justify-center">
        <Button text={"Book Consultation"} onClick={()=> {window.location.href = '/bookconsultation/'+id}}/>
      </div>
      <div className="min-h-screen my-4 mx-10 mb-20">
        <div className="flex flex-row gap-4 items-center justify-center">
          <img src={schoolBasic?.logo?schoolBasic.logo:SchoolDefault} className="h-20" />
          <div>
            <p className="font-invisible text-2xl">{schoolBasic.school_name}</p>
            <div className="flex flex-row gap-1 items-center">
              <div>
                <FontAwesomeIcon icon={faLocationDot} className="text-sm" />
              </div>
              <p className="text-xs">{schoolBasic.school_address}</p>
            </div>
          </div>
        </div>

        <div className=" flex flex-row gap-2 justify-center my-4">
          <div className={`w-24 h-18 ${activeTab == 0 ?'bg-red-600':'bg-white'} flex flex-col justify-center items-center rounded-l-md cursor-pointer`} onClick={()=> {setActiveTab(0)}}>
            <FontAwesomeIcon icon={faSchool} className={`w-10 h-10 ${activeTab == 0?'text-white':'text-black'}`} />
            <p className={`font-invisible ${activeTab == 0?'text-white':'text-black'}`}>School Info</p>
          </div>
          <div className={`w-24 h-18 ${activeTab == 1 ?'bg-red-600':'bg-white'} flex flex-col justify-center items-center rounded-r-md cursor-pointer`} onClick={()=> {setActiveTab(1)}}>
            <FontAwesomeIcon
              icon={faMoneyBill}
              className={`w-10 h-10 ${activeTab == 1?'text-white':'text-black'}`}
            />
            <p className={`font-invisible ${activeTab == 1?'text-white':'text-black'}`}>Fees</p>
          </div>
        </div>
        {activeTab == 0 && (
          <div>
          {schoolBasic.school_type == 0 && schoolBasic.school_level != 1 && (
            <>
              <div>
                <p className="font-invisible">Quick Summary of the Schools</p>
                <Lines width={"w-20"} />
              </div>
              <div>
                {schoolPsle != null && (
                  <div
                    className="bg-white px-4 py-4 my-2 cursor-pointer"
                    onClick={() => {
                      setPsle(!psle);
                    }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="font-invisible">
                        PSLE Score Range of {schoolPsle.years}
                      </p>
                      <FontAwesomeIcon
                        icon={psle ? faChevronCircleUp : faChevronCircleDown}
                      />
                    </div>
                    <div className={`${psle ? "" : "hidden"} py-4`}>
                      <table>
                        <thead>
                          <tr>
                            <th></th>
                            <th className="text-center border-black border-2 px-1 py-1 bg-gray-300">
                              Affiliated
                            </th>
                            <th className="text-center border-black border-2 px-1 py-1 bg-gray-300">
                              Non-Affiliated
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th className="text-center border-black border-2 px-1 py-1 bg-gray-300">
                              Posting Group 3
                            </th>
                            <td className="text-center border-black border-2 px-1 py-1">
                              {schoolPsle.af3}-{schoolPsle.at3}
                            </td>
                            <td className="text-center border-black border-2 px-1 py-1">
                              {schoolPsle.nf3}-{schoolPsle.nt3}
                            </td>
                          </tr>
                          <tr>
                            <th className="text-center border-black border-2 px-1 py-1 bg-gray-300">
                              Posting Group 2
                            </th>
                            <td className="text-center border-black border-2 px-1 py-1">
                              {schoolPsle.af2}-{schoolPsle.at2}
                            </td>
                            <td className="text-center border-black border-2 px-1 py-1">
                              {schoolPsle.nf2}-{schoolPsle.nt2}
                            </td>
                          </tr>
                          <tr>
                            <th className="text-center border-black border-2 px-1 py-1 bg-gray-300">
                              Posting Group 1
                            </th>
                            <td className="text-center border-black border-2 px-1 py-1">
                              {schoolPsle.af1}-{schoolPsle.at1}
                            </td>
                            <td className="text-center border-black border-2 px-1 py-1">
                              {schoolPsle.nf1}-{schoolPsle.nt1}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {schoolSubject != null && (
                  <div
                    className="bg-white px-4 py-4 my-2 cursor-pointer"
                    onClick={() => {
                      setSubject(!subject);
                    }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="font-invisible">Subjects Offered</p>
                      <FontAwesomeIcon
                        icon={subject ? faChevronCircleUp : faChevronCircleDown}
                      />
                    </div>
                    <div className={`${subject ? "" : "hidden"} py-4`}>
                      {schoolSubject.length > 0 && 
                      schoolSubject.map((subject, index) => {
                        return (
                          <div
                            key={subject.id}
                            className="flex flex-row gap-1 items-center my-2 mx-2"
                          >
                            <div className="bg-red-600 h-2 w-2 rounded-full"></div>
                            <p className="mx-2">{subject.subject}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div
                  className="bg-white px-4 py-4 my-2 cursor-pointer"
                  onClick={() => {
                    setElective(!elective);
                  }}
                >
                  <div className="flex flex-row justify-between">
                    <p className="font-invisible">Electives and Programmes</p>
                    <FontAwesomeIcon
                      icon={elective ? faChevronCircleUp : faChevronCircleDown}
                    />
                  </div>
                  <div
                    className={`${
                      elective ? "" : "hidden"
                    } py-4 px-2 flex flex-col gap-3`}
                  >
                    <div>
                      <p className="font-invisible px-2 text-lg">
                        Applied Learning Programme (ALP)
                      </p>
                      {schoolElective != null && schoolElective.map((elective, index) => {
                        if (elective.type == 0) {
                          return (
                            <div key={elective.id}>
                              <p className="px-4 font-invisible">
                                {elective.category}
                              </p>
                              <div className="flex flex-row items-center px-6 gap-2">
                                <div className="bg-red-600 h-2 w-2 rounded-full"></div>
                                <p className="">{elective.elective}</p>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div>
                      <p className="font-invisible px-2 text-lg">
                        Learning for Life Programme (LLP)
                      </p>
                      {schoolElective != null && schoolElective.map((elective, index) => {
                        if (elective.type == 1) {
                          return (
                            <div key={elective.id}>
                              <p className="px-4 font-invisible">
                                {elective.category}
                              </p>
                              <div className="flex flex-row items-center px-6 gap-2">
                                <div className="bg-red-600 h-2 w-2 rounded-full"></div>
                                <p className="">{elective.elective}</p>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>

                {schoolDsa != null && (
                  <div
                    className="bg-white px-4 py-4 my-2 cursor-pointer"
                    onClick={() => {
                      setDsa(!dsa);
                    }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="font-invisible">DSA talent areas offered</p>
                      <FontAwesomeIcon
                        icon={dsa ? faChevronCircleUp : faChevronCircleDown}
                      />
                    </div>
                    <div className={`${dsa ? "" : "hidden"} py-4`}>
                      {schoolDsa.map((dsa, index) => {
                        return (
                          <div
                            key={dsa.id}
                            className="flex flex-row gap-1 items-center my-2 mx-2"
                          >
                            <div className="bg-red-600 h-2 w-2 rounded-full"></div>
                            <p className="mx-2">{dsa.talent}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {schoolCCA != null && (
                  <div
                    className="bg-white px-4 py-4 my-2 cursor-pointer"
                    onClick={() => {
                      setCoc(!coc);
                    }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="font-invisible">
                        Co-Curricular Activities(CCAs)
                      </p>
                      <FontAwesomeIcon
                        icon={coc ? faChevronCircleUp : faChevronCircleDown}
                      />
                    </div>
                    <div className={`${coc ? "" : "hidden"} py-4`}>
                      {schoolCCA.map((cca, index) => {
                        return (
                          <div
                            key={cca.id}
                            className="flex flex-row gap-1 items-center my-2 mx-2"
                          >
                            <div className="bg-red-600 h-2 w-2 rounded-full"></div>
                            <p className="mx-2">{cca.ccas}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div
                  className="bg-white px-4 py-4 my-2 cursor-pointer"
                  onClick={() => {
                    setSpecial(!special);
                  }}
                >
                  <div className="flex flex-row justify-between">
                    <p className="font-invisible">
                      Support for special education needs
                    </p>
                    <FontAwesomeIcon
                      icon={special ? faChevronCircleUp : faChevronCircleDown}
                    />
                  </div>
                  <div className={`${special ? "" : "hidden"} py-4`}>
                    <ul>
                      <li>Basic Chinese Language</li>
                      <li>Basic Chinese Language</li>
                      <li>Basic Chinese Language</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {schoolBasic.school_type == 1 && (
            <>
              <div>
                <p className="font-invisible">Quick Summary of the Schools</p>
                <Lines width={"w-20"} />
              </div>
              <div>
                {schoolCurriculum != null && (
                  <div
                    className="bg-white px-4 py-4 my-2 cursor-pointer"
                    onClick={() => {
                      setCurriculum(!curriculum);
                    }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="font-invisible">Curriculum</p>
                      <FontAwesomeIcon
                        icon={
                          curriculum ? faChevronCircleUp : faChevronCircleDown
                        }
                      />
                    </div>
                    <div className={`${curriculum ? "" : "hidden"} py-4`}>
                      {schoolCurriculum.map((curriculum, index) => {
                        return (
                          <div
                            key={curriculum.id}
                            className="flex flex-row gap-1 items-center my-2 mx-2"
                          >
                            <div className="bg-red-600 h-2 w-2 rounded-full"></div>
                            <p className="mx-2">{curriculum.curriculum}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {schoolLanguage != null && (
                  <div
                    className="bg-white px-4 py-4 my-2 cursor-pointer"
                    onClick={() => {
                      setLanguage(!language);
                    }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="font-invisible">Language of Instruction</p>
                      <FontAwesomeIcon
                        icon={
                          language ? faChevronCircleUp : faChevronCircleDown
                        }
                      />
                    </div>
                    <div className={`${language ? "" : "hidden"} py-4`}>
                      {schoolLanguage.map((language, index) => {
                        return (
                          <div
                            key={language.id}
                            className="flex flex-row gap-1 items-center my-2 mx-2"
                          >
                            <div className="bg-red-600 h-2 w-2 rounded-full"></div>
                            <p className="mx-2">{language.language}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {schoolClasses != null && (
                  <div
                    className="bg-white px-4 py-4 my-2 cursor-pointer"
                    onClick={() => {
                      setClasses(!classes);
                    }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="font-invisible">Class Sizes</p>
                      <FontAwesomeIcon
                        icon={
                          classes ? faChevronCircleUp : faChevronCircleDown
                        }
                      />
                    </div>
                    <div className={`${classes ? "" : "hidden"} py-4`}>
                      {schoolClasses.map((classes, index) => {
                        return (
                            <table>
                            <thead>
                              <tr>
                                <th></th>
                                <th className="text-center border-black border-2 px-1 py-1 bg-gray-300">
                                  Students / Class
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th className="text-center border-black border-2 px-1 py-1 bg-gray-300">
                                  Average
                                </th>
                                <td className="text-center border-black border-2 px-1 py-1">
                                  {classes.average}
                                </td>
                              </tr>
                              <tr>
                                <th className="text-center border-black border-2 px-1 py-1 bg-gray-300">
                                  Maximum
                                </th>
                                <td className="text-center border-black border-2 px-1 py-1">
                                  {classes.maximum}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        );
                      })}
                    </div>
                  </div>
                )}


                {schoolActivity != null && (
                  <div
                    className="bg-white px-4 py-4 my-2 cursor-pointer"
                    onClick={() => {
                      setActivity(!activity);
                    }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="font-invisible">Extracurricular Activity</p>
                      <FontAwesomeIcon
                        icon={
                          activity ? faChevronCircleUp : faChevronCircleDown
                        }
                      />
                    </div>
                    <div className={`${activity ? "" : "hidden"} py-4`}>
                      {schoolActivity.map((activity, index) => {
                        return (
                          <div
                            key={activity.id}
                            className="flex flex-col justify-start my-2 mx-2 gap-4"
                          >
                            <div className="flex flex-col">
                            <p className="font-invisible">Extracurricular activities or clubs offered</p>
                            <p className="mx-2">{activity.extracurricular}</p>
                            </div>
                            <div className="flex flex-col">
                            <p className="font-invisible">Sports activities included</p>
                            <p className="mx-2">{activity.sport_activity}</p>
                            </div>
                            <div className="flex flex-col">
                            <p className="font-invisible">Sports teams or sport competitions available for students</p>
                            <p className="mx-2">{activity.sport_team}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}


              </div>
            </>
          )}

          <div className="my-4">
            <p className="font-invisible">Contact</p>
            <Lines width={"w-20"} />
            <div className="flex flex-row gap-2">
              <div className="flex flex-row gap-1 items-center">
                <div className="px-2 py-1 rounded-l-md bg-red-500">
                  <FontAwesomeIcon icon={faPhone} className="text-white" />
                </div>
                <p className="font-invisible px-4 py-1 rounded-r-md bg-red-500 text-white">
                  {schoolBasic.phone}
                </p>
              </div>
              <div
                className="flex flex-row gap-1 items-center cursor-pointer"
                onClick={() =>
                  window.open(`mailto:${schoolBasic.email}`, "_blank")
                }
              >
                <div className="px-2 py-1 rounded-l-md bg-red-500">
                  <FontAwesomeIcon icon={faEnvelope} className="text-white" />
                </div>
                <p className="font-invisible px-4 py-1 rounded-r-md bg-red-500 text-white">
                  {schoolBasic.email}
                </p>
              </div>
              <div
                className="flex flex-row gap-1 items-center cursor-pointer"
                onClick={() => window.open(schoolBasic.website, "_blank")}
              >
                <div className="px-2 py-1 rounded-l-md bg-red-500">
                  <FontAwesomeIcon icon={faGlobe} className="text-white" />
                </div>
                <p className="font-invisible px-4 py-1 rounded-r-md bg-red-500 text-white">
                  {schoolBasic.website}
                </p>
              </div>
            </div>
          </div>

        </div>
        )}

        {activeTab == 1 && type == 0 && (
          <div>
            <div>
                <p className="font-invisible">School Fees {schoolGovermentFees?.years}</p>
                <Lines width={"w-20"} />
            </div>
            <div
                    className="bg-white px-4 py-4 my-2 cursor-pointer"
                    onClick={() => {
                      setSingapore(!singapore);
                    }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="font-invisible">A Singapore Citizen</p>
                      <FontAwesomeIcon
                        icon={
                          singapore ? faChevronCircleUp : faChevronCircleDown
                        }
                      />
                    </div>
                    <div className={`${singapore ? "" : "hidden"} py-4`}>
                    <table class="min-w-full table-auto border-collapse border border-gray-300">
                      <thead class="bg-gray-100">
                        <tr>
                          <th class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            Monthly school fees
                          </th>
                          <td class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            SGD {schoolGovermentFees?.aschool_fees}
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-white">
                          <th class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            Monthly miscellaneous fees
                          </th>
                          <td class="px-4 py-2 border border-gray-300 text-gray-600">
                            SGD {schoolGovermentFees?.amiscellaneous_fees}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    </div>
            </div>

            <div
                    className="bg-white px-4 py-4 my-2 cursor-pointer"
                    onClick={() => {
                      setPermanent(!permanent);
                    }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="font-invisible">A Permanent Resident</p>
                      <FontAwesomeIcon
                        icon={
                          permanent ? faChevronCircleUp : faChevronCircleDown
                        }
                      />
                    </div>
                    <div className={`${permanent ? "" : "hidden"} py-4`}>
                    <table class="min-w-full table-auto border-collapse border border-gray-300">
                      <thead class="bg-gray-100">
                        <tr>
                          <th class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            Monthly school fees
                          </th>
                          <td class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            SGD {schoolGovermentFees?.bschool_fees}
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-white">
                          <th class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            Monthly miscellaneous fees
                          </th>
                          <td class="px-4 py-2 border border-gray-300 text-gray-600">
                            SGD {schoolGovermentFees?.bmiscellaneous_fees}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    </div>
            </div>

            <div
                    className="bg-white px-4 py-4 my-2 cursor-pointer"
                    onClick={() => {
                      setAsean(!asean);
                    }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="font-invisible">an International Student (ASEAN)</p>
                      <FontAwesomeIcon
                        icon={
                          asean ? faChevronCircleUp : faChevronCircleDown
                        }
                      />
                    </div>
                    <div className={`${asean ? "" : "hidden"} py-4`}>
                    <table class="min-w-full table-auto border-collapse border border-gray-300">
                      <thead class="bg-gray-100">
                        <tr>
                          <th class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            Monthly school fees
                          </th>
                          <td class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            SGD {schoolGovermentFees?.cschool_fees}
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-white">
                          <th class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            Monthly miscellaneous fees
                          </th>
                          <td class="px-4 py-2 border border-gray-300 text-gray-600">
                            SGD {schoolGovermentFees?.cmiscellaneous_fees}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    </div>
            </div>

            <div
                    className="bg-white px-4 py-4 my-2 cursor-pointer"
                    onClick={() => {
                      setNonAsean(!nonasean);
                    }}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="font-invisible">an International Student (Non-ASEAN)</p>
                      <FontAwesomeIcon
                        icon={
                          nonasean ? faChevronCircleUp : faChevronCircleDown
                        }
                      />
                    </div>
                    <div className={`${nonasean ? "" : "hidden"} py-4`}>
                    <table class="min-w-full table-auto border-collapse border border-gray-300">
                      <thead class="bg-gray-100">
                        <tr>
                          <th class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            Monthly school fees
                          </th>
                          <td class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            SGD {schoolGovermentFees?.dschool_fees}
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-white">
                          <th class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            Monthly miscellaneous fees
                          </th>
                          <td class="px-4 py-2 border border-gray-300 text-gray-600">
                            SGD {schoolGovermentFees?.dmiscellaneous_fees}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    </div>
            </div>
          </div>
        )}

        {activeTab == 1 && type == 1 && (
          <div>
          <div>
              <p className="font-invisible">School Fees {schoolGovermentFees?.years}</p>
              <Lines width={"w-20"} />
          </div>
          <div
                  className="bg-white px-4 py-4 my-2 cursor-pointer"
                  onClick={() => {
                    setOnetime(!onetime);
                  }}
                >
                  <div className="flex flex-row justify-between">
                    <p className="font-invisible">One Time Fees</p>
                    <FontAwesomeIcon
                      icon={
                        onetime ? faChevronCircleUp : faChevronCircleDown
                      }
                    />
                  </div>
                  <div className={`${onetime ? "" : "hidden"} py-4`}>
                  <table class="min-w-full table-auto border-collapse border border-gray-300">
                      <thead class="bg-gray-100">
                        <tr>
                          <th class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            Type of Fees
                          </th>
                          <th class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            Term
                          </th>
                          <th class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            Price (SGD)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                            {schoolFeesOne?.map((fees, index)=> {
                                return (
                                    <tr key={fees.id}>
                                        <td class="px-4 py-2 border border-gray-300 text-gray-600">{fees.type}</td>
                                        <td class="px-4 py-2 border border-gray-300 text-gray-600">{"One-Time Fees"}</td>
                                        <td class="px-4 py-2 border border-gray-300 text-gray-600">SGD ${fees.price}</td>

                                    </tr>
                                )
                            })}
                      </tbody>
                    </table>

                  </div>
            </div>

            <div
                  className="bg-white px-4 py-4 my-2 cursor-pointer"
                  onClick={() => {
                    setAnually(!anually);
                  }}
                >
                  <div className="flex flex-row justify-between">
                    <p className="font-invisible">Anually</p>
                    <FontAwesomeIcon
                      icon={
                        anually ? faChevronCircleUp : faChevronCircleDown
                      }
                    />
                  </div>
                  <div className={`${anually ? "" : "hidden"} py-4`}>
                  <table class="min-w-full table-auto border-collapse border border-gray-300">
                      <thead class="bg-gray-100">
                        <tr>
                          <th class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            Age
                          </th>
                          <th class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            Grade
                          </th>
                          <th class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            Price (SGD)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                            {schoolFeesAn?.map((fees, index)=> {
                                return (
                                    <tr key={fees.id}>
                                        <td class="px-4 py-2 border border-gray-300 text-gray-600">{fees.age}</td>
                                        <td class="px-4 py-2 border border-gray-300 text-gray-600">{fees.grade}</td>
                                        <td class="px-4 py-2 border border-gray-300 text-gray-600">SGD ${fees.price}</td>
                                    </tr>
                                )
                            })}
                      </tbody>
                    </table>

                  </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default SchoolDetails;
