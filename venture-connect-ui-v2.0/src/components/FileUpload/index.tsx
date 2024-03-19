import React, { useState, useEffect } from 'react';
import './FileUpload.module.scss'
import ImageGrid  from '../PictureGrid';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { Document } from 'react-pdf'
import PDF from '../Documents'
import { AiOutlineCheckCircle, AiOutlineCloudUpload } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Container, Row, Col } from 'react-bootstrap';
import upload from  '../../images/imageupload.jpeg'
import Image from 'next/image';
import { FaTrashAlt } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import Button from 'react-bootstrap/Button'
import { IoArrowBack } from "react-icons/io5";
import { ContactSupportOutlined } from '@mui/icons-material';
import Card from 'react-bootstrap/Card';

const FileUpload = ({  initialFiles, setInitialFiles,
  width,
  height,
toggleDisabled, setImageUploadModal, setcreatePostModal }) => {
  const [files, setFiles] = useState(initialFiles);
  const [previewFile, setPreviewFile] = useState(null);
  const [fileUploadComplete, setFileUploadComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [clickedUploadPhoto, setclickedUploadPhoto] = useState(false);

  const closeWindow = () => {
    toggleDisabled();
  };
  const handleFileUpload = async (event) => {
    const selectedFiles = event.target.files;
    const readFile = (file) => {
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
  
    const results = await Promise.all(
      Array.from(selectedFiles).map(async (file) => await readFile(file))
    );
  
    setFiles([...files, ...results]);
  };

  useEffect(() => {
    setPreviewFile(files[files.length-1]);
  }, [files]);
  

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
  
    for (let i = 0; i < droppedFiles.length; i++) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const file = droppedFiles[i];
        const previewUrl = e.target.result;
  
        setFiles((prevFiles) => [
          ...prevFiles,
          {
            file: file as File,
            previewUrl: previewUrl as string,
          },
        ]);
      };
  
      reader.readAsDataURL(droppedFiles[i]);
    }
  };
  

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleEditFile = (index: number) => {

  };

  const showFile = (index) => {
    setPreviewFile(files[index]);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFile(null);
  };

  return (
    <Container style={{height:'1000px'}} >
      <Row style={{ display: 'flex', alignItems: 'center', height:'10%'}}>
        <Col id="c1" sm={6} style={{justifyContent:"flex-start",display:"flex" }}>
          <h4>Editor</h4>
        </Col>
        <Col id="c2" sm={6} style={{justifyContent:"flex-end",display:"flex" }}>
          <IconButton className = 'button' type='button' onClick={closeWindow}>
          <CloseIcon color = 'primary' />
         </IconButton>
        </Col>
      </Row>
        {files.length == 0 && 
         <Row style={{ height:'80%'}}>
        <Col id = "col1"></Col>
      <Col id = "col2">
        <Row style={{ height:'33%'}}></Row>
        <Row style={{ height:'33%'}}>
        <div className='container'  onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
        <label htmlFor="file-upload">
        <Image src={upload}  width={300} height={200} alt="" />
        <h3>Upload from Computer(or Drag&Drop)</h3>
        <input
        type='file'
        id='file-upload'
        accept='image/*, video/*, .pdf'
        multiple
        onChange={handleFileUpload}
        />
        </label>
      {/* Modal for displaying selected file */}
      {showModal && (
        <div className='modal' onClick={closeModal}>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            {selectedFile.file.type.includes('image') && (
              <img src={selectedFile.previewUrl} alt='Preview' className='modal-image' />
            )}
            {selectedFile.file.type.includes('video') && (
              <video controls className='modal-video'>
                <source src={selectedFile.previewUrl} type={selectedFile.file.type} />
                Your browser does not support the video tag.
              </video>
            )}
            {selectedFile.file.type === 'application/pdf' && (
              <div className='modal-pdf'>
                <PDF>
                    props = {selectedFile.previewUrl}
                </PDF>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </Row>
    <Row style={{ height:'33%'}}></Row>
    </Col>
    <Col id = "col3">
    </Col> </Row>}
    {
       files.length>0  && <Row style={{ height:'80%'}}>
         <Col id="column1" sm={7} style={{position: "relative"}}>
          <div id="display" style={{position:"absolute", height:"100%", width:"100%"}}>
        {previewFile && previewFile.file.type.includes('image') && (
          <Card style={{ width: '96%',height:'96%',position:'absolute' }}>
            <Card.Img variant="bottom" src={previewFile.previewUrl}/>
            </Card>
            )}
          {files[files.length - 1].file.type.includes('video') && (
            <video controls className='preview-video'>
              <source src={previewFile.previewUrl} type={previewFile.file.type}/>
              Your browser does not support the video tag.
            </video>
          )}
          {/* {file.file.type === 'application/pdf' && (
              <div className='preview-pdf'>
                <Document file={{ data: file.previewUrl }}>
                </Document>
              </div>
            )} */}
        </div>
        </Col>
        <Col id="column2" sm={5}>
        <Row id="r1" style={{ height: '90%', width: '90%', position: 'relative' }}>
          <div id="r2" style={{position: 'absolute', top: '5%', left: '10%', width: '96%',height: '90%', overflowY: "auto", overflowX: "hidden" }}>
  {clickedUploadPhoto ? (
  <div style={{ position: "relative", height:"95%", width:"95%" }}>
  <Row style={{position: 'absolute', top:'0%',left: '5%', height: '10%', width: '10%'  }}>
  <Button>
        <IoArrowBack size="3x" onClick={() => setclickedUploadPhoto(false)} />
     </Button>
  </Row>
  <Row style={{ height: '33%', top: '20%', left: '5%', position: 'absolute' }}>
     <div className='container' onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}
        style={{ position: 'absolute' }}>
        <label htmlFor="file-upload">
           <Image src={upload} width={300} height={200} alt="" />
           <h3>Upload from Computer(or Drag&Drop)</h3>
           <input
              type='file'
              id='file-upload'
              accept='image/*, video/*, .pdf'
              multiple
              onChange={handleFileUpload}
           />
        </label>
     </div>
  </Row>
  <Row style={{ height: '33%', position: 'absolute' }}></Row>
</div>

) : (
  files.map((file, index) => (
    <div key={index} style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', width: '35%', top: `${(((Math.floor(index / 2)) * 45 )+ 10)}%`, height: '35%', left: index % 2 === 0 ? '10%' : '55%' }}>
        {file.file.type.includes('image') && (
          <Card style={{ width: '96%',height:'96%',position:'absolute',cursor: "pointer" }}  bg={"dark"} onClick={() => showFile(index)}>
          <Card.Img variant="bottom" src={file.previewUrl}
           style={{ position: "absolute", height: "100%", width: "100%" }}/>
          </Card>
        )}
      </div>
    </div>
  ))
)}
          </div>
        </Row>
        <Row id="r2" style={{ height: '10%' }}>
          <Col></Col>
          <Col><Button><FaTrashAlt></FaTrashAlt></Button></Col>
          <Col><Button onClick={() => setclickedUploadPhoto(true)}><MdAdd></MdAdd></Button></Col>
        </Row>
    </Col>
    </Row>}
    <Row style={{ height:'10%'}}>
      <Col id= "col1" sm={8}></Col>
      <Col id= "col2" sm={2}>
      <IconButton className = 'button' type='button' onClick={() => { setcreatePostModal(true);
      setImageUploadModal(false);}}>
         Back 
      </IconButton>
      </Col>
      <Col id= "col3" sm={2}>
      <IconButton className = 'button' type='button' onClick={() =>{ 
        setcreatePostModal(true); setImageUploadModal(false);
        setInitialFiles(files);}}>
         Next
      </IconButton>
      </Col>
    </Row>
    </Container>
  );
};

export default FileUpload;
