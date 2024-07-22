import { useState, useRef } from "react";
import axios from "axios";

const useChat = ({
  llmType,
  api,
  token,
  model,
  requestType,
  paramType,
  queryParam,
  postData,
  responsePath,
}) => {
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [chatWindowVisible, setChatWindowVisible] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChatWindow = () => {
    setChatWindowVisible(!chatWindowVisible);
  };

  const fetchInitialMessage = async () => {
    try {
      if (llmType === "openai") {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: model,
            messages: [
              { role: "system", content: "You are a helpful assistant." },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseMessage = response.data.choices[0].message.content;
        setMessages([
          { from: "bot", text: responseMessage || "Connected successfully." },
        ]);
      } else {
        const url =
          requestType === "GET"
            ? `${api}?${queryParam}=${encodeURIComponent("Test")}`
            : api;

        const options = {
          method: requestType,
          headers: token
            ? {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            : {},
        };

        if (requestType === "POST") {
          options.data = { [queryParam]: "Test" };
        }

        const response = await axios(url, options);
        const data = response.data;
        const responseMessage = responsePath
          .split(".")
          .reduce((o, i) => o[i], data);
        setMessages([
          { from: "bot", text: responseMessage || "Connected successfully." },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setConnectionStatus("disconnected");
      setMessages([
        {
          from: "bot",
          text: "Failed to connect to the bot. Please check your API and token.",
        },
      ]);
    }
  };

  const handleSendMessage = async () => {
    if (connectionStatus !== "connected") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { from: "user", text: userInput },
      { from: "bot", text: "..." },
    ]);

    try {
      if (llmType === "openai") {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: model,
            messages: [{ role: "user", content: userInput }],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseMessage = response.data.choices[0].message.content;
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1] = {
            from: "bot",
            text: responseMessage || "Received a response",
          };
          return newMessages;
        });
      } else {
        const url =
          requestType === "GET"
            ? `${api}?${queryParam}=${encodeURIComponent(userInput)}`
            : api;

        const options = {
          method: requestType,
          headers: token
            ? {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            : {},
        };

        if (requestType === "POST") {
          options.data = { [queryParam]: userInput };
        }

        const response = await axios(url, options);
        const data = response.data;
        const responseMessage = responsePath
          .split(".")
          .reduce((o, i) => o[i], data);
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1] = {
            from: "bot",
            text: responseMessage || "Received a response",
          };
          return newMessages;
        });
      }
      setUserInput("");
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: "bot", text: "An error occurred. Please try again later." },
      ]);
    }
  };

  return {
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
  };
};

export default useChat;
