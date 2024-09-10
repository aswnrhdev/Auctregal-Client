'use client'
import React, { useState, useRef, useEffect } from 'react';
import { CgMonday } from "react-icons/cg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface ChatbotProps {
  item: any;
}

interface Message {
  text: string;
  isUser: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ item }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = { text: inputMessage, isUser: true };
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/chatbot', {
        message: inputMessage,
        itemDetails: item
      });

      const botMessage: Message = { text: response.data.message, isUser: false };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      const errorMessage: Message = { text: 'Sorry, I encountered an error. Please try again.', isUser: false };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed right-10 bottom-4 z-50">
      <button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="bg-white text-black p-3 rounded-full  transition-colors shadow-lg"
      >
        <CgMonday className="text-xl" />
      </button>
      {isChatbotOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-[#361500] text-white p-3 flex justify-between items-center">
            <span>Aura - AI Assistant</span>
            <button onClick={() => setIsChatbotOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div ref={chatContainerRef} className="h-96 overflow-y-auto p-3 bg-gray-100">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.isUser ? "text-right" : "text-left"}`}>
                <span className={`inline-block p-2 rounded-lg ${message.isUser ? "bg-[#361500] text-white" : "bg-white text-gray-800"}`}>
                  {message.text}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="text-left">
                <span className="inline-block p-2 rounded-lg bg-gray-200 text-gray-500">
                  Aura is typing...
                </span>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about this item..."
              className="flex-grow bg-gray-100 text-gray-800 p-2 rounded-l"
            />
            <button type="submit" className="bg-[#361500] text-white p-2 rounded-r hover:bg-blue-600 transition-colors">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
