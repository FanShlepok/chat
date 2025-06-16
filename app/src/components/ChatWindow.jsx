export default function ChatWindow({ messages }) {
  return (
    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
      {messages.map((m) => (
        <div key={m.id} className="flex items-start space-x-2">
          <img src={m.avatar} className="w-8 h-8 rounded-full" />
          <div>
            <div className="text-xs text-gray-400">
              {m.user} <span className="ml-2 text-[10px]">{m.time}</span>
            </div>
            <div>{m.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
