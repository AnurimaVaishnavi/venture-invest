import {useState} from 'react';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileData from '../data_models/profiledata';

export default function Entrepreneurform(props)  {
	const  [foundedValue, setFoundedValue] =  useState('');
    const  [ventureValue, setVentureValue] =  useState('');
    const  [domainValue, setDomainValue] =  useState({});
    const  [fundingValue, setFundingValue] =  useState({});
    const  [fundingSource, setFundingSource] =  useState(false);
    const  [fundingSourceValue, setFundingSourceValue] =  useState('');
    const  [fundingSourcedata, setFundingSourceData] =  useState('');
    const  [employeedata,setEmployeeData]=useState(0);

	const  handleFoundedChange = (event) => {
		setFoundedValue(event.target.value);
	};

    const  handleVentureChange = (event) => {
		setVentureValue(event.target.value);
	};

    const  handleDomainChange = (event) => {
		setDomainValue(event.target.value);
	};

    const handleFundingChange=(event)=>{
        setFundingValue(event.target.value);
        if(event.target.value=="3"){
         setFundingSource(true);
        }else{
         setFundingSource(false);
        }
    };

    const handleFundingSourceChange=(event)=>{
        setFundingSourceValue(event.target.value);
    };

    const handleFundingSourceDataChange=(event)=>{
        setFundingSourceData(event.target.value);
    };

    const handleemployeeChange=(event)=>{
        setEmployeeData(event.target.value);
    };
    
    let send_data_to_parent={
        foundedValue,
        ventureValue,
        domainValue,
        fundingValue,
        fundingSource,
        fundingSourceValue,
        fundingSourcedata,
        employeedata};
        
    props.func(send_data_to_parent);
 

return  (
  <div>
     <Form.Group className="mb-3" controlId="formFounded">
     <Form.Label>Founded</Form.Label>
        <Form.Control type="date" value={foundedValue} onChange={handleFoundedChange} placeholder="When it was founded?" />
        </Form.Group>
    
    <Form.Group className="mb-3" controlId="formVentureName">
     <Form.Label>Name of the Venture</Form.Label>
        <Form.Control type="text" value={ventureValue} onChange={handleVentureChange} placeholder="Enter your venture name" />
        </Form.Group>

    <Form.Label>Domain of the venture</Form.Label>
        <Form.Select className="mb-3"  onChange={handleDomainChange} aria-label="Default select example">
        {ProfileData.domain_data_val.map((item,index)=>(
          <option value={index}>{item.name}</option>
        ))}
       </Form.Select>
       <div id="r1" className="mb-3">
       {ProfileData.funding_status_val.map((item) => (
        
          <Form.Check
            inline
            label={item.name}
            onChange={handleFundingChange}
            name="group1"
            type="radio"
            value={item.id}
            id={item.id}
          />
       
      ))}

       </div>

       <div id= "r2" className="mb-3">
       {fundingSource && ProfileData.funding_source_val.map((item) => (
        
          <Form.Check
            inline
            label={item.name}
            onChange={handleFundingSourceChange}
            name="group2"
            type="radio"
            value={item.id}
            id={item.id}
          />
       
      ))}
       </div>

       {fundingSourceValue==2 && <Form.Group className="mb-3" controlId="formFundingSourceValue">
     <Form.Label>Name of the Investor</Form.Label>
        <Form.Control type="text" value={fundingSourcedata} onChange={handleFundingSourceDataChange} placeholder="Enter your investor name" />
        </Form.Group>}

       <Form.Group className="mb-3" controlId="formnoOfemployeesValue">
     <Form.Label>Name of the Employees</Form.Label>
        <Form.Control type="number" value={employeedata} onChange={handleemployeeChange} placeholder="Enter number of employees" />
        </Form.Group>
  </div>
)};
