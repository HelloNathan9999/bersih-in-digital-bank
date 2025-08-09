
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatBotProps {
  isDarkMode?: boolean;
}

const ChatBot: React.FC<ChatBotProps> = ({ isDarkMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Michelle',
      text: 'Halo! Saya Michelle, asisten virtual BERSIH.IN. Ada yang bisa saya bantu hari ini? 😊',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [animationClass, setAnimationClass] = useState('');

  // Enhanced animation: bounce only twice per minute
  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setAnimationClass('animate-bounce');
        setTimeout(() => {
          setAnimationClass('');
        }, 2000); // Bounce for 2 seconds (2 bounces)
      }, 60000); // Every minute

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const botResponses = [
    'Terima kasih atas pertanyaannya! Saya akan membantu Anda dengan senang hati.',
    'Untuk informasi lebih lanjut tentang BERSIH.IN, Anda bisa mengecek menu Berita atau hubungi customer service kami.',
    'Apakah Anda memerlukan bantuan dengan fitur bank sampah digital? Saya siap membantu!',
    'Untuk menukar sampah menjadi poin, silakan gunakan fitur Scan QR di bank sampah terdekat.',
    'Jika ada masalah dengan aplikasi, jangan ragu untuk menghubungi tim support kami.',
    'Anda bisa melihat riwayat transaksi dan poin di halaman Profile.',
    'Untuk informasi lokasi bank sampah terdekat, gunakan fitur Lokasi Bank Sampah di menu Belanja.',
    'Tim customer service kami siap membantu Anda 24/7. Ada pertanyaan lain?',
    'Untuk tutorial penggunaan aplikasi, silakan kunjungi halaman Edukasi & Komunitas.',
    'Jangan lupa untuk selalu memilah sampah sesuai jenisnya ya! Lingkungan yang bersih adalah tanggung jawab kita bersama.'
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      // Simulate bot response with varied responses
      setTimeout(() => {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        const botResponse = {
          id: messages.length + 2,
          sender: 'Michelle',
          text: randomResponse,
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-emerald-500 to-teal-600' 
            : 'bg-gradient-to-br from-blue-500 to-indigo-600'
        } ${isOpen ? 'rotate-180' : animationClass}`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white mx-auto" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white mx-auto" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 z-50 w-80 h-96 animate-scale-in">
          <Card className={`h-full flex flex-col shadow-2xl ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }`}>
            {/* Chat Header */}
            <div className={`p-4 border-b flex items-center space-x-3 ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600' 
                  : 'bg-gradient-to-br from-blue-500 to-indigo-600'
              }`}>
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Michelle
                </h3>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Customer Service Bot
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.sender === 'You'
                        ? isDarkMode
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-500 text-white'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-200'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 opacity-70`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ketik pesan..."
                  className={`flex-1 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                  }`}
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className={`${
                    isDarkMode 
                      ? 'bg-emerald-600 hover:bg-emerald-700' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBot;
