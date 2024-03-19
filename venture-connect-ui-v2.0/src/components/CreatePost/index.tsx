import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
// import firebase from 'firebase';
// import { firestore } from '../../utils/firebase';
import PostAction from "../PostAction";
import AudienceSelection  from '../AudienceSelection';
import {Fade} from 'react-reveal';
import { Container, Row, Col } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import FileUpload from '../FileUpload';
import Modal from 'react-bootstrap/Modal';
import { GoClock } from "react-icons/go";
import { FaRegImage } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { MdAdd } from "react-icons/md";
import Images from "../PictureGrid";
import API_ENDPOINTS from '../../utils/api';
import UserProfile from '../../../pages/session';
import axios from "axios";


import {
  InsertEmoticonOutlinedIcon,
  PhotoLibraryRoundedIcon,
  VideocamRoundedIcon,
  SendRoundedIcon,
  IoMdDocument,
  CalendarMonthIcon,
  PollIcon,
  WorkIcon,
  ModeEditIcon,
  CloseIcon
} from '../../utils/icons';
import styled from 'styled-components';
import './CreatePost.module.scss';
import cuid from 'cuid';
import { TrendingUpRounded } from '@mui/icons-material';

// interface FileObject {
//   file: File;
//   previewUrl : string;
// }


// interface CreatePostProps {
//   photoUrl?: string;
//   username: string | null;
//   initialText: string;
//   initialFiles: FileObject[]; 
//   closeModal: () => void;
//   handleText: (text: string) => void;
//   handleFiles: (files: string[]) => void;
//   openImageUploadModal: (boolean) => void;
// }


function CreatePost ({photoUrl, username, initialText, initialFiles, closeModal,handleText, handleFiles,openImageUploadModal }): React.ReactElement {
    const [input, setInput] = useState(initialText);
    const [imgUrl,setImgUrl] = useState<string>('');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Friends');
    const [showPhotoVideo, setShowPhotoVideo] = useState(false); 
    const [disabled,setDisabled] = useState(false);
    const [document, setDocument] = useState(false);
    const [event, setEvent] = useState(false);
    const [poll, setPoll] = useState(false);
    const [hiring,setHiring] = useState(false);
    const [addVisible, setAddVisible] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [ScheduleStatus, setScheduleStatus] = useState(1);
    const [ScheduleDateTime, setScheduleDateTime] = useState();
    const limit = 1000;

    const handleSubmit = async (e) => {
      e.preventDefault();
      const parsedObject = JSON.parse(localStorage.getItem('userdata'));
      const form_obj = {
        author_id: parsedObject._id,
        postDescription: input,
        ScheduleStatus: ScheduleStatus,
        Visibility: selectedOption === 'Friends' ? 0 : selectedOption === 'Public' ? 1 : selectedOption === 'Only Me' ? 2 : 3,
        media: [],
      };
      if (ScheduleDateTime) {
        form_obj[ScheduleDateTime] = ScheduleDateTime;
      }
      if (initialFiles) {
        try {
          const uploadPromises = initialFiles.map(async (file, index) => {
            const formData = new FormData();
            if (file.file instanceof File) {
              formData.append('file', file.file);
            }
            const response = await axios.post(API_ENDPOINTS.PROFILEPICUPLOAD, formData);
            if (response && response.data && response.data[0]) {
              form_obj.media[index] = {};
              form_obj.media[index]['filename'] = response.data[0].filename;
              if (file.file.type.includes('video')) {
                form_obj.media[index]['mediatype'] = 2;
              } else if (file.file.type.includes('image')) {
                form_obj.media[index]['mediatype'] = 1;
              } else if (file.file.type.includes('pdf')) {
                form_obj.media[index]['mediatype'] = 3;
              }
            }
          });
    
          await Promise.all(uploadPromises);
          const postResponse = await axios.post(API_ENDPOINTS.CREATEPOST, form_obj);
          console.log(postResponse);
          alert("Post created successfully");
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };
    
      
    const CustomButton = styled.button`
    width: 80%;
    border: none;
    color: ${(props) => (props.disabled ? 'black' : 'white')};
    background-color: ${(props) => (props.disabled ? '#D3D3D3' : "#0070f3")};
    padding: 14px 28px;
    border-radius: 16px;
    font-size: 16px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    text-align: center;
  `;
    const StyledImageButton = styled.button`
    background-color: white;
    color: black;
    border: none !important;
    width: 80px; /* Adjust the width as needed */
    height: 40px; /* Adjust the height as needed */
    &:hover::after {
      content: "Image";
      position: absolute;
      bottom: 30%; /* Position above the button */
      left: 37%;
      transform: translateX(-50%);
      padding: 5px;
      background-color: #333;
      color: #fff;
      border-radius: 5px;
      font-size: 12px;
      opacity: 0.8;
      pointer-events: none;
    }
  `;

    const togglePopup = () => {
        setShowPopup(true);
    };

    const togglePhotoVideo = () => {
      setShowPhotoVideo(!showPhotoVideo);
    };

    const addIcons = [
      { Icon: IoMdDocument, title: 'Document', setState: setDocument },
      { Icon: CalendarMonthIcon, title: 'Event',  setState: setEvent},
      { Icon: PollIcon, title: 'Poll', setState: setPoll },
      { Icon: WorkIcon, title: 'Hiring' , setState: setHiring},
    ];
    
    

    const toggleDisabled = () => {
      setDisabled(!disabled);
    }
  
    const ClosePopup = () => {
        setShowPopup(false);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event);
      };
  
    const handleInputChange = (event) => {
      const value = event.target.value;
      setInput(value);
    
      if (value.trim().length <= limit) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    }

    const handleButtonClick = () => {
      window.alert('Button clicked!');
      closeModal();
    };
    return (
        <div className='createPost' style={{ marginLeft: '5%', marginTop:'5%', marginRight:'-5%', marginBottom:'5%', position: 'relative' }}>
        <Row className='row1' style={{ position: 'relative', width:'100%', height:'10%', alignItems: 'center' }}>
        <Col id = "col-1" sm={10}>
          <Container>
            <div className='visibility'  onClick={togglePopup} style={{cursor: 'pointer' }}>
            <Row>
            <Col id="col-1-1" sm={1} style={{justifyContent:"flex-start",display:"flex" }}>
            {UserProfile.getUserData() && <Avatar alt={UserProfile.getUserData().username.substring(0,2)} src={API_ENDPOINTS.PROFILEPICVIEW+UserProfile.getUserData().profileImage} />}
            </Col>
            <Col id = "col-1-2" style={{ display: 'block', alignItems: 'center' }} >
              <Row id="r1" >
              <p style={{ fontSize: '1.5em', fontWeight: 'bold',whiteSpace: 'nowrap'}}>{"Anurima Vaishnavi Kumar"}</p>
              </Row>
              <Row id = "r2">
              {selectedOption}
              </Row>
            </Col>
          </Row> </div>
        </Container>
        </Col>
        <Col id="col-2" sm={1} style={{justifyContent:"flex-end",display:"flex"}}><CloseButton color="disabled" onClick={handleButtonClick}/></Col>
        </Row>
        <Row className='row3'>
          <div style={{ position: "relative", overflowY: "scroll", height: '60%', width:'90%' }}>
          <textarea
            style={{
              border: 'none',
              outline: 'none',
              WebkitBoxShadow: 'none',
              MozBoxShadow: 'none',
              boxShadow: 'none',
              resize: 'none',
              height: '300px',
              width: '90%',
              position: 'relative',
            }}
            className='textInput'
            value={input}
            onChange={handleInputChange}
            placeholder={"Start your Post"}
          />
      {initialFiles.length > 0 &&
            <div style={{ position: "absolute", height:"300px",width:'95%', border: "1px solid", zIndex:"2"}}>
              <div id="actions" style={{display:"flex", padding:"0.4rem", position:"absolute",
              right:"0.8rem", top:"0.8rem", zIndex:"4"}}>
                <Button id="edit" onClick={() => {
                openImageUploadModal(true);
                handleText(input);
                handleFiles(initialFiles);
                // setFiles([]);
                closeModal;
                }}><ModeEditIcon/></Button>
                {/* <Button id="remove" onClick={() => setFiles([])}><CloseButton/></Button> */}
              </div>
              <Images media= {initialFiles}/>
           </div>}
  </div>
</Row>

  <Row className='row10' style={{ display: 'flex', alignItems: 'center', position:'relative' }}>
  <div className='col10' style={{width:'30%', position:'absolute', left:'0%'}}>
    {input && input.length > limit && (
      <div style={{ color: 'red' ,fontSize: '0.8em',whiteSpace: 'nowrap'}}>
        Exceeded character limit by {input.length - limit} characters
      </div>
    )}
    {((input && input.length <= limit) || (!input))&&  (
      <div style={{ color: 'black' ,fontSize: '0.8.em',whiteSpace: 'nowrap'}}>
        Number of characters used : {input.length}
      </div>
    )}
  </div>
  <div className='c11'  style={{justifyContent:"flex-start",display:"flex", width:'10%',position:'absolute', left:'35%'}}>
    <StyledImageButton onClick={() => {
      togglePhotoVideo();
      // toggleDisabled();
      handleText(input);
      handleFiles(initialFiles);
      openImageUploadModal(true);
      closeModal();
    }} >
      <FaRegImage size="2x" />
    </StyledImageButton>
  </div>

  {addVisible ? (
  <div className='c11' style={{ justifyContent: "flex-start", display: "flex", width: '10%', position: 'absolute', left: '45%' }}>
    <StyledImageButton onClick={() => {
      togglePhotoVideo();
      toggleDisabled();
      setAddVisible(false);
      // closeModal(input, files,  );
    }}>
      <MdAdd size="2x" />
    </StyledImageButton>
  </div>
) : <div id="btn-group" style={{ justifyContent: "flex-start", display: "flex", width: '10%', position: 'absolute', left: '45%' }}>
    {addIcons.map(({ Icon, setState }, index) => (
      <StyledImageButton key={index} onClick={() => {  
        setState(true); }}>
        <Icon size="2x" />
      </StyledImageButton>
    ))}
</div>

}
  </Row>
        <Row className='row4'>
        {bottomIcon.map(({ Icon, title, color }, index) => (
            <Col>
            <PostAction
              key={index}
              Icon={Icon}
              title={title}
              color={color}
              onClick={() => {
                if (!disabled && title === 'Photo/Video') {
                  togglePhotoVideo();
                  toggleDisabled();
                } else if (title === 'Feeling/Activity') {
                  // Handle Feeling/Activity action if needed
                }
                // Add more conditions for other actions if necessary
              }}
            />
            </Col>
        ))}
        </Row>
        <Row className='row6'style={{ display: 'flex', alignItems: 'center' }}>
      <Col id="c1" sm={7}>
      </Col>
      <Col id="c2" sm={1} style ={{justifyContent:"flex-start",display:"flex" }}>
      <StyledImageButton>
        <GoClock size="2x"/>
        </StyledImageButton>
      </Col>
      <Col id="c3" sm={4} style={{justifyContent:"flex-start",display:"flex" }}>
        <CustomButton
          type="button"
          onClick={handleSubmit}
          disabled={isButtonDisabled}
        >
          Post
        </CustomButton>
      </Col>
      <Col sm={2} ></Col>
    </Row>
    </div>
  );
};
export default CreatePost;

const bottomIcon = [
  {
    Icon: VideocamRoundedIcon,
    title: 'Live Video',
    color: 'red'
  },
  {
    Icon: PhotoLibraryRoundedIcon,
    title: 'Photo/Video',
    color: 'green'
  },
  {
    Icon: InsertEmoticonOutlinedIcon,
    title: 'Feeling/Activity',
    color: 'orange'
  }
];
