import React, { useState } from 'react';

export default function MessageInput({ onSend }) {
  const [value, setValue] = useState('');

  const send = () => {
    if (value.trim()) {
      onSend(value.trim());
      setValue('');
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      send();
    }
  };

  return (
    <div className="p-4 border-t border-gray-700 bg-gray-800 flex">
      <input
        className="flex-1 bg-gray-700 text-gray-200 p-2 rounded focus:outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKey}
        placeholder="Message"
      />
      <button
        onClick={send}
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Send
      </button>
    </div>
  );
}
