import {useState, useEffect} from 'react';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileData from '../../../data_models/profiledata';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import { Container, Row, Col } from 'react-bootstrap';
import Postcomponent from '../../Postcomponent';
import Modal from 'react-bootstrap/Modal'
import CreatePost from '../../CreatePost';
import FileUpload from '../../FileUpload';
import EventForm from '../../EventForm';
import AvatarWithTextbox from '../../AvatarWithTextbox';
import UserProfile from '../../../../pages/session';
import API_ENDPOINTS from '../../../utils/api';

// interface FileObject {
//   file: File;
//   previewUrl: string;
// }
export default function Feedoptions()  {
    const [createPostModal, setcreatePostModal] = useState(false);
    const [initialText, setInitialText] = useState<string>('');
    const [files, setFiles] = useState([]);
    const [imageUploadModal,setImageUploadModal] = useState(false);
    const [eventFormModal, setEventFormModal] = useState(false);
    const [pollModal, setPollModal] = useState(false);
    const [hiringModal, setHiringModal ] = useState(false);
    const [posts, setPosts] = useState([]);
    const [globallimit,setGloballimit]=useState(10);
    const [nextCursor, setNextCursor] = useState(null);
    var cursorval=null;
    var scroll_data=[];
    var cursor_list=[];
    var observer_list=[];
    var element_thresholdlist=[];
    var intersectionCounter=0;
    let observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.75,
    };
    useEffect(() => {
      fetchPosts(null);
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const processposts = function (data) {
      for (let i = 0; i < data.length; i++) {
        const targetId = `item${data[i].it}`;
        const targetElement = document.querySelector(`#${targetId}`);
    
        if (targetElement) {
          const intersectionCallback = (entries) => {
            entries.forEach((entry) => {
             
              const box = entry.target;
              const visiblePct = `${Math.floor(entry.intersectionRatio * 100)}%`;
              if (entry.intersectionRatio >= 0.75 && !element_thresholdlist.includes(box.id)) {
                intersectionCounter++;
                element_thresholdlist.push(box.id);
                console.log(intersectionCounter);
                console.log(element_thresholdlist);
              }
    
              
              console.log(`Element ${box.id} is ${visiblePct} visible`);
            });
          };
    
         
          const observer = new IntersectionObserver(intersectionCallback, observerOptions);
          observer.observe(targetElement);
          observer_list.push(observer);
        }
      }
    };

    const fetchPosts = async (cursor) => {
      try {
        const form_obj = {
			cursor_val:cursor,
            limit:10
		  };
		  
		  const config = {
			headers: {
			  'Content-Type': 'application/json',
			  
			}
		  };
        const response = await axios.post(API_ENDPOINTS.FETCHFEED,form_obj,config);
        if(response && response.data && response.data.data){
          setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
            scroll_data.push(response.data.data);
            cursorval=response.data.nextCursor;
            setNextCursor(response.data.nextCursor);
            processposts(response.data.data);
        }
       
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const handleScroll = () => {
      processposts(scroll_data);
      if (
        // window.innerHeight + document.documentElement.scrollTop ===
        // document.documentElement.offsetHeight
        (window.innerHeight + Math.round(window.scrollY)) >= 0.7*document.body.offsetHeight
      ) 
      {
        if (nextCursor||cursorval) {
            let param=nextCursor?nextCursor:(cursorval?cursorval:null);
            if(!cursor_list.includes(param)){
                cursor_list.push(param);
                fetchPosts(param);
            }else{
                param=param+globallimit
                if (!cursor_list.includes(param))
                {
                  cursor_list.push(param);
                  fetchPosts(param);
                }
               
            }
          
        }
      }
    };
   
    const openModal = () => {
      setcreatePostModal(true);
    };
    const closeModal = () => {
      setcreatePostModal(false);
    };
    const handleText = (input) =>{
      setInitialText(input);
    }
    const handleFiles = (input) =>(
      setFiles(input)
    )
    const openImageUploadModal = (input) =>(
      setImageUploadModal(input)
    )

return  (
    <div>
    <div id="base-feed-options">
     <Container>
        <Row>
        <Col id="wpostcol">
        <div id="middleSide">
          {/* <div onClick={openModal} id="wtext">
            Start your venture .....</div> */}
          <AvatarWithTextbox image = {API_ENDPOINTS.PROFILEPICVIEW+UserProfile.getUserData().profileImage} type = {"commentForm"} height={47} func={openModal} visible={true} text={"Start your post"} />
        {/* <Button onClick={handleModalOpen}>Start your venture .....</Button> */}
        <Modal size="lg" animationType="slide" centered={true} scrollable={true} transparent={true} show={createPostModal} onClose={() => setcreatePostModal(false)}>
        <CreatePost initialText={initialText} 
        initialFiles= {files} closeModal={closeModal} 
        handleText={handleText} handleFiles={handleFiles} openImageUploadModal={openImageUploadModal}/>
        </Modal>
     <Modal show={imageUploadModal} onClose={() => setImageUploadModal(false)} size="xl" animationType="slide" centered={true} scrollable={true} transparent={true}>
    <FileUpload
        toggleDisabled={true}
        width={"300px"}
        height={'400px'}
        setImageUploadModal={setImageUploadModal}
        setcreatePostModal = {setcreatePostModal}
        initialFiles={files}
        setInitialFiles = {setFiles}
      />
    </Modal>
    <Modal show={eventFormModal} onClose={() => setEventFormModal(false)} height="650px" animationType="slide" centered={true} scrollable={true} transparent={true}>

    </Modal>
    <Modal show={pollModal} onClose={() => setPollModal(false)} height="650px" animationType="slide" centered={true} scrollable={true} transparent={true}>

    </Modal>
    <Modal show={hiringModal} onClose={() => setHiringModal(false)} height="650px" animationType="slide" centered={true} scrollable={true} transparent={true}>

    </Modal>
    {/* <Modal size="lg" animationType="slide" centered={true} scrollable={true} transparent={true} show={showPopup} onClose={() => setShowPopup(false)}>
            <AudienceSelection
              visibility={selectedOption}
              handleOptionChange={handleOptionChange}
              onClosePopup={ClosePopup}
              />
    </Modal> */}
    </div>
    </Col>
    </Row>
    <hr />
    </Container>
 </div>

 <div id="posts">
 {posts.map((post, index) => (
          <Postcomponent
          post_id = {post._id}
            name={post.name}
            prof={post.avatar}
            content={post.postDescription}
            media={post.media}
          />
  ))}

 {/* <Postcomponent name="Elon Musk" prof="EM" color="blue" content="Entrepreneur Elon Musk has achieved global fame as the chief executive officer (CEO) of electric automobile maker Tesla (TSLA) and the private space company SpaceX. Musk was an early investor in several tech companies, and in October 2022, he completed a deal to take X (formerly Twitter) private.
  His success and personal style have given rise to comparisons to other colorful tycoons from U.S. history, including Steve Jobs, Howard Hughes, and Henry Ford. He was named the richest person in the world in 2021, surpassing Amazon (AMZN) founder Jeff Bezos.
  1 Musk is the richest person in the world as of September 2023." src="https://image.cnbcfm.com/api/v1/image/104633824-GettyImages-494587915.jpg?v=1533671450"></Postcomponent><br></br>
  <Postcomponent name="Tech Crunch" prof="TC" color="orange" content="Tech Crunch | @TechCrunch. You've probably heard of it before, and for good reason. Tech Crunch is one of the leading platforms for technology-related updates catered to founders and startups." src=""></Postcomponent><br></br>
 <Postcomponent name="Mark Zuck" prof="MZ" color="purple" content="Brand New Oculus #meta #mark #facebook" src="https://image.cnbcfm.com/api/v1/image/107121537-1663699194580-gettyimages-612997102-OCULUS_CONNECT.jpeg?v=1694264401"></Postcomponent> */}
 </div>
 </div>
)};
