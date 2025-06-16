import React, { useState } from 'react';

export default function VoiceButton() {
  const [online, setOnline] = useState(false);

  const toggle = () => {
    setOnline((prev) => !prev);
  };

  return (
    <button
      onClick={toggle}
      className={`px-4 py-2 rounded text-white ${online ? 'bg-green-600' : 'bg-red-600'}`}
    >
      {online ? 'Voice Online' : 'Join Voice'}
    </button>
  );
}
