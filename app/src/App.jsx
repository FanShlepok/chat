import { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import ChatWindow from './components/ChatWindow.jsx';
import MessageInput from './components/MessageInput.jsx';
import VoiceButton from './components/VoiceButton.jsx';
import './App.css';

const channels = [
  { id: 1, name: 'general', type: 'text' },
  { id: 2, name: 'random', type: 'text' },
];

const initialMessages = [
  {
    id: 1,
    user: 'Alice',
    avatar: 'https://placekitten.com/32/32',
    time: '10:00',
    text: 'Hello everyone!'
  },
  {
    id: 2,
    user: 'Bob',
    avatar: 'https://placekitten.com/33/33',
    time: '10:02',
    text: 'Hi Alice!'
  }
];

export default function App() {
  const [currentChannel, setCurrentChannel] = useState(channels[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [connected, setConnected] = useState(false);

  const handleSend = (text) => {
    const newMessage = {
      id: Date.now(),
      user: 'You',
      avatar: 'https://placekitten.com/34/34',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <Sidebar channels={channels} current={currentChannel} onSelect={setCurrentChannel} />
      <div className="flex flex-col flex-1">
        <div className="flex justify-end p-2 border-b border-gray-700">
          <VoiceButton connected={connected} onToggle={() => setConnected(!connected)} />
        </div>
        <ChatWindow messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
