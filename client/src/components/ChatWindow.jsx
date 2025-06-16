import React from 'react';

export default function ChatWindow({ messages }) {
  return (
    <div className="flex-1 flex flex-col justify-end overflow-y-auto p-4 space-y-2">
      {messages.map((msg, idx) => (
        <div key={idx} className="flex items-start space-x-2">
          <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          <div>
            <div className="text-sm text-gray-400">{msg.user} <span className="ml-1 text-xs">{msg.time}</span></div>
            <div className="text-gray-200">{msg.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
