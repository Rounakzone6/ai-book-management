import { useState, useContext, useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const ChatHistory = () => {
  const { id } = useParams();
  const { bookList, token, backendUrl } = useContext(AppContext);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [localChatHistory, setLocalChatHistory] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef(null);

  const book = bookList.find(b => b._id === id);
  const displayedChatHistory = useMemo(() => {
    return localChatHistory.length ? localChatHistory : book?.chatHistory ?? [];
  }, [localChatHistory, book?.chatHistory]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [displayedChatHistory, isChatOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");
    
    const currentHistory = localChatHistory.length ? localChatHistory : book?.chatHistory ?? [];
    setLocalChatHistory([...currentHistory, { role: 'user', content: userMessage }]);
    setIsSending(true);

    try {
      const response = await axios.post(
        `${backendUrl}/book/chat/${id}`,
        { message: userMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setLocalChatHistory(response.data.chatHistory);
      } else {
        toast.error(response.data.message || "Failed to send message");
        setLocalChatHistory(prev => prev.slice(0, -1)); // revert
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error sending message");
      setLocalChatHistory(prev => prev.slice(0, -1)); // revert
    } finally {
      setIsSending(false);
      scrollToBottom();
    }
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)]">
      {/* Main History Panel */}
      <div className={`bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col transition-all duration-300 ${isChatOpen ? 'w-2/3' : 'w-full'}`}>
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#1e293b]">
            Chat History {book ? `> ${book.title}` : ''}
          </h2>
          {!isChatOpen && (
            <button 
              onClick={() => setIsChatOpen(true)}
              className="bg-[#4361ee] hover:bg-[#304bc0] text-white px-5 py-2.5 rounded text-sm font-medium transition-colors shadow-sm"
            >
              Start AI Chat
            </button>
          )}
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          {localChatHistory.length > 0 ? (
            <div className="pr-4">
              {localChatHistory.map((msg, index) => (
                <div key={index} className="mb-4 text-[15px] leading-relaxed">
                  {msg.role === 'user' ? (
                    <p className="text-[#4361ee] mb-1">{msg.content}</p>
                  ) : (
                    <p className="text-[#db5a42]">{msg.content}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 flex flex-col items-center justify-center h-full min-h-75 border border-gray-200 border-dashed rounded-md">
              <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <p className="text-[#475569] font-medium">No chat history present for this book.</p>
              <p className="text-sm text-gray-400 mt-2">Click "Start AI Chat" to begin a conversation.</p>
            </div>
          )}
        </div>
      </div>

      {/* AI Chat Panel */}
      {isChatOpen && (
        <div className="w-1/3 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-lg">
            <h3 className="font-bold text-[#1e293b] flex items-center">
              <svg className="w-5 h-5 text-[#4361ee] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              AI Chat
            </h3>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50/30">
            {localChatHistory.length === 0 && !isSending && (
              <div className="text-center text-sm text-gray-400 mt-10">
                Start a new conversation about this book.
              </div>
            )}
            {localChatHistory.map((msg, index) => (
              <div key={index} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#eef2ff] text-[#1e293b] rounded-tr-none' 
                    : 'bg-white border border-gray-100 text-[#475569] shadow-sm rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="mb-4 flex justify-start">
                <div className="bg-white border border-gray-100 shadow-sm rounded-lg rounded-tl-none px-4 py-3 text-sm text-gray-400 flex space-x-1.5 items-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-gray-100 bg-white rounded-b-lg">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={isSending}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#4361ee] transition-colors disabled:bg-gray-50"
              />
              <button
                type="submit"
                disabled={!message.trim() || isSending}
                className="bg-[#4361ee] hover:bg-[#304bc0] text-white px-5 py-2.5 rounded font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
