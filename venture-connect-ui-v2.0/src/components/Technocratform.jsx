import {useState} from 'react';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileData from '../data_models/profiledata';

export default function Technocratform(props)  {
	const  [companyValue, setCompanyValue] =  useState({});
    const  [designationValue, setDesignationValue] =  useState('');
    const  [domainValue, setDomainValue] =  useState({});
    const  [expertiseValue, setExpertiseValue] =  useState('');
    const  [expdata,setExpData]=useState(0);

	const  handleCompanyChange = (event) => {
		setCompanyValue(event.target.value);
	};

    const  handleDesignationChange = (event) => {
		setDesignationValue(event.target.value);
	};

    const  handleDomainChange = (event) => {
		setDomainValue(event.target.value);
	};

    

    const handleExpertiseChange=(event)=>{
        setExpertiseValue(event.target.value);
    };



    const handleExpChange=(event)=>{
        setExpData(event.target.value);
    };
    
    let send_data_to_parent={
        companyValue,
        designationValue,
        domainValue,
        expertiseValue,
        expdata};
        
    props.func(send_data_to_parent);
 

return  (
  <div>
    
    <Form.Group className="mb-3" controlId="companyName">
    <Form.Label>Company Name</Form.Label>
        <Form.Select className="mb-3"  onChange={handleCompanyChange} aria-label="Default select example">
        {ProfileData.company_data_val.map((item,index)=>(
          <option value={item.id}>{item.name}</option>
        ))}
       </Form.Select>
        </Form.Group>
    <Form.Label>Domain</Form.Label>
     <Form.Select className="mb-3"  onChange={handleDomainChange} aria-label="Default select example">
        {ProfileData.domain_data_val.map((item,index)=>(
          <option value={item.id}>{item.name}</option>
        ))}
       </Form.Select>

    <Form.Group className="mb-3" controlId="designation">
     <Form.Label>Designation</Form.Label>
        <Form.Control type="text" value={designationValue} onChange={handleDesignationChange} placeholder="Eg: Software Engineer, Chief Architect" />
        </Form.Group>
     
    <Form.Group className="mb-3" controlId="formexperience">
     <Form.Label>Years of experience</Form.Label>
        <Form.Control type="number" value={expdata} onChange={handleExpChange} placeholder="Enter years of experience" />
        </Form.Group>


    
        <Form.Group className="mb-3" controlId="areaofexpertise">
     <Form.Label>Area of expertise</Form.Label>
        <Form.Control type="text" value={expertiseValue} onChange={handleExpertiseChange} placeholder="Eg: Back end Developement, Supply chain and logistics" />
        </Form.Group>
    

  </div>
)};
