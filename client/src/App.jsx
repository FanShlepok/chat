import React, { useEffect, useState, useRef } from 'react';
import Sidebar from './components/Sidebar.jsx';
import ChatWindow from './components/ChatWindow.jsx';
import MessageInput from './components/MessageInput.jsx';
import VoiceButton from './components/VoiceButton.jsx';

const initialMessages = {
  General: [],
  Random: [],
};

export default function App() {
  const [channel, setChannel] = useState('General');
  const [messages, setMessages] = useState(initialMessages);
  const [socket, setSocket] = useState(null);
  const [myId, setMyId] = useState(null);
  const channelRef = useRef('General');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4001');
    ws.onmessage = (event) => {
      let data = {};
      try {
        data = JSON.parse(event.data);
      } catch (_) {
        return;
      }

      if (data.type === 'id') {
        setMyId(data.id);
      } else if (data.type === 'chat') {
        const user = data.from === myId ? 'Me' : `User${data.from}`;
        setMessages((prev) => {
          const ch = channelRef.current;
          return {
            ...prev,
            [ch]: [
              ...(prev[ch] || []),
              {
                user,
                text: data.message,
                time: new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              },
            ],
          };
        });
      }
    };
    setSocket(ws);
    return () => ws.close();
  }, []);

  const addMessage = (text) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'chat', message: text }));
    }
  };

  return (
    <div className="h-screen flex bg-gray-900 text-gray-200">
      <Sidebar
        channels={Object.keys(messages)}
        current={channel}
        setCurrent={(ch) => {
          channelRef.current = ch;
          setChannel(ch);
        }}
      />
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
