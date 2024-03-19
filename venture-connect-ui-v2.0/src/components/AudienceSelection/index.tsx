import React, { useState } from 'react';
import RadioButton from '../RadioButton';
import Checkbox from '../Checkbox';
import './AudienceSelection.module.scss'
import { Container, Row, Col } from 'react-bootstrap';

const AudienceSelection = ({ visibility, handleOptionChange, onClosePopup }) => {
  console.log('Anurima Vaishnavi')
  const [audience, setAudience] = useState(visibility); // Default audience set to Friends
  const [defaultChecked, setDefaultChecked] = useState(false);
  const handleAudienceChange = (e) => {
    setAudience(e.target.value);
  };
  const handleDefaultCheckboxChange = (event) => {
    setDefaultChecked(event.target.checked);
  };
  const handleDone = () => {
    console.log('Done button clicked');
    handleOptionChange(audience);
    onClosePopup();
  };
  const handleCancel = () => {
    onClosePopup();
  };
  return (
    <Container>
    <div className='Audience Selection'>
    <div className='top1'>
      <Row className="r1">
        <p style={{ fontSize: '1.5em', fontWeight: 'bold',whiteSpace: 'nowrap'}}>{"Post settings"}</p>
      </Row>
      
      <p>Who can see your post?</p>
      <p>Your post will show up in Feed, on your profile, and in search results.</p>
      
      <p>Your default audience is set to {audience}, but you can change the audience of this specific post.</p>
    </div>
    <div className='top2'>
      {/* Audience selection options */}
          <RadioButton 
          label = "Friends"
          checked={audience === 'Friends'}
          onChange={handleAudienceChange}
          />

         <RadioButton 
          label = "Public"
          checked={audience === 'Public'}
          onChange={handleAudienceChange}
          />

        <RadioButton 
          label = "Only Me"
          checked={audience === 'Only Me'}
          onChange={handleAudienceChange}
          />
        
        <RadioButton 
        label = "Specific Friends"
        checked={audience === 'Specific Friends'}
        onChange={handleAudienceChange}
        />
    </div>
    <div className='bottom'>
      <div className='checkbox'>
        <Checkbox
        label = "Set default"
        value = "false"
        onChange={handleDefaultCheckboxChange}
        />
      </div>
      <div className='buttons'>
        <button onClick={handleDone}>Done</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
     </div>
     </Container>
  );
};

export default AudienceSelection;