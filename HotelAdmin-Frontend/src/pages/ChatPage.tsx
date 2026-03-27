import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

interface Message {
  id: string;
  sender: 'admin' | 'guest';
  name: string;
  message: string;
  timestamp: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'guest', name: 'Alice Johnson', message: 'Hi, I need help with my booking', timestamp: '10:30 AM' },
    { id: '2', sender: 'admin', name: 'You', message: 'Hi Alice, how can I help you?', timestamp: '10:32 AM' },
    { id: '3', sender: 'guest', name: 'Alice Johnson', message: 'I want to upgrade my room', timestamp: '10:33 AM' },
    { id: '4', sender: 'admin', name: 'You', message: 'Sure, let me check available upgrades for you', timestamp: '10:35 AM' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'admin',
        name: 'You',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <Layout title="Chat">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        <Card className="lg:col-span-1 overflow-y-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Conversations</h3>
          <div className="space-y-2">
            {['Alice Johnson', 'Bob Wilson', 'Carol Davis', 'David Lee'].map((name, i) => (
              <div key={i} className="p-3 bg-slate-700 dark:bg-slate-800 rounded cursor-pointer hover:bg-slate-600 transition">
                <p className="text-white font-medium">{name}</p>
                <p className="text-slate-400 text-sm truncate">Last message...</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2 flex flex-col overflow-hidden">
          <div className="border-b border-slate-700 pb-4 mb-4">
            <h3 className="text-lg font-semibold text-white">Alice Johnson</h3>
            <p className="text-slate-400 text-sm">Room 105 - Check-out: Apr 3</p>
          </div>

          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'admin'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-700 dark:bg-slate-800 text-slate-100'
                  }`}
                >
                  <p className="font-semibold text-sm">{msg.name}</p>
                  <p>{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-3 border-t border-slate-700 pt-4">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} variant="primary">
              Send
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default ChatPage;
