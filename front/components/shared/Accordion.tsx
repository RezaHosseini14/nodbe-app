import React, { useState, useRef, useEffect } from "react";
import "./acar.css";

export const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 10);
    }
  }, [isOpen, content]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion ${isOpen ? "open" : ""}`} style={{ height: `${contentHeight + 10}px` }}>
      <div className="accordion-header" onClick={toggleAccordion}>
        {title}
      </div>
      <div ref={contentRef} className="accordion-content">
        <p>{content}</p>
      </div>
    </div>
  );
};
