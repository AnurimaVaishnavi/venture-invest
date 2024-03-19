import {useState,useEffect} from 'react';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Layout from '../src/components/Layout';
import { useRouter } from "next/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import API_ENDPOINTS  from '../src/utils/api.ts';
import { ToastContainer, toast } from "react-toastify";
import toastOptions from "../src/utils/toastOptions";
import UserProfile from './session';

export default function  SignIn()  {
  const history=useRouter();
	const  [inputValue, setInputValue] =  useState('');
  const[email,setEmail]=useState();
  const[password,setPassword]=useState();
  const [file, setFile] = useState(null);
  const [userdata, setUserData] = useState({});
  const [error, setError] = useState(null);
  
  useEffect(() => {
    localStorage.setItem('userdata', JSON.stringify(userdata));
  }, [userdata]);

	const  handleChange = (event) => {
		setInputValue(event.target.value);
	};

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

  function handlepassword(e){
    if(e && e.target.value){
      setPassword(e.target.value);
    }
  }
  const signin = (event) => {
	event.preventDefault();
		const form_obj = {
			emailid:email,
      password:password
		  };
		  const csrftoken = getCookie('csrftoken');
		  const config = {
			headers: {
			  'Content-Type': 'application/json',
			  'X-CSRFToken': csrftoken,	
			  
			}
		  };
	
		axios.post(API_ENDPOINTS.SIGNIN,form_obj,config).then(function(response){
			console.log(response);
      if(response && response.data._id){
        UserProfile.setUserData(response.data);
        setUserData(response.data);
        const imageurl=API_ENDPOINTS.PROFILEPICVIEW+response.data.profileImage;
        toast.success("Logged in successfully!!", toastOptions);
        history.push("/VentureHome");
 
      }else{
        toast.error("Login failed!!", toastOptions);

      }
		})
	};


	function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}
	

return  (
  <Layout>
  <div>
<Stack className="col-md-5 mx-auto">
<Form>
      
<h2 className="text-center"><b>Login</b></h2>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleemail}/>
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
        {error && <p className="text-danger">{error}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlepassword}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Stack gap={2} className="col-md-15 mx-auto">      
      <Button className="mb-3" variant="outline-dark" onClick={signin} style={{width:"100%"}} disabled={error != null || password == ""}>
        Login
      </Button>
      <span style={{ display: "flex", marginLeft: "30%" }}>Don't have an account?&nbsp;&nbsp;<b style={{ textDecoration: "underline", cursor: "pointer" }}><a style={{color:"gray"}} href="/SignUp">Create an account</a></b></span>
        </Stack>
        <img id ="uploadimg"src={file} />
    </Form>
    <ToastContainer />
    </Stack>
  </div>
  
  </Layout>
)};
