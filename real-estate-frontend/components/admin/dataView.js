import React from 'react';
// import { useState } from 'react';
import Dashboard from '@/components/admin/dashboard';
import KYCForms from '@/components/admin/kycForms';
import Inbox from '@/components/admin/inbox';
import Help from '@/components/admin/help';
import Setting from '@/components/admin/setting';
import ViewDetails from '@/components/admin/viewDetails';
import axios from 'axios';
import { useState, useEffect } from 'react';


const DataView = ({ data, handleOptionClick }) => {
    {console.log("Selected option",data)}
    {/* {data.map(item => (
      <div key={item.id} className="border-b border-gray-200 py-2">
        <h2 className="text-xl font-bold">{item.title}</h2>
        <p>{item.description}</p>
      </div>
    ))} */}
    const [formDetails, setFormDetails] = useState({
      id: '',
      firstName: '',
      lastName: '',
      date_of_birth: '',
      phoneNumber: '',
      provision: '',
      district: '',
      municipality: '',
      village: '',
      userPhoto: '',
      CFPhoto: '',
      CBPhoto: '',
  });

  const [formId, setFormId] = useState('');

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get("http://localhost:9000/getkycForm", { withCredentials: true });
              setFormDetails(response.data); // Array of properties
              console.log("response", response.data);
          } catch (error) {
              console.error("Error fetching properties:", error);
          }
      };

      fetchData();
  }, []);
    return (
        <>
    <div className='bg-gray-50 w-full flex justify-center items-center'>
        <div className='w-4/5 h-4/5'>
            {data === 'Dashboard' ? <Dashboard /> : (null)}
            {data === 'KYC Forms' ? <KYCForms formDetails= {formDetails} handleOptionClick={handleOptionClick} setFormId={setFormId}/> : (null)}
            {data === 'Inbox' ? <Inbox /> : (null)}
            {data === 'Help' ? <Help /> : (null)}
            {data === 'Settings' ? <Setting /> : (null)}
            {data === 'View Details' ? <ViewDetails params={formId} handleOptionClick={handleOptionClick} setFormDetails={setFormDetails} formDetails={formDetails}/> : (null)}
        </div>
    </div>
  </>
  );
};

export default DataView;
