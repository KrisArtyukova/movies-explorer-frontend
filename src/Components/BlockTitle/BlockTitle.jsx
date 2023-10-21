import React from 'react';
import './BlockTitle.css';

function BlockTitle({ title }) {
  return (
    <div className="title">
      <h3 className="text">
        {title}
      </h3>
    </div>
  );
}

export default BlockTitle;
