import {useState} from 'react';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
// import { Routes, Route, Navigate, useLocation,Link, Router } from "react-router-dom";
import Layout from '../src/components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/home.css'
export default function  Home()  {
	
	

return  (
 <Layout>
  <div>
   
<Stack className="col-md-9 mx-auto">
{/* <Form>
      
<h2 className="text-center"><b>Home Page</b></h2>
      
     
    </Form> */}
    <h2 className="text-center"><b>Venture Connect</b></h2>
    <Form>
        <Form.Text className="text-muted text-center mb-3" style={{width:"100%",display:"block"}}>
         An Ultimate Enterpreneurial Booster on steroids.
        </Form.Text>
    </Form>
    <Button id="started" href="/SignIn" className="mb-3" variant="outline-dark" style={{width:"20%",display:"block",borderRadius:"35px",marginLeft:"40%",background:"#0070f3",color:"white",border:"none",boxShadow:"0 4px 14px 0 rgba(0, 0, 0, 0.2)"}}>
        Get Started
      </Button>
<img src="/home_1.png"  ></img>

    </Stack>
  </div>
  </Layout>
)};
