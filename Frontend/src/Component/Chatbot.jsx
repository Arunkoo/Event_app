import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, IconButton, TextField, CircularProgress } from "@mui/material";
import { Send, Chat, Close } from "@mui/icons-material";
import axios from "axios";
import { assest } from "../assests/assests";
import { StoreContext } from "../context/storeContext";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { url } = useContext(StoreContext);
  const predefinedQuestions = [
    "How to book an event?",
    "What are the payment options?",
    "Can I get a refund?",
  ];

  const sendMessage = async (message) => {
    if (!message.trim()) return;
    setLoading(true);

    const newMessages = [...messages, { text: message, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post(`${url}/api/chatbot/chat`, {
        message,
      });
      setMessages([...newMessages, { text: res.data.reply, sender: "bot" }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          text: "Something went wrong. Please try again.",
          sender: "bot",
          error,
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-50">
      {/* Floating Chat Icon (Hidden when chatbot is open) */}
      {!isOpen && (
        <motion.div whileTap={{ scale: 0.9 }}>
          <IconButton
            onClick={() => setIsOpen(true)}
            className="bg-green-600 hover:bg-green-700 shadow-xl text-white p-3 rounded-full"
          >
            <Chat fontSize="large" />
          </IconButton>
        </motion.div>
      )}

      {/* Chatbox */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="w-80 bg-white rounded-xl shadow-2xl p-4 mt-3 border border-green-300"
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b pb-3 mb-3">
            <div className="flex items-center gap-3">
              <Avatar src={assest.aichat} className="bg-green-500" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Event Bot
                </h2>
                <p className="text-xs text-gray-500">
                  We typically reply instantly.
                </p>
              </div>
            </div>

            {/* Close Button */}
            <IconButton
              onClick={() => setIsOpen(false)}
              className="text-gray-600"
            >
              <Close />
            </IconButton>
          </div>

          {/* Messages */}
          <div className="h-60 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 max-w-[80%] rounded-lg shadow-md ${
                  msg.sender === "user"
                    ? "ml-auto bg-green-100"
                    : "mr-auto bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <CircularProgress size={20} className="text-green-500 mx-auto" />
            )}
          </div>

          {/* Quick Questions */}
          <div className="flex flex-wrap gap-2 my-2">
            {predefinedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => sendMessage(question)}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm hover:bg-green-200"
              >
                {question}
              </button>
            ))}
          </div>

          {/* Input Field */}
          <div className="flex items-center border-t pt-2">
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-white rounded-md"
            />
            <IconButton
              onClick={() => sendMessage(input)}
              className="text-green-600"
            >
              <Send />
            </IconButton>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;
