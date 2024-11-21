import React, { useEffect, useState } from "react";
import CostumeSelect from "../../../../component/CostumeSelect/CostumeSelect";
import Button from "../../../../component/Button/Button";
import FormInput from "../../../../component/FormInput/FormInput";
import schoolsAPI from "../../../../api/schools";
import subjectAPI from "../../../../api/subject";
import Alert from "../../../../component/Alert/Alert";

function Acamedic(props) {
  const [eleOption, setEleOptions] = useState([]);
  const [selectedALP, setSelectedALP] = useState([]);
  const [selectedLLP, setSelectedLLP] = useState([]);
  const [subOption, setSubOptions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [subjectAlert, setSubjectAlert] = useState("");
  const [electiveAlert, setElectiveAlert] = useState("");
  const id = props.id;
  const [year, setYear] = useState("");
  const [af3, setAf3] = useState("");
  const [af2, setAf2] = useState("");
  const [af1, setAf1] = useState("");
  const [at3, setAt3] = useState("");
  const [at2, setAt2] = useState("");
  const [at1, setAt1] = useState("");
  const [nf3, setNf3] = useState("");
  const [nf2, setNf2] = useState("");
  const [nf1, setNf1] = useState("");
  const [nt3, setNt3] = useState("");
  const [nt2, setNt2] = useState("");
  const [nt1, setNt1] = useState("");
  const [psleAlert, setPsleAlert] = useState("");

  useEffect(() => {
    getElectiveList();
    getSelectedSubject();
    getSubjectOptions();
    getElectiveSchoolList();
    getPSLE();
  }, []);

  const getElectiveList = async () => {
    const electiveCat = await schoolsAPI.getElectiveList();
    if (electiveCat.status == "success") {
      const listElective = electiveCat.data;
      const elArray = [];
      await listElective.map((items, index) => {
        const data = {
          value: items.id,
          label: items.elective,
        };
        elArray.push(data);
      });
      setEleOptions(elArray);
    } else {
    }
  };

  const getPSLE = async () => {
    const data = {
      school_id: id,
    };
    const PLSELIST = await schoolsAPI.getPSLE(data);
    if (PLSELIST.status == "success") {
      const PSLE = PLSELIST.data;
      if (PSLE.length > 0) {
        setYear(PSLE[0].years);
        setAf3(PSLE[0].af3);
        setAf2(PSLE[0].af2);
        setAf1(PSLE[0].af1);
        setNf3(PSLE[0].nf3);
        setNf2(PSLE[0].nf2);
        setNf1(PSLE[0].nf1);
        setAt3(PSLE[0].at3);
        setAt2(PSLE[0].at2);
        setAt1(PSLE[0].at1);
        setNt3(PSLE[0].nt3);
        setNt2(PSLE[0].nt2);
        setNt1(PSLE[0].nt1);
      } else {
      }
    } else {
    }
  };

  const getElectiveSchoolList = async () => {
    const data = {
      id: id,
    };
    const electiveList = await schoolsAPI.getElectiveSchool(data);
    if (electiveList.status == "success") {
      const ALP = [];
      const LLP = [];
      await electiveList.data.map((elective, index) => {
        const data = {
          value: elective.elective_id,
          label: elective.elective,
        };
        if (elective.type == 0) {
          ALP.push(data);
        } else {
          LLP.push(data);
        }
      });
      setSelectedALP(ALP);
      setSelectedLLP(LLP);
    } else {
    }
  };

  const getSubjectOptions = async () => {
    const subjectReq = await subjectAPI.getAllSubject();
    if (subjectReq.status == "success") {
      const subjectList = subjectReq.data;
      const subjectOptions = [];
      await subjectList.map((subject, index) => {
        const sObj = {
          value: subject.id,
          label: subject.subject,
        };
        subjectOptions.push(sObj);
      });
      setSubOptions(subjectOptions);
    } else {
    }
  };

  const getSelectedSubject = async () => {
    const data = {
      school_id: id,
    };
    const selSubject = await subjectAPI.getSchoolSubject(data);
    if (selSubject.status == "success") {
      const subArray = [];
      const subList = selSubject.data;
      await subList.map((subject, index) => {
        const item = {
          value: subject.subject_id,
          label: subject.subject,
        };
        subArray.push(item);
      });
      setSelectedSubject(subArray);
    } else {
    }
  };

  const onSaveSubjectClicked = async () => {
    const data = {
      school_id: id,
      subjects: selectedSubject,
    };
    const saveSubject = await subjectAPI.saveSchoolSubject(data);

    if (saveSubject.status == "success") {
      setSubjectAlert(
        <Alert type="success" message={"Subject Successfully Saved"} />
      );
      setTimeout(() => {
        // Code to be executed after 3 seconds
        setSubjectAlert("");
      }, 3000);
    } else {
      setSubjectAlert(
        <Alert
          type="danger"
          message={"Failed to save subject, something wrong"}
        />
      );
      setTimeout(() => {
        // Code to be executed after 3 seconds
        setSubjectAlert("");
      }, 3000);
    }
  };

  const saveElectivePrograms = async () => {
    const data = {
      id,
      ALP: selectedALP,
      LLP: selectedLLP,
    };
    const schoolElective = await schoolsAPI.saveSchoolElective(data);
    if (schoolElective.status == "success") {
      setElectiveAlert(
        <Alert type="success" message={"Successfully save Elective Programs"} />
      );
      setTimeout(() => {
        // Code to be executed after 3 seconds
        setElectiveAlert("");
      }, 3000);
    } else {
      <Alert
        type="danger"
        message={"Failed to save Elective Programs, something wrong"}
      />;
      setTimeout(() => {
        // Code to be executed after 3 seconds
        setElectiveAlert("");
      }, 3000);
    }
  };

  const onPSLECHANGE = (e) => {
    const form = e.target;
    if (form.name == "years") {
      setYear(form.value);
    }
    if (form.name == "af3") {
      setAf3(form.value);
    }
    if (form.name == "af2") {
      setAf2(form.value);
    }
    if (form.name == "af1") {
      setAf1(form.value);
    }
    if (form.name == "at3") {
      setAt3(form.value);
    }
    if (form.name == "at2") {
      setAt2(form.value);
    }
    if (form.name == "at1") {
      setAt1(form.value);
    }
    if (form.name == "nf3") {
      setNf3(form.value);
    }
    if (form.name == "nf2") {
      setNf2(form.value);
    }
    if (form.name == "nf1") {
      setNf1(form.value);
    }
    if (form.name == "nt3") {
      setNt3(form.value);
    }
    if (form.name == "nt2") {
      setNt2(form.value);
    }
    if (form.name == "nt1") {
      setNt1(form.value);
    }
  };

  const savePSLEScore = async () => {
    const data = {
      school_id: id,
      year,
      af3,
      af2,
      af1,
      at1,
      at2,
      at3,
      nf3,
      nf2,
      nf1,
      nt1,
      nt2,
      nt3,
    };
    const psle = await schoolsAPI.savePSLEScore(data);
    if (psle.status == "success") {
      setPsleAlert(
        <Alert type={"success"} message={"Successfuly save PSLE score"} />
      );
      setTimeout(() => {
        // Code to be executed after 3 seconds
        setPsleAlert("");
      }, 3000);
    } else {
      setPsleAlert(
        <Alert
          type={"danger"}
          message={"Failed to save PSLE score, something wrong"}
        />
      );
      setTimeout(() => {
        // Code to be executed after 3 seconds
        setPsleAlert("");
      }, 3000);
    }
  };
  return (
    <div className="my-4 flex flex-row justify-start gap-24">
      <div>
        <p className="font-invisible text-xl">Subject</p>
        <CostumeSelect
          options={subOption}
          onChange={setSelectedSubject}
          value={selectedSubject}
          isMulti={true}
        />
        <div className="my-2">{subjectAlert}</div>

        <Button
          text={"Save Academic Info"}
          onClick={() => {
            onSaveSubjectClicked();
          }}
        />

        <div className="mt-24">
          <p className="font-invisible text-xl">Elective Programs</p>
          <div>
            <p className="font-invisible">Applied Learning Programme (ALP)</p>
            <CostumeSelect
              isMulti={true}
              options={eleOption}
              value={selectedALP}
              onChange={setSelectedALP}
            />
          </div>
          <div>
            <p className="font-invisible">Learning for Life Programme (LLP)</p>
            <CostumeSelect
              isMulti={true}
              options={eleOption}
              value={selectedLLP}
              onChange={setSelectedLLP}
            />
          </div>
          <div>{electiveAlert}</div>
          <Button
            text="Save Elective Programs"
            onClick={() => {
              saveElectivePrograms();
            }}
          />
        </div>
      </div>
      <div>
        <p className="font-invisible text-xl">PSLE Score</p>
        <FormInput
          label={"Year"}
          name="years"
          onChange={onPSLECHANGE}
          value={year}
        />
        <div className="flex flex-col gap-3 border-b-2 mb-2">
          <p className="font-invisible">Posting Group 3</p>
          <div className="flex flex-row">
            <div>
              <p className="font-invisible text-lg">Afiliated</p>
              <div className="flex flex-row gap-2 w-48">
                <FormInput
                  type={"number"}
                  label={"From"}
                  width={"w-20"}
                  name={"af3"}
                  value={af3}
                  onChange={onPSLECHANGE}
                />
                <FormInput
                  type={"number"}
                  label={"To"}
                  width={"w-20"}
                  name={"at3"}
                  value={at3}
                  onChange={onPSLECHANGE}
                />
              </div>
            </div>
            <div>
              <p className="font-invisible text-lg">Non-Afiliated</p>
              <div className="flex flex-row gap-2 w-48">
                <FormInput
                  type={"number"}
                  label={"From"}
                  width={"w-20"}
                  name={"nf3"}
                  value={nf3}
                  onChange={onPSLECHANGE}
                />
                <FormInput
                  type={"number"}
                  label={"To"}
                  width={"w-20"}
                  name={"nt3"}
                  value={nt3}
                  onChange={onPSLECHANGE}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-b-2 mb-2">
          <p className="font-invisible">Posting Group 2</p>
          <div className="flex flex-row">
            <div>
              <p className="font-invisible text-lg">Afiliated</p>
              <div className="flex flex-row gap-2 w-48">
                <FormInput
                  type={"number"}
                  label={"From"}
                  width={"w-20"}
                  name={"af2"}
                  value={af2}
                  onChange={onPSLECHANGE}
                />
                <FormInput
                  type={"number"}
                  label={"To"}
                  width={"w-20"}
                  name={"at2"}
                  value={at2}
                  onChange={onPSLECHANGE}
                />
              </div>
            </div>
            <div>
              <p className="font-invisible text-lg">Non-Afiliated</p>
              <div className="flex flex-row gap-2 w-48">
                <FormInput
                  type={"number"}
                  label={"From"}
                  width={"w-20"}
                  name={"nf2"}
                  value={nf2}
                  onChange={onPSLECHANGE}
                />
                <FormInput
                  type={"number"}
                  label={"To"}
                  width={"w-20"}
                  name={"nt2"}
                  value={nt2}
                  onChange={onPSLECHANGE}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-b-2 mb-2">
          <p className="font-invisible">Posting Group 1</p>
          <div className="flex flex-row">
            <div>
              <p className="font-invisible text-lg">Afiliated</p>
              <div className="flex flex-row gap-2 w-48">
                <FormInput
                  type={"number"}
                  label={"From"}
                  width={"w-20"}
                  name={"af1"}
                  value={af1}
                  onChange={onPSLECHANGE}
                />
                <FormInput
                  type={"number"}
                  label={"To"}
                  width={"w-20"}
                  name={"at1"}
                  value={at1}
                  onChange={onPSLECHANGE}
                />
              </div>
            </div>
            <div>
              <p className="font-invisible text-lg">Non-Afiliated</p>
              <div className="flex flex-row gap-2 w-48">
                <FormInput
                  type={"number"}
                  label={"From"}
                  width={"w-20"}
                  name={"nf1"}
                  value={nf1}
                  onChange={onPSLECHANGE}
                />
                <FormInput
                  type={"number"}
                  label={"To"}
                  width={"w-20"}
                  name={"nt1"}
                  value={nt1}
                  onChange={onPSLECHANGE}
                />
              </div>
            </div>
          </div>
        </div>
        {psleAlert}
        <Button
          text={"Save PSLE Score"}
          onClick={() => {
            savePSLEScore();
          }}
        />
      </div>
    </div>
  );
}

export default Acamedic;
