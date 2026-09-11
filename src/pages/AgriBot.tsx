import { useState, useRef, useEffect, useMemo } from 'react';
import { Header } from '../components/Header';
import { askAgriBot } from '../services/api';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import './AgriBot.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export const AgriBot = () => {
  const { language, t } = useLanguage();
  const isMr = language === 'mr';

  const quickActions = isMr ? [
    { label: "🌧 मान्सून पिके", query: "मान्सून पिकांबद्दल सांगा" },
    { label: "🐛 कीटक नियंत्रण", query: "कीटक नियंत्रणासाठी काय उपाय आहेत?" },
    { label: "🌱 सेंद्रिय शेती", query: "सेंद्रिय शेती पद्धतींची माहिती द्या" },
    { label: "🔄 पीक फेरपालट", query: "पीक फेरपालटीचे महत्त्व काय?" },
    { label: "💧 सिंचन नियोजन", query: "सिंचन आणि पाणी व्यवस्थापन सांगा" },
    { label: "🌾 खतांचा सल्ला", query: "खत व्यवस्थापनाचा सल्ला द्या" }
  ] : [
    { label: "🌧 Monsoon Crops", query: "Tell me about monsoon crops" },
    { label: "🐛 Pest Control", query: "Tell me about pest control" },
    { label: "🌱 Organic Farming", query: "Tell me about organic farming" },
    { label: "🔄 Crop Rotation", query: "Tell me about crop rotation" },
    { label: "💧 Irrigation", query: "Tell me about irrigation" },
    { label: "🌾 Fertilizer", query: "Tell me about fertilizer" }
  ];

  const defaultBotText = t('agribot.welcomeMsg');

  const [customMessages, setCustomMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const nextIdRef = useRef(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages: Message[] = useMemo(() => (
    customMessages.length === 0
      ? [{ id: 0, text: defaultBotText, sender: 'bot' }]
      : customMessages
  ), [customMessages, defaultBotText]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: nextIdRef.current++, text, sender: 'user' };
    const updatedHistory = customMessages.length === 0 
      ? [{ id: 0, text: defaultBotText, sender: 'bot' as const }, userMessage] 
      : [...customMessages, userMessage];

    setCustomMessages(updatedHistory);
    setInput('');
    setIsLoading(true);

    const historyForApi = updatedHistory.map(m => ({ sender: m.sender, text: m.text }));
    const botResponseText = await askAgriBot(text, historyForApi, language);
    
    const botMessage: Message = { id: nextIdRef.current++, text: botResponseText, sender: 'bot' };
    setCustomMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };


  const handleActionClick = (actionQuery: string) => {
    handleSend(actionQuery);
  };

  return (
    <div className="agribot-page">
      <Header 
        title={t('agribot.title')} 
        description={t('agribot.description')}
      />

      <div className="card chat-container">
        
        <div className="quick-actions-bar">
          {quickActions.map((action, idx) => (
            <button 
              key={idx} 
              className="quick-action-btn"
              onClick={() => handleActionClick(action.query)}
            >
              {action.label}
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
                {msg.sender === 'bot' && (
                   <div className="flex items-center gap-1 mb-2 text-ai text-sm font-semibold">
                     <Sparkles size={14} /> {isMr ? 'कृषी AI सहाय्यक' : 'AI Assistant'}
                   </div>
                )}
                <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
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
              placeholder={isMr ? "कृषीबॉटला पिके, कीड, खते किंवा हवामानाबद्दल विचारा..." : "Ask a farming question..."} 
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
            {isMr 
              ? 'कृषीबॉट हा AI मार्गदर्शक आहे. गंभीर शेतीविषयक निर्णयांसाठी स्थानिक कृषी विद्यापीठ वा अधिकाऱ्यांचा सल्ला घ्या.'
              : 'AgriBot is a prototype and can make mistakes. Please verify critical farming decisions.'}
          </div>
        </div>

      </div>
    </div>
  );
};

