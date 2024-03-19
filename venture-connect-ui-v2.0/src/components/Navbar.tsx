import {useState,useEffect} from 'react';
import axios from 'axios';
// import SignIn from 'pages/SignIn';
// import SignUp from 'pages/SignUp';
// import Home from 'pages/Home.jsx'
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProfile from '../../pages/session';
import { useRouter } from "next/router";
import { Avatar } from '@mui/material';
import API_ENDPOINTS from '../utils/api';
// import { Routes, Route, Navigate, useLocation,Link, Router } from "react-router-dom";

  

 
const NavBar = (): JSX.Element => {

	const  [inputValue, setInputValue] =  useState('');
  const  [userprofdata,setUserProfData]=useState(null);
  const history=useRouter();
  useEffect(() => {
    const local_value= localStorage.getItem('userdata');
    if (local_value && Object.keys(JSON.parse(local_value)).length) {
       UserProfile.setUserData(JSON.parse(local_value));
      //  setUserData(JSON.parse(localStorage.getItem('userdata')));
      setUserProfData(JSON.parse(local_value));
     }
   }, []);
	const  handleChange = (event) => {
		setInputValue(event.target.value);
	};
  const logout=()=>{
    UserProfile.setUserData("");
    setUserProfData(null);
    localStorage.removeItem('userdata');
    history.push('/Home');
  }

	

return  (
  <div>

{['sm'].map((expand,index) => (
        <Navbar key={expand} expand={expand} className="bg-body-primary mb-3">
          <Container fluid>
            <Navbar.Brand href="/Home"><b>Venture Connect</b></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Venture Connect
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>
                {!userprofdata && <Nav.Link href="/SignIn">Login</Nav.Link>}
                {!userprofdata && <Nav.Link href="/SignUp">Sign up</Nav.Link>}
                  {userprofdata &&  <NavDropdown
                    title={`${userprofdata.username}`}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                      
                    <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Settings
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5" onClick={logout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  }
                  {userprofdata && <Avatar alt={userprofdata.username.substring(0,2)} src={API_ENDPOINTS.PROFILEPICVIEW+userprofdata.profileImage} />}
                 

                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
  </div>
)};
export default NavBar;
