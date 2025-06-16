
import { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input }]);
    setInput('');
  };

  return (
    <div className="flex h-screen text-white bg-gray-900">
      <aside className="w-64 bg-gray-800 p-4">
        <h2 className="text-lg font-bold mb-4">Channels</h2>
        <ul>
          <li className="text-blue-400"># general</li>
          <li># random</li>
        </ul>
        <button className="mt-6 bg-blue-600 px-4 py-2 rounded">Join Voice</button>
      </aside>
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-2">{msg.text}</div>
          ))}
        </div>
        <div className="p-4 flex border-t border-gray-700">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 p-2 rounded"
          />
          <button onClick={sendMessage} className="ml-2 bg-blue-500 px-4 py-2 rounded">
            Send
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
