import {useState} from 'react';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileData from '../data_models/profiledata';
export default function Companyform(props)  {
    
	const  [companyValue, setCompanyValue] =  useState({});
    const  [domainValue, setDomainValue] =  useState({});
    const  [empdata,setEmpData]=useState(0);

	const  handleCompanyChange = (event) => {
		setCompanyValue(event.target.value);
	};

    const  handleDomainChange = (event) => {
		setDomainValue(event.target.value);
	};

    const handleEmpChange=(event)=>{
        setEmpData(event.target.value);
    };
    
    let send_data_to_parent={
        companyValue,
        domainValue,
        empdata};
        
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
     
    <Form.Group className="mb-3" controlId="formexperience">
     <Form.Label>Number of Employees </Form.Label>
        <Form.Control type="number" value={empdata} onChange={handleEmpChange} placeholder="Enter years of experience" />
        </Form.Group>
    

  </div>
)};
