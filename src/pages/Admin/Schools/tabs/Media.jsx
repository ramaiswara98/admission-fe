import React, { useState } from 'react'

import SchoolLogo from '../../../../assets/images/school.png'
import FormInput from '../../../../component/FormInput/FormInput'
import Button from '../../../../component/Button/Button'
import uploadAPI from '../../../../api/upload'
import Alert from '../../../../component/Alert/Alert'

function Media(props) {
    const id=props.id
    const [logo, setLogo] = useState(props.schoolLogo != null ?props.schoolLogo:SchoolLogo);
    const [mediaAlert, setMediaAlrt] = useState('')

  // Function to handle file input change
  const handleFileChange = async(event) => {
    setMediaAlrt(<Alert type={'normal'} message={'Uploading new school logo....'} />)
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async(e) => {
       //setLogo(e.target.result); // Update the logo source
        const data = {
            image:file,
            item:'logo',
            school_id:id
        }
        saveImage(data);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveImage = async(data) => {
    const saveImage = await uploadAPI.uploadLogo(data);
    if(saveImage?.status == "success"){
        setLogo(saveImage.data.url);
        setMediaAlrt(<Alert type={'success'} message={'Successfully changes the school logo'} />)
        setTimeout(()=>{
            setMediaAlrt(null)
        },3000)
    }else{
        setMediaAlrt(<Alert type={'danger'} message={'Failed to changes the school logo, something wrong!'} />)
        setTimeout(()=>{
            setMediaAlrt(null)
        },3000)
    }
  }

  // Function to trigger the file input click
  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };
  return (
    <div>
         <p className="font-invisible text-xl">School Logo</p>
         <div className='flex flex-col gap-4 justify-center'>
            <div>
                {console.log(logo)}
            <img src={logo} className='w-24 h-24'/>
            {mediaAlert}
            </div>
            <Button text={'Change Logo'} onClick={handleButtonClick}/>
            {/* Hidden file input */}
            <input
                type='file'
                id='fileInput'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
         </div>
         <div>

         </div>

    </div>
  )
}

export default Media