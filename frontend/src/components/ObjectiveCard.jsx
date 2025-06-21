import React from "react";
import '../styles/ObjectiveCard.css';

const ObjectiveCard = ({ 
  title, 
  description, 
  icon = null, 
  className = "",
  delay = 0 
}) => {
  return (
    <div 
      className={`objective-card ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {icon && (
        <div className="objective-icon">
          {typeof icon === 'string' ? (
            <img src={icon} alt={title} />
          ) : (
            icon
          )}
        </div>
      )}
      <h2 className="objective-title">{title}</h2>
      <p className="objective-description">{description}</p>
    </div>
  );
};

export default ObjectiveCard;