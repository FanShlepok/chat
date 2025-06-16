import React from 'react';

export default function Sidebar({ channels, current, setCurrent }) {
  return (
    <div className="w-48 bg-gray-800 text-gray-200 flex-shrink-0">
      <h2 className="text-lg font-semibold p-4 border-b border-gray-700">Channels</h2>
      {channels.map((ch) => (
        <button
          key={ch}
          onClick={() => setCurrent(ch)}
          className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${current === ch ? 'bg-gray-700' : ''}`}
        >
          {ch}
        </button>
      ))}
    </div>
  );
}
