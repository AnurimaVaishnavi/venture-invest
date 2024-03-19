import {useState} from 'react';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Layout from '../src/components/Layout';
import Entrepreneurform from '../src/components/Entrepreneurform';
import Technocratform from '../src/components/Technocratform';
import Investorform from '../src/components/Investorform';
import Companyform from '../src/components/Companyform';
import Managementform from '../src/components/Managementform';
import ProfileData from '../src/data_models/profiledata';
import API_ENDPOINTS  from '../src/utils/api.ts';
import { ToastContainer, toast } from "react-toastify";
import toastOptions from "../src/utils/toastOptions";
import { useRouter } from "next/router";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

export default function  SignUp()  {
  const history=useRouter();
	const  [inputValue, setInputValue] =  useState('');
  const [userType,setUserType]=useState(1);
  const [file, setFile] = useState(null);
  const [filedata, setFileData] = useState(null);
  const[email,setEmail]=useState();
  const[password,setPassword]=useState();
  const[ConfirmPassword,setConfirmPassword]=useState();
  const[username,setUsername]=useState();
  const [error, setError] = useState(null);
  const [perror, setPerror] = useState(null);
  var entre_data={},techno_data={},investor_data={},company_data={},management_data={};
  let flag = 0;
    function getseeded_obj_value(param,data){
      let result={};
      data.forEach(function(record){
        if(record.id==param){
          result= record;
        }
      });
      return result;
    }

    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }
  
    function emailvalidation(email) {
      if (!isValidEmail(email)) {
        setError('Email is invalid');
      } else {
        setError(null);
      }
    }

    function handleemail(e){
      if(e && e.target.value){
        setEmail(e.target.value);
      }
      emailvalidation(e.target.value);
    }

    function passwordvalidation(param) {
      if (param != password) {
        flag = 1;
        setPerror('Password and confirm password does not match');
      } else {
        setPerror(null);
        flag = 0;
      }
    }


    function handlepassword(e){
      if(e && e.target.value){
        setPassword(e.target.value);
      }
    }

    function handleusername(e){
      if(e && e.target.value){
        setUsername(e.target.value);
      }
    }

    async function handleUpload(e) {
        if(e && e.target && e.target.files &&e.target.files[0] ){
          setFile(URL.createObjectURL(e.target.files[0]));
          setFileData(e.target.files[0]);
          let blob = await fetch(file).then(r => r.blob());
          console.log(blob);
        }
       
    }

	const  handleChange = (event) => {
		setInputValue(event.target.value);
	};

  
  const save = (event) => {
	event.preventDefault();
		const form_obj = {};
      form_obj.emailid=email?email:"";
      form_obj.password=password?password:"";
      form_obj.username=username?username:"";
      form_obj.userType=getseeded_obj_value(parseInt(userType),ProfileData.user_data_val);
      form_obj.profileImage=file?file:""
      form_obj.profileAlt=form_obj.profileImage?"":form_obj.username.substring(0,2);
      form_obj.founded=entre_data.foundedValue;
      form_obj.filename=filedata?filedata:"";
      if(entre_data && !(JSON.stringify(entre_data) === '{}')){
        form_obj.ventureName=entre_data.ventureValue;
        form_obj.ventureDomain=getseeded_obj_value(parseInt(entre_data.domainValue),ProfileData.domain_data_val);
        form_obj.investorName=entre_data.fundingSourcedata
        form_obj.NumberOfEmployees=entre_data.employeedata
        form_obj.ventureStatus=getseeded_obj_value(parseInt(entre_data.fundingValue),ProfileData.funding_status_val);
        form_obj.fundingstatus=get_technocrat_data(parseInt(entre_data.fundingSourceValue),ProfileData.funding_source_val);
      }else if(techno_data && !(JSON.stringify(techno_data) === '{}')){
        form_obj.ventureDomain=getseeded_obj_value(parseInt(techno_data.domainValue),ProfileData.domain_data_val);
        form_obj.companyName=getseeded_obj_value(parseInt(techno_data.companyValue),ProfileData.company_data_val);
        form_obj.yearsOfExp=techno_data.expdata?techno_data.expdata:0;
        form_obj.designation=techno_data.designationValue?techno_data.designationValue:"";
        form_obj.AreaofExp=techno_data.expertiseValue?techno_data.expertiseValue:"";
      }else if(investor_data && !(JSON.stringify(investor_data) === '{}')){
        form_obj.investorName=investor_data.investorValue?investor_data.investorValue:"";
        form_obj.MajorInvestingDomain=getseeded_obj_value(parseInt(investor_data.domainValue),ProfileData.domain_data_val);
        form_obj.BackedComp=investor_data.compdata_array?investor_data.compdata_array:[];
        form_obj.AvailableFunding=investor_data.avldata?investor_data.avldata:0;
      }else if(company_data && !(JSON.stringify(company_data) === '{}')){
        form_obj.companyName=getseeded_obj_value(parseInt(company_data.companyValue),ProfileData.company_data_val);
        form_obj.ventureDomain=getseeded_obj_value(parseInt(company_data.domainValue),ProfileData.domain_data_val);
        form_obj.NumberOfEmployees=company_data.empdata
      }else if(management_data && !(JSON.stringify(management_data) === '{}')){
        form_obj.ventureDomain=getseeded_obj_value(parseInt(management_data.domainValue),ProfileData.domain_data_val);
        form_obj.companyName=getseeded_obj_value(parseInt(management_data.companyValue),ProfileData.company_data_val);
        form_obj.yearsOfExp=management_data.expdata?management_data.expdata:0;
        form_obj.designation=management_data.designationValue?management_data.designationValue:"";
        form_obj.AreaofExp=management_data.expertiseValue?management_data.expertiseValue:"";
      }

      const formData= new FormData();
      let saveOptions=false;
    if(filedata instanceof File) {
        formData.append('file', filedata);
        saveOptions=true;
      } else {
        // Handle the case where form_obj.profileImage is not a File (e.g., it could be a string)
        console.error('Invalid profileImage format:', form_obj.profileImage);
      }
      
		  const csrftoken = getCookie('csrftoken');
		  const config = {
			headers: {	
        'Content-Type': 'multipart/form-data'
			  
			}
		  };
	  if(saveOptions){
      axios.post(API_ENDPOINTS.PROFILEPICUPLOAD,formData).then(function(response){
        if(response && response.data && response.data.length>0){
          form_obj.profileImage=response.data[0].filename;
  
          axios.post(API_ENDPOINTS.SIGNUP,form_obj).then(function(response){
            if(response){
              toast.success("Signed up successfully!!", toastOptions);
              history.push("/SignIn");
            }else{
              toast.error("Sign up failed!!", toastOptions);
            }
           
          })
        }
      })
    }else{
      axios.post(API_ENDPOINTS.SIGNUP,form_obj).then(function(response){
        if(response){
          toast.success("Signed up successfully!!", toastOptions);
          history.push("/SignIn");
        }else{
          toast.error("Sign up failed!!", toastOptions);
        }
       
      })

    }

		// axios.post(API_ENDPOINTS.PROFILEPICUPLOAD,formData).then(function(response){
    //   if(response && response.data && response.data.length>0){
    //     form_obj.profileImage=response.data[0].filename;

    //     axios.post(API_ENDPOINTS.SIGNUP,form_obj).then(function(response){
    //       if(response){
    //         toast.success("Signed up successfully!!", toastOptions);
    //         history.push("/SignIn");
    //       }else{
    //         toast.error("Sign up failed!!", toastOptions);
    //       }
         
    //     })
    //   }
		// })
	};


	function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}
  
  function getUserTypeData(event){
    if(event.target.value){
      setUserType(event.target.value)
    }
  }
  const get_entrepreneur_data= (data)=>{
    
    entre_data=data;
    console.log(entre_data);
  }

  const get_technocrat_data= (data)=>{
    techno_data=data;
    console.log(techno_data);
  }

  const get_investor_data= (data)=>{
    investor_data=data;
    console.log(investor_data);
  }

  const get_company_data= (data)=>{
    company_data=data;
    console.log(company_data);
  }

  const get_management_data= (data)=>{
    management_data=data;
    console.log(management_data);
  }
	
return  (
  <Layout>

  <div>
<Stack className="col-md-5 mx-auto">
<Form>
      
<h2 className="text-center"><b>Sign Up</b></h2>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleemail}/>
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
         {error && <p className="text-danger">{error}</p>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formUserName">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username"  onChange={handleusername} autoComplete="off" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formuploaddata">
        <Form.Label>Choose your profile pic</Form.Label>
        <Form.Control type="file" placeholder="upload your pic"  onChange={handleUpload}/>
        <img id ="uploadimg"src={file} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" autoComplete='new-password' onChange={handlepassword}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Confirm Password</Form.Label>
  <div className="d-flex align-items-center"> {/* Use a flex container to align items */}
    <Form.Control
      type="password"
      placeholder="Confirm Password"
      onChange={e => {
        setConfirmPassword(e.target.value);
        passwordvalidation(e.target.value);
      }}
    />&nbsp;
   
    {ConfirmPassword && ConfirmPassword.length > 0 && !perror && (
      <CheckCircleOutlineOutlinedIcon style={{ color: 'green' }} />
    )}
  </div>
  {perror && <Form.Text style={{ color: 'red' }}>{perror}</Form.Text>}
</Form.Group>

       <Form.Label>Who you are?</Form.Label>
        <Form.Select className="mb-3" onChange={getUserTypeData} aria-label="Default select example">
        {ProfileData.user_data_val.map((item,index)=>(
          <option value={item.id}>{item.name}</option>
        ))}
       </Form.Select>
       {userType=="1" && <Entrepreneurform func={get_entrepreneur_data}></Entrepreneurform>}
       {userType=="2" && <Technocratform  func={get_technocrat_data}></Technocratform>}
       {userType=="3" && <Investorform  func={get_investor_data}></Investorform>}
       {userType=="4" && <Companyform func={get_company_data}></Companyform>}
       {userType=="5" && <Managementform func={get_management_data}></Managementform>}
     <Button variant="outline-dark"  style={{width:"100%"}} onClick={save} disabled={error != null || perror != null || email==""||password == "" || ConfirmPassword == ""||username==""||!email||!password||!username||!ConfirmPassword}>
        Sign Up
      </Button>

    </Form>
    <ToastContainer />
    </Stack>

  </div>
  
  </Layout>
)};
