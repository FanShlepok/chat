import React from 'react';
import ChatBox from './components/ChatBox.jsx';
import VoiceChat from './components/VoiceChat.jsx';

export default function App() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">WebRTC Chat</h1>
      <VoiceChat />
      <ChatBox />
    </div>
  );
}
