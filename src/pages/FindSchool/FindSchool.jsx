import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TopNav from '../../component/TopNav/TopNav';
import Lines from '../../component/Lines/Lines';
import SchoolCard from '../../component/SchoolCard/SchoolCard';
import CostumeSelect from '../../component/CostumeSelect/CostumeSelect';
import schoolAPI from '../../api/schools';
import areasAPI from '../../api/areas';
import Button from '../../component/Button/Button';

function FindSchool() {
  const location = useLocation();
  const ageLevel = location.state?.ageLevel;
  const schoolType = location.state?.schoolType;
  const [allSchoolData, setAllSchoolData] = useState([]); // State for all fetched school data
  const [filteredSchoolData, setFilteredSchoolData] = useState([]); // State for filtered school data
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of schools per page
  const [allArea, setAllArea] = useState([]);
  const [selectedArea, setSelectedArea] = useState({ value: 0, label: 'All' });

  useEffect(() => {
    getSchoolData();
    getAreaData();
  }, []);

  const getSchoolData = async () => {
    const data = {
      schoolType,
      ageLevel,
    };
    const getSchool = await schoolAPI.findSchools(data);
    if (getSchool.status === 'success') {
      setAllSchoolData(getSchool.data);
      console.log(getSchool.data);
      setFilteredSchoolData(getSchool.data); // Set filtered data to be the same as all data initially
    }
  };

  const getAreaData = async () => {
    const getAreas = await areasAPI.getAllAreas();
    if (getAreas.status === 'success') {
      const getAreasData = getAreas.data;
      const areaArray = [{ value: 0, label: 'All' }];
      getAreasData.forEach((area) => {
        const item = {
          value: area.id,
          label: area.area_name,
        };
        areaArray.push(item);
      });
      setAllArea(areaArray);
    }
  };

  const handleAreaChange = (selectedOption) => {
    setSelectedArea(selectedOption);
    if (selectedOption.value === 0) {
      // If "All" is selected, show all schools
      setFilteredSchoolData(allSchoolData);
    } else {
      // Filter schools based on the selected area's value
      const filteredData = allSchoolData.filter(
        (school) => school.school_area === selectedOption.value
      );
      setFilteredSchoolData(filteredData);
    }
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const currentSchoolData = filteredSchoolData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredSchoolData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Calculate the start and end item numbers for the current page
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredSchoolData.length);

  return (
    <div className=''>
      <TopNav />
      <div className='min-h-screen my-4 mx-10'>
        <p className='font-invisible text-2xl'>Find the Best Schools in Singapore</p>
        <Lines width={'w-28'} />

        <div>
          <div className='bg-white px-4 py-2 rounded-md w-1/2'>
            <p className='font-invisible text-xl'>Filter</p>
            <Lines width={'w-8'} />
            <div>
              <p className='font-invisible'>Area</p>
              <CostumeSelect
                isMulti={false}
                options={allArea}
                value={selectedArea}
                onChange={handleAreaChange}
              />
            </div>
            <div>
              <Button text={'Filter'} />
            </div>
          </div>
        </div>

        <div className='flex flex-row justify-between'>
          <div className='my-4'>
            <p className='font-invisible'>
              Showing {startItem} to {endItem} of {filteredSchoolData.length} Results
            </p>
            <div className='flex flex-row gap-4'>
              <p className='text-xs bg-red-400 text-white px-1 py-1 rounded-md'>{schoolType == 0?'Government School':'International School'}</p>
              <p className='text-xs bg-red-400 text-white px-1 py-1 rounded-md'>{ageLevel == 1 && 'Age 3 - 5'} {ageLevel == 2 && 'Age 6 - 11'} {ageLevel == 3 && 'Age 12 - 16'} {ageLevel == 4 && 'Age 17 - 18'}</p>
              <p className={`text-xs bg-red-400 text-white px-1 py-1 rounded-md ${selectedArea.value == 0 ?'hidden':''}`}>{selectedArea.value != 0?selectedArea.label:''}</p>
            </div>
          </div>
          {/* Pagination controls at the top */}
          <div className='flex justify-end items-center mb-4 gap-4'>
            <Button
              text={'<'}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            <p className='mx-2 font-invisible'>{currentPage} of {totalPages}</p>
            <Button
              text={'>'}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </div>
        </div>

        <div>
          {currentSchoolData.length !== 0 && (
            <>
              {currentSchoolData.map((school, index) => (
                <SchoolCard
                  key={index}
                  schoolId = {schoolType==0?school.school_id:school.id}
                  schoolName={school.school_name}
                  schoolAddress={school.school_address}
                  schoolArea={school.school_area_name}
                  schoolCurriculum={school.school_curriculum}
                  schoolLanguage={school.school_language}
                  schoolType={schoolType}
                  schoolLogo={school.logo}
                />
              ))}
            </>
          )}
        </div>
        {/* Pagination controls at the top */}
        <div className='flex justify-end items-center mb-4 gap-4'>
            <Button
              text={'<'}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            <p className='mx-2 font-invisible'>{currentPage} of {totalPages}</p>
            <Button
              text={'>'}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </div>
      </div>
    </div>
  );
}

export default FindSchool;
