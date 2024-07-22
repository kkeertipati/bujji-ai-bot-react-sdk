import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";

const ChatWindow = ({
  messages,
  userInput,
  handleKeyDown,
  handleSendMessage,
  connectionStatus,
  setUserInput,
  messagesEndRef,
  headerTitle,
  theme,
  chatWindowHeight,
  chatWindowWidth,
  chatWindowVisible,
  toggleChatWindow,
}) => {
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`fixed bottom-4 right-4 border rounded-lg ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
      style={{
        height: chatWindowHeight,
        width: chatWindowWidth,
        display: chatWindowVisible ? "block" : "none",
      }}
    >
      <div className="flex justify-between items-center p-2 border-b">
        <h3 className="text-lg font-bold">{headerTitle}</h3>
        <button onClick={toggleChatWindow}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div
        className="flex-1 overflow-y-auto p-2"
        style={{ maxHeight: chatWindowHeight - 100 }}
      >
        {messages.map((msg, index) => (
          <ChatMessage key={index} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-2 border-t flex items-center">
        <input
          type="text"
          value={userInput}
          onKeyDown={handleKeyDown}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-grow p-2 border rounded-lg"
          placeholder="Type your message here..."
          style={{
            backgroundColor: theme === "dark" ? "gray-700" : "white",
            color: theme === "dark" ? "white" : "black",
          }}
          disabled={connectionStatus !== "connected"}
        />
        <button
          type="button"
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          disabled={connectionStatus !== "connected"}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
