import React, { useEffect, useRef, useState } from 'react';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://${window.location.hostname}:4001`);
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'chat') {
        setMessages((prev) => [...prev, data.message]);
      }
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && ws.current) {
      ws.current.send(JSON.stringify({ type: 'chat', message: input }));
      setInput('');
    }
  };

  return (
    <div className="mt-4">
      <div className="border h-64 overflow-y-auto p-2 bg-white">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-1">
            {msg}
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          className="flex-1 border p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
