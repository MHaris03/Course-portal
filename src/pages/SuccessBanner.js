import React, { useEffect, useState } from 'react';
import '../style/SuccessBanner.css'; // Add styles for the banner

const SuccessBanner = ({ message, duration = 5001, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="success-banner">
      {message}
    </div>
  );
};

export default SuccessBanner;
