export default function Sidebar({ channels, current, onSelect }) {
  return (
    <div className="w-48 bg-gray-900 p-2 space-y-1 overflow-y-auto">
      {channels.map((c) => (
        <div
          key={c.id}
          onClick={() => onSelect(c)}
          className={`p-2 rounded cursor-pointer hover:bg-gray-700 ${
            current.id === c.id ? 'bg-gray-700' : ''
          }`}
        >
          #{c.name}
        </div>
      ))}
    </div>
  );
}
