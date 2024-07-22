import React from "react";
import { ChatWindow } from "./ChatWindow";
import { PopupChatIcon } from "./PopupChatIcon";
import useChat from "./useChat";

const ChatBox = ({
  llmType,
  api,
  token,
  model,
  requestType,
  paramType,
  queryParam,
  postData,
  responsePath,
  theme,
  headerTitle,
  chatType,
  chatWindowHeight,
  chatWindowWidth,
}) => {
  const {
    chatVisible,
    messages,
    userInput,
    connectionStatus,
    setUserInput,
    messagesEndRef,
    fetchInitialMessage,
    handleSendMessage,
    setChatVisible,
    setConnectionStatus,
    toggleChatWindow,
    chatWindowVisible,
  } = useChat({
    llmType,
    api,
    token,
    model,
    requestType,
    paramType,
    queryParam,
    postData,
    responsePath,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChatVisible(true);
    setConnectionStatus("connected");
    fetchInitialMessage();
  };

  return (
    <div>
      {chatType === "popup" && chatVisible && (
        <PopupChatIcon
          chatWindowVisible={chatWindowVisible}
          toggleChatWindow={toggleChatWindow}
        />
      )}
      {chatVisible && (
        <ChatWindow
          messages={messages}
          userInput={userInput}
          handleKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          handleSendMessage={handleSendMessage}
          connectionStatus={connectionStatus}
          setUserInput={setUserInput}
          messagesEndRef={messagesEndRef}
          headerTitle={headerTitle}
          theme={theme}
          chatWindowHeight={chatWindowHeight}
          chatWindowWidth={chatWindowWidth}
          chatWindowVisible={chatWindowVisible}
          toggleChatWindow={toggleChatWindow}
        />
      )}
    </div>
  );
};

export default ChatBox;
