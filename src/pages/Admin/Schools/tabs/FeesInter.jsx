import React, { useEffect, useState } from 'react'

import schoolAPI from '../../../../api/schools'
import CostumeSelect from '../../../../component/CostumeSelect/CostumeSelect'
import FormInput from '../../../../component/FormInput/FormInput'
import Button from '../../../../component/Button/Button'
import Alert from '../../../../component/Alert/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

function FeesInter(props) {
    const school_id = props.id;
    const [term, setTerm] = useState(null)
    const [type, setType] = useState(null)
    const [age, setAge] = useState(null)
    const [grade, setGrade] = useState(null)
    const [price, setPrice] = useState(null)
    const [feesAlert, setFeesAlert] = useState("");
    const [schoolFeesOne, setSchoolFeesOne] = useState([]);
    const [schoolFeesAn, setSchoolFeesAn] = useState([]);

    useEffect(()=> {
        getSchoolFees();
    },[])

    const getSchoolFees = async() => {
        const data = {
            school_id
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


    const onAddFeesClicked = async() => {
        const data = {
            school_id,
            term:term.value,
            type,
            age,
            grade,
            price
        }
        const addFees = await schoolAPI.createSchoolInterFees(data);
        if(addFees.status == "success"){
            getSchoolFees();
            setFeesAlert(<Alert type={"success"} message={"Succesfully add fees"} />)
            setTimeout(()=> {
                setFeesAlert("");
            },3000)
        }else{
            setFeesAlert(<Alert type={"danger"} message={"Failed to add fees, something wrong!"} />)
            setTimeout(()=> {
                setFeesAlert("");
            },3000)
        }
    }

    const onFormChange = (e) => {
        const target = e.target;
        if(target.name == 'type'){
            setType(target.value);
        }

        if(target.name == 'grade'){
            setGrade(target.value);
        }

        if(target.name == 'age'){
            setAge(target.value);
        }

        if(target.name == 'price'){
            setPrice(target.value);
        }
    }

    const onDeleteClicked = async(id) => {
        const data = {
            id
        }
        const deleteFees = await schoolAPI.deleteSchoolInterFees(data);
        if(deleteFees.status == "success"){
            getSchoolFees();
            setFeesAlert(<Alert type={"success"} message={"Succesfully delete fees"} />)
            setTimeout(()=> {
                setFeesAlert("");
            },3000)
        }else{
            setFeesAlert(<Alert type={"danger"} message={"Failed to delete fees, something wrong!"} />)
            setTimeout(()=> {
                setFeesAlert("");
            },3000)
        }
    }
  return (
    <div>
        <p className="font-invisible text-xl mb-8">Fees</p>
        <div>
            <p className='font-invisible'>Term Of Fees</p>
            <CostumeSelect isMulti={false} options={[{value:0,label:'One-Time Fees'},{value:1,label:'Anual Fees'}]} value={term} onChange={setTerm}/>
        </div>
        {term != null && (
            <>
                { term.value == 0 ? (
             <div className='flex flex-row gap-4 items-center'>
             <FormInput label={'Type Of Fees'} name={'type'} value={type} onChange={onFormChange} />
             <FormInput label={'Price'} name={'price'} value={price} onChange={onFormChange} />
             <div>
             <Button text={"Add Fees"} onClick={()=> onAddFeesClicked()} />
             </div>
            </div>
        ):
        (
            <div className='flex flex-row gap-4 items-center'>
            <FormInput label={'Age'} name={'age'} value={age} onChange={onFormChange} />
            <FormInput label={'Grade'} name={'grade'} value={grade} onChange={onFormChange} />
            <FormInput label={'Total Fees'} name={'price'} value={price} onChange={onFormChange} />
            <div>
            <Button text={"Add Fees"} onClick={()=> onAddFeesClicked()}/>
            </div>
            </div>
        )}
            </>
        )}
        {feesAlert}
       <div className='my-4'>
        <p className='font-invisible'>One time Fees</p>
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
                          <th class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            Action
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
                                        <td class="px-4 py-2 border border-gray-300 text-gray-600"><FontAwesomeIcon icon={faTrashCan} className='cursor-pointer' onClick={() => {onDeleteClicked(fees.id)}}/></td>
                                    </tr>
                                )
                            })}
                      </tbody>
                    </table>
                            
       </div>

       <div className='my-4'>
        <p className='font-invisible'>Anually</p>
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
                          <th class="px-4 py-2 text-left border border-gray-300 font-semibold text-gray-700">
                            Action
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
                                        <td class="px-4 py-2 border border-gray-300 text-gray-600"><FontAwesomeIcon icon={faTrashCan} className='cursor-pointer' onClick={() => {onDeleteClicked(fees.id)}} /></td>
                                    </tr>
                                )
                            })}
                      </tbody>
                    </table>
                            
       </div>
       
    </div>
  )
}

export default FeesInter