import React from 'react';
import './RadioButton.module.scss'

const RadioButton = ({ label,checked, onChange }) => {
  return (
    <label>
      <input type="radio" value ={label} checked={checked} onChange={onChange} />
      {label}
    </label>
  );
};

export default RadioButton;
