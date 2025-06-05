import React, { useState, useEffect } from 'react';
// import './TypingText.css';

const TypingText = ({ text = 'Start and show your hand' }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typing = setInterval(() => {
      setDisplayText((prev) => prev + text.charAt(index));
      setIndex((prev) => prev + 1);
    }, 100);

    if (index === text.length) {
      clearInterval(typing);
      setTimeout(() => {
        setDisplayText('');
        setIndex(0);
      }, 2000); // Wait 2s before restarting
    }

    return () => clearInterval(typing);
  }, [index, text]);

  return (
    <h2 className="typing-text">{displayText}<span className="cursor">|</span></h2>
  );
};

export default TypingText;