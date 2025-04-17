import React, { useState } from 'react';
import '.././style/YesNoPicker.css';

function YesNoPicker({ onChange }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (value) => {
    setSelected(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="yes-no-picker">
      <div
        className={`option ${selected === 'yes' ? 'selected' : ''}`}
        onClick={() => handleSelect('yes')}
      >
        <div className="circle"></div>
        <p>Yes</p>
      </div>
      <div
        className={`option ${selected === 'no' ? 'selected' : ''}`}
        onClick={() => handleSelect('no')}
      >
        <div className="circle"></div>
        <p>No</p>
      </div>
    </div>
  );
}

export default YesNoPicker;
