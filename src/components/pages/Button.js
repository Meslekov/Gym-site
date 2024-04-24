import React from 'react';
import './Button.css';

const Button = (props) => {
     const { label, href, onClick } = props;

  return (
            <a href={href} onClick={onClick} className="button">
               {label}
            </a>
  )
}

export default Button