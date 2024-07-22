import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faTimes } from "@fortawesome/free-solid-svg-icons";

const PopupChatIcon = ({ chatWindowVisible, toggleChatWindow }) => {
  return (
    <button
      className={`fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300`}
      onClick={toggleChatWindow}
    >
      <FontAwesomeIcon
        icon={chatWindowVisible ? faTimes : faComments}
        size="lg"
      />
    </button>
  );
};

export default PopupChatIcon;
