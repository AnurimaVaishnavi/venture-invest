import {useState} from 'react';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Layout from '../src/components/Layout';
// import { Routes, Route, Navigate, useLocation,Link, Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import API_ENDPOINTS  from '../src/utils/api.ts'

export default function  Testsuite()  {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [filedata, setFileData] = useState(null);
  const [typeval,setTypeVal]=useState(1);

  /* my code
  async function handleUpload(e) {
    if(e && e.target && e.target.files &&e.target.files[0] ){
      setFile(URL.createObjectURL(e.target.files[0]));
      setFileData(e.target.files[0]);
      if(filedata.type.includes('video')){
       setTypeVal(2);
      }else if(filedata.type.includes('image')){
       setTypeVal(1);
      }else if(filedata.type.includes('pdf')){
        setTypeVal(3);
      }
      let blob = await fetch(file).then(r => r.blob());
      console.log(blob);
    }
  }*/

    const handleFileUpload = async (event) => {
      const selectedFiles = event.target.files;
      const readFile = async (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = (e) => {
            resolve({
              file: file,
              previewUrl: e.target.result,
            });
          };
    
          if (file.type.includes('image') || file.type.includes('video')) {
            reader.readAsDataURL(file);
          } else if (file.type === 'application/pdf') {
            reader.readAsArrayBuffer(file);
          }
        });
      };
    
      const results = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const result = await readFile(selectedFiles[i]);
        results.push(result);
      }
      setTypeVal(1);
    setFile(results[results.length-1].previewUrl)
    setFiles([...files, ...results]);
    };
   

  const create = (event) => {
	event.preventDefault();
		const form_obj = {
            "author":{
                "id":"65a87ab70de51dd70377432b",
                "name":"abc",
                "avatar":"1705527904903-714514252-173235.JPEG"
            },
            "postDescription":"Hi guys lets have some fun",
            "Status":1,
            "Visibility":2,
            "media":{
                "filename":"1705540278828-1634949-611_video.mp4",
                "mediatype":2
            }
                
        };
		  const csrftoken = getCookie('csrftoken');
		  const config = {
			headers: {
			  'Content-Type': 'application/json',
			  'X-CSRFToken': csrftoken,	
			  
			}
		  };

          const formData= new FormData();
          if(filedata instanceof File) {
              formData.append('file', filedata);
            } else {
              console.error('Invalid profileImage format:', form_obj.profileImage);
            }
	
          axios.post(API_ENDPOINTS.PROFILEPICUPLOAD,formData).then(function(response){
            if(response && response.data){
              form_obj.media.filename=response.data.filename;
              if(filedata.type.includes('video')){
                form_obj.media.mediatype=2;
              }else if(filedata.type.includes('image')){
                form_obj.media.mediatype=1;
              }else if(filedata.type.includes('pdf')){
                form_obj.media.mediatype=3;
              }
      
              axios.post(API_ENDPOINTS.CREATEPOST,form_obj).then(function(response){
                console.log(response);
                alert("Sign up successful");
              })
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
      
<h2 className="text-center"><b>Upload Test</b></h2>
      
<Form.Group className="mb-3" controlId="formuploaddata">
        <Form.Label>Choose your profile pic</Form.Label>
        <Form.Control type="file" multiple placeholder="upload your pic"  onChange={handleFileUpload}/>
        {typeval==1 &&<img id ="uploadimg"src={file} />}
        {typeval==2 && <video width="750" height="500" controls >
      <source src={file} type="video/mp4"/>
        </video>}
        {typeval==3 && <object data={file} type="application/pdf" width="100%" height="100%">
      <p>Alternative text - include a link <a href={file}>to the PDF!</a></p>
  </object>}
      </Form.Group>
    </Form>
    <Button className="mb-3" variant="outline-dark" onClick={create} style={{width:"100%"}}>
        create 
      </Button>
      <br></br>
      {typeval==1 &&<img id ="uploadimg"src={file} />}
        {typeval==2 && <video width="750" height="500" controls >
      <source src={file} type="video/mp4"/>
        </video>}
        {typeval==3 && <object data={file} type="application/pdf" width="100%" height="100%">
      <p>Alternative text - include a link <a href={file}>to the PDF!</a></p>
  </object>}
      <Button className="mb-3" variant="outline-dark" onClick={create} style={{width:"100%"}}>
        Get Data 
      </Button>
    </Stack>
  </div>
  </Layout>
)};
