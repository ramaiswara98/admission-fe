import React, { useEffect, useState } from 'react'


import FormInput from '../../../../component/FormInput/FormInput'
import Button from '../../../../component/Button/Button'
import schoolAPI from '../../../../api/schools'
import Alert from '../../../../component/Alert/Alert'
import Lines from '../../../../component/Lines/Lines'

function Fees(props) {
    const school_id=props.id
    const [aschoolFees, setASchoolFees] = useState('');
    const [amiscellaneousFees, setAMiscellaneousFees] = useState('');
    const [bschoolFees, setBSchoolFees] = useState('');
    const [bmiscellaneousFees, setBMiscellaneousFees] = useState('');
    const [cschoolFees, setCSchoolFees] = useState('');
    const [cmiscellaneousFees, setCMiscellaneousFees] = useState('');
    const [dschoolFees, setDSchoolFees] = useState('');
    const [dmiscellaneousFees, setDMiscellaneousFees] = useState('');
    const [years, setYears] = useState('');
    const [feesAlert, setFeesAlert] = useState('');

    useEffect(()=> {
        getSchoolFees();
    },[])


    const getSchoolFees = async () => {
        const data ={
            school_id
        }
        const getSchoolGFees = await schoolAPI.getSchoolGovermentFees(data)
        if(getSchoolGFees.status == "success"){
            if(getSchoolGFees.data.length > 0){
                const schoolFeesData = getSchoolGFees.data[0];
                setASchoolFees(schoolFeesData.aschool_fees);
                setAMiscellaneousFees(schoolFeesData.amiscellaneous_fees);
                setBSchoolFees(schoolFeesData.bschool_fees);
                setBMiscellaneousFees(schoolFeesData.bmiscellaneous_fees);
                setCSchoolFees(schoolFeesData.cschool_fees);
                setCMiscellaneousFees(schoolFeesData.cmiscellaneous_fees);
                setDSchoolFees(schoolFeesData.dschool_fees);
                setDMiscellaneousFees(schoolFeesData.dmiscellaneous_fees);
                setYears(schoolFeesData.years);
            }
        }
    }

    const onChange = (e) => {
        const target = e.target;
        if(target.name == 'a-school-fees'){
            setASchoolFees(target.value);
        }

        if(target.name == 'a-miscellaneous-fees'){
            setAMiscellaneousFees(target.value);
        }

        if(target.name == 'b-school-fees'){
            setBSchoolFees(target.value);
        }

        if(target.name == 'b-miscellaneous-fees'){
            setBMiscellaneousFees(target.value);
        }

        if(target.name == 'c-school-fees'){
            setCSchoolFees(target.value);
        }

        if(target.name == 'c-miscellaneous-fees'){
            setCMiscellaneousFees(target.value);
        }

        if(target.name == 'd-school-fees'){
            setDSchoolFees(target.value);
        }

        if(target.name == 'd-miscellaneous-fees'){
            setDMiscellaneousFees(target.value);
        }

        if(target.name == 'years'){
            setYears(target.value);
        }
    }

    const onSaveButtonClick = async() => {
        const data = {
            school_id,
            aschool_fees:aschoolFees,
            amiscellaneous_fees:amiscellaneousFees,
            bschool_fees:bschoolFees,
            bmiscellaneous_fees:bmiscellaneousFees,
            cschool_fees:cschoolFees,
            cmiscellaneous_fees:cmiscellaneousFees,
            dschool_fees:dschoolFees,
            dmiscellaneous_fees:dmiscellaneousFees,
            years
        }
        const saveFees = await schoolAPI.saveSchoolGovermentFees(data);
        if(saveFees.status == "success"){
            setFeesAlert(<Alert type={"success"} message={"Successfully saved school fees"}/>)
            setTimeout(()=> {
                setFeesAlert('')
            },3000)
        }else{
            setFeesAlert(<Alert type={"danger"} message={"Failed to saved school fees, something wrong!"}/>)
            setTimeout(()=> {
                setFeesAlert('')
            },3000)
        }

    }
  return (
    <div>
        <p className="font-invisible text-xl">Fees</p>
        <FormInput type={"number"} label={"Years"} width={'w-30'} name={'years'} value={years} onChange={onChange} />
        <div className='my-4'>
            <p className="font-invisible text-xl">a Singapore Citizen</p>
            <Lines width={'w-10'}/>
            <div className='flex flex-row gap-2'>
            <FormInput type={"text"} label={"Monthly school fees"} width={'w-30'} currency={"SGD"} name={'a-school-fees'} value={aschoolFees} onChange={onChange}  />
            <FormInput type={"text"} label={"Monthly miscellaneous fees"} width={'w-30'} currency={"SGD"} name={'a-miscellaneous-fees'} value={amiscellaneousFees} onChange={onChange}  />
            </div>
        </div>

        <div className='my-4'>
            <p className="font-invisible text-xl">a Permanent Resident</p>
            <Lines width={'w-10'}/>
            <div className='flex flex-row gap-2'>
            <FormInput type={"text"} label={"Monthly school fees"} width={'w-30'} currency={"SGD"} name={'b-school-fees'} value={bschoolFees} onChange={onChange}  />
            <FormInput type={"text"} label={"Monthly miscellaneous fees"} width={'w-30'} currency={"SGD"} name={'b-miscellaneous-fees'} value={bmiscellaneousFees} onChange={onChange}  />
            </div>
        </div>

        <div className='my-4'>
            <p className="font-invisible text-xl">an International Student (ASEAN)</p>
            <Lines width={'w-10'}/>
            <div className='flex flex-row gap-2'>
            <FormInput type={"text"} label={"Monthly school fees"} width={'w-30'} currency={"SGD"} name={'c-school-fees'} value={cschoolFees} onChange={onChange}  />
            <FormInput type={"text"} label={"Monthly miscellaneous fees"} width={'w-30'} currency={"SGD"} name={'c-miscellaneous-fees'} value={cmiscellaneousFees} onChange={onChange}  />
            </div>
        </div>

        <div className='my-4'>
            <p className="font-invisible text-xl">an International Student (non-ASEAN)</p>
            <Lines width={'w-10'}/>
            <div className='flex flex-row gap-2'>
            <FormInput type={"text"} label={"Monthly school fees"} width={'w-30'} currency={"SGD"} name={'d-school-fees'} value={dschoolFees} onChange={onChange}  />
            <FormInput type={"text"} label={"Monthly miscellaneous fees"} width={'w-30'} currency={"SGD"} name={'d-miscellaneous-fees'} value={dmiscellaneousFees} onChange={onChange}  />
            </div>
        </div>
        

        {feesAlert}
        <Button text={'Save Fees'} onClick={()=> {onSaveButtonClick()}}/>
    </div>
  )
}

export default Fees