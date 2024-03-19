import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import styles from './imageslider.module.scss';
export default function ImageSlider (props) {
    const [current, setCurrent] = useState(props.index);
    const length = props.media.length;
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
      };
    
      const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
      };
    return (
        <div className= {styles.slider}>
            <FaArrowAltCircleLeft className= {styles.leftArrow} onClick={prevSlide} />
            <FaArrowAltCircleRight className={styles.rightArrow} onClick={nextSlide} />
            <img src={props.media[current]} className='image' />
                {/* {
                media.map((slide, index) => (
                    <div
                    className={index === current ? styles.slideActive : styles.slide}
                    key={index}
                    >
                    {index === current && <img src={slide} className='image' alt={`Slide ${index}`} />}
                    </div>
                ))
                } */}

        </div>
    )
}