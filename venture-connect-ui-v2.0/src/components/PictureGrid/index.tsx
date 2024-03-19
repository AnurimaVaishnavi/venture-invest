import React from 'react';
import ImageSlider from '../ImageSlider';
import API_ENDPOINTS from '../../utils/api'


const Images = ({media}) => {

  const getImageUrl = (myMedia) => {
    return myMedia?.previewUrl || (API_ENDPOINTS.PROFILEPICVIEW + myMedia.filename);
  };
  
  const handleImageClick = (index) => {
    return <ImageSlider media={media} index={index} />;
  };
  

  const renderOne = () => {
    return(
      <div style={media.length === 1 ? { position: 'absolute', height: '90%',
        left: '33%', right: '33%'
      } : { position: 'absolute', height: '45%',
        left: '33%', right: '33%'
      }}>
        <div style={{ position: 'absolute', height: '100%' }}>
          <img src={getImageUrl(media[0])} alt='Preview' 
           onClick={() => handleImageClick(0)}
          style={{ height: '100%',objectFit: 'fill', objectPosition: 'center' }}  loading='lazy' />
        </div>
      </div>
    );
  };

  const renderTwo = () => {
    return (
    <div style={media.length === 3 ? {position: 'absolute', height: '45%', top:'45%',
    left: '5%', right: '5%'
    } : {
      position: 'absolute', height: media.length === 2 ? '90%' : '45%',
    left: '5%', right: '5%'
    }} >
        <div style={{position: 'absolute',height: '100%',width:'45%', left:"5%"}} >
          {/* {media[0].file.type.includes('image') && ( */}
            <img src={media.length === 3 ? getImageUrl(media[1]) : getImageUrl(media[0])} alt='Preview' className='modal-image img-fluid' 
            onClick={() => handleImageClick(0)} style={{ height: '100%',  objectFit: 'fill',objectPosition: 'center' }} loading='lazy'/>
            {/* )} */}
        </div>
        <div  style={{position: 'absolute',height: '100%',width:'45%', left:"50%"}}>
          {/* {media[1].file.type.includes('image') && ( */}
            <img src={ media.length === 3 ? getImageUrl(media[2]) : getImageUrl(media[1])} alt='Preview' className='modal-image img-fluid' 
            onClick={() => handleImageClick(0)} style={{ height: '100%', objectFit: 'fill', objectPosition: 'center' }} loading='lazy'/>
          {/* )} */}
          
        </div>
      </div>
  );};

  const renderThree = () => {
    return (
    <div style={{position: 'absolute', height:'45%', top:'50%', left: '5%', right: '5%'}}>
        <div style={{position: 'absolute', height: '100%', left:'0%', width:'33%' }}>
          {/* {media[1].file.type.includes('image') && ( */}
            <img src={media.length === 4 ? getImageUrl(media[1]) : getImageUrl(media[2])} alt='Preview' className='modal-image img-fluid' 
            onClick={() => handleImageClick(0)} style={{ height: '100%',
            objectFit: 'fill', objectPosition: 'center'
          }} loading='lazy'/>
          {/* )} */}
        </div>
        <div style={{position: 'absolute', height: '100%', left:'33%', width:'33%' }}>
          {/* {media[2].file.type.includes('image') && ( */}
            <img src={media.length === 4 ? getImageUrl(media[2]) : getImageUrl(media[3])} alt='Preview' className='modal-image img-fluid' 
            onClick={() => handleImageClick(0)} style={{height: '100%',
            objectFit: 'fill', objectPosition: 'center'}} loading='lazy'/>
          {/* )} */}
        </div>
        <div style={{position: 'absolute', height: '100%', left:'66%', width:'33%' }}>
        {media.length <= 5 ? (
          //  media[3].file.type.includes('image') && (
            <img
            src={media.length === 4 ? getImageUrl(media[3]) : getImageUrl(media[4])}
            alt='Preview'
            onClick={() => handleImageClick(0)} className='modal-image img-fluid'
            style={{height: '100%',
            objectFit: 'fill', objectPosition: 'center'}} loading='lazy'
            />
) : (
        <div id="container" style={{position:"absolute",  height: '100%'}}>
            {/* {media[3].file.type.includes('image') && ( */}
            <img
            src={media.length === 4 ? getImageUrl(media[3]) : getImageUrl(media[4])}
            alt='Preview'
            onClick={() => handleImageClick(0)} className='modal-image img-fluid'
            style= {{ height: '100%',
          }} loading='lazy'/>
            {/* ) } */}
            <div
              id="overlay"
              style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "yellow",
              width: "40%",  // Adjust the width as needed
              transition: ".5s ease",
              textAlign: "center",
              padding: "20px",
      }}
    >{`+ ${media.length - 5}`}</div>
        </div>
    )}

        </div>
    </div>
);};

  return (

    <div id="grid-container">
      {[1, 3, 4].includes(media.length) && renderOne()}
      {media.length >= 2 && media.length !== 4 && renderTwo()}
      {media.length >= 4 && renderThree()}
    </div>
  );
};

export default Images;
