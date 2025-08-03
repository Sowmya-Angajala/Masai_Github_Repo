import React, { useState } from "react";

function ProfileCard(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const maxLength = 100;
  const shouldTruncate = props.Bio.length > maxLength;

  const displayBio = isExpanded ? props.Bio : props.Bio.substring(0, maxLength);

  const toggleBio = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h4 className="text-xl font-semibold text-gray-800 mb-2">Name: {props.Name}</h4>
      <p className="text-gray-600 mb-1">Age: {props.Age}</p>
      <p className="text-gray-700">
        Bio: {displayBio}
        {shouldTruncate && (
          <span
            onClick={toggleBio}
            className="text-blue-500 cursor-pointer font-medium ml-1"
          >
            {isExpanded ? "Read Less" : "Read More..."}
          </span>
        )}
      </p>
    </div>
  );
}

export default ProfileCard;
