import React from 'react';

const Button = ({ className = 'btn btn-primary', type = 'button', children, ...props }) => (
  <button type={type} className={className} {...props}>
    {children}
  </button>
);

export default Button;
