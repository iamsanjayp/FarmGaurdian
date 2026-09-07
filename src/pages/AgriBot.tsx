import { useState, useRef, useEffect } from 'react';
import { Header } from '../components/Header';
import { askAgriBot } from '../services/api';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import './AgriBot.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const quickActions = [
  "🌧 Monsoon Crops",
  "🐛 Pest Control",
  "🌱 Organic Farming",
  "🔄 Crop Rotation",
  "💧 Irrigation",
  "🌾 Fertilizer"
];

export const AgriBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your AgriBot Assistant. I can help you with crop recommendations, weather insights, pest control, and interpreting your farm data. What would you like to know today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const botResponseText = await askAgriBot(text);
    
    const botMessage: Message = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleActionClick = (actionText: string) => {
    // Strip emojis for the actual query if needed, or just send the text
    const query = actionText.split(' ').slice(1).join(' ');
    handleSend(`Tell me about ${query}`);
  };

  return (
    <div className="agribot-page">
      <Header 
        title="AgriBot Assistant" 
        description="Your AI farming companion powered by agricultural intelligence."
      />

      <div className="card chat-container">
        
        <div className="quick-actions-bar">
          {quickActions.map((action, idx) => (
            <button 
              key={idx} 
              className="quick-action-btn"
              onClick={() => handleActionClick(action)}
            >
              {action}
            </button>
          ))}
        </div>

        <div className="chat-messages-area">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-wrapper ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`}>
              <div className="message-avatar">
                {msg.sender === 'user' ? <User size={20} /> : <Bot size={24} className="text-ai" />}
              </div>
              <div className="message-bubble">
                {msg.sender === 'bot' && msg.id === 1 && (
                   <div className="flex items-center gap-1 mb-2 text-ai text-sm font-semibold">
                     <Sparkles size={14} /> AI Assistant
                   </div>
                )}
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message-wrapper message-bot">
              <div className="message-avatar">
                <Bot size={24} className="text-ai" />
              </div>
              <div className="message-bubble typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <form 
            className="chat-form" 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          >
            <input 
              type="text" 
              placeholder="Ask a farming question..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="send-btn bg-primary text-white"
              disabled={!input.trim() || isLoading}
            >
              <Send size={20} />
            </button>
          </form>
          <div className="text-center mt-2 text-xs text-text-muted">
            AgriBot is a prototype and can make mistakes. Please verify critical farming decisions.
          </div>
        </div>

      </div>
    </div>
  );
};
