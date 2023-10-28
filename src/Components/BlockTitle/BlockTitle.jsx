import React from 'react';
import './BlockTitle.css';

function BlockTitle({ title }) {
  return (
    <div className="title">
      <h2 className="text">
        {title}
      </h2>
    </div>
  );
}

export default BlockTitle;
