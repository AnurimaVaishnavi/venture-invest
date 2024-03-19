import {useState} from 'react';
import React from 'react';
import axios from 'axios';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileData from '../data_models/profiledata';

export default function Investorform(props)  {
    const  [investorValue, setInvestorValue] =  useState('');
    const  [domainValue, setDomainValue] =  useState({});
    const  [avldata,setAvlData]=useState(0);
    const  [compdata,setCompData]=useState('');
    const  [compdata_array,setCompDataArray]=useState([]);

    const  handleInvestorChange = (event) => {
		setInvestorValue(event.target.value);
	};

    const  handleDomainChange = (event) => {
		setDomainValue(event.target.value);
	};

    const handleAvlFundingChange=(event)=>{
        setAvlData(event.target.value);
    };

    const handleCompDataChange=(event)=>{
        setCompData(event.target.value);
    };

    function adddata(){
        if(compdata && compdata.length>0 && compdata_array.indexOf(compdata)==-1){
            setCompDataArray((compdata_array) => [...compdata_array, compdata]);            
            setCompData('');
        }else{
            setCompData('');
        }
    }

    function deletedata(e){
        let index_val=e.currentTarget.getAttribute("data-value");
       setCompDataArray(compdata_array.filter(function(item,index){
        return index_val!=index;
       }));
    }
    
    let send_data_to_parent={
        investorValue,
        domainValue,
        avldata,
        compdata_array};
        
    props.func(send_data_to_parent);
 

return  (
  <div>
    
    <Form.Group className="mb-3" controlId="designation">
     <Form.Label>Investor Name</Form.Label>
        <Form.Control type="text" value={investorValue} onChange={handleInvestorChange} placeholder="Enter Investor Name" />
        </Form.Group>

    <Form.Label>Major Investing Domain</Form.Label>
     <Form.Select className="mb-3"  onChange={handleDomainChange} aria-label="Default select example">
        {ProfileData.domain_data_val.map((item,index)=>(
          <option value={item.id}>{item.name}</option>
        ))}
       </Form.Select>

       <Form.Label>Backed startups/companies</Form.Label>
       <Form className="d-flex mb-3">
                  <Form.Control
                    type="text"
                    placeholder="list the backed companies or startups"
                    className="me-2"
                    aria-label="Backed startups"
                    value={compdata}
                    onChange={handleCompDataChange}
                  />
                  <Button variant="outline-dark" onClick={adddata}>Add</Button>
                </Form>

     <ListGroup as="ol" numbered>

      {compdata_array.length>0 && compdata_array.map((item,index)=>(
        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">{item}</div>
        </div>
        <Badge bg="outline-primary" pill>
          <Button data-value= {index} onClick={deletedata}>X</Button>
        </Badge>
      </ListGroup.Item>))}

      </ListGroup>

    <Form.Group className="mb-3" controlId="formexperience">
     <Form.Label>Available Funding (USD)</Form.Label>
        <Form.Control type="number" value={avldata} onChange={handleAvlFundingChange} placeholder="Enter Available funding in USD" />
        </Form.Group>


    
    

  </div>
)};
