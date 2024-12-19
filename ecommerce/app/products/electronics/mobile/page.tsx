'use client';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { FormEvent, useState } from 'react'

interface MobileFromProps {
  addMobile: (mobile : string) => void;
}
const Mobileform: React.FC<MobileFromProps>  = ({addMobile}) => {
  const [mobile , setMobile] = useState('');

  const handleAddMobile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(mobile.trim()){
      addMobile(mobile);
      setMobile('');
    }
  }

  const handleMobileChange = (event: any) => {
    setMobile(event.target.value);
  }
  return (

    <div className='text-center'>
      <form onSubmit={handleAddMobile}>
      <div>
          <h2>Add New Mobiles</h2>
        </div>
        <InputText 
          type="text" 
          value={mobile} 
          onChange={handleMobileChange} 
          placeholder="Enter Mobile Name" 
        />
        <Button label='Add Mobile' type="submit" />
      </form>
    </div>
  )
}

interface MobileListProps {
  mobiles: string[];
}
const MobileList: React.FC<MobileListProps> = ({mobiles}) => {
  return (
    <div data-testid="mobileList">
      {mobiles.map((mobile: any, index: any) => (
        <div key={index}>
          <h3>{mobile}</h3>
        </div>
      ))}
    </div>
  )
}
const MobileComponent: React.FC  = () => {
  const [mobiles, setMobiles] = useState<string[]>([]);

  const addMobile = (mobile: string) => {
    setMobiles((mobiles) => [...mobiles, mobile]);
  }
  return (
    <div className='text-center'>
        <h1>Add Mobile</h1>
        <Mobileform addMobile={addMobile} />
        <MobileList mobiles={mobiles} />
    </div>
  )
}

export default MobileComponent;


