import React, { useState, useCallback } from 'react';
import Lightbox from '@seafile/react-image-lightbox';
import '@seafile/react-image-lightbox/style.css';

const ModalComponent = ({ images = [], index, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(index);

  const onMovePrevRequest = useCallback(() => {
    setCurrentImageIndex((currentImageIndex + images.length - 1) % images.length);
  }, [currentImageIndex, images.length]);

  const onMoveNextRequest = useCallback(() => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  }, [currentImageIndex, images.length]);

  return (
    <Lightbox
      mainSrc={images[currentImageIndex]}
      nextSrc={images[(currentImageIndex + 1) % images.length]}
      prevSrc={images[(currentImageIndex + images.length - 1) % images.length]}
      onCloseRequest={onClose}
      onMovePrevRequest={onMovePrevRequest}
      onMoveNextRequest={onMoveNextRequest}
    />
  );
};

export default ModalComponent;
