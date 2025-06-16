import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import ChatWindow from './components/ChatWindow.jsx';
import MessageInput from './components/MessageInput.jsx';
import VoiceButton from './components/VoiceButton.jsx';

const initialMessages = {
  General: [
    { user: 'Alice', text: 'Hello everyone!', time: '10:00' },
    { user: 'Bob', text: 'Hi Alice!', time: '10:01' },
  ],
  Random: [
    { user: 'Carol', text: 'Random thoughts here.', time: '09:30' },
  ],
};

export default function App() {
  const [channel, setChannel] = useState('General');
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [channel]: [
          ...prev[channel],
          {
            user: 'Bot',
            text: 'This is a scheduled message.',
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ],
      }));
    }, 5000);
    return () => clearTimeout(timer);
  }, [channel]);

  const addMessage = (text) => {
    setMessages((prev) => ({
      ...prev,
      [channel]: [...prev[channel], { user: 'Me', text, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }],
    }));
  };

  return (
    <div className="h-screen flex bg-gray-900 text-gray-200">
      <Sidebar channels={Object.keys(messages)} current={channel} setCurrent={setChannel} />
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h1 className="text-xl font-semibold">{channel}</h1>
          <VoiceButton />
        </div>
        <ChatWindow messages={messages[channel]} />
        <MessageInput onSend={addMessage} />
      </div>
    </div>
  );
}
