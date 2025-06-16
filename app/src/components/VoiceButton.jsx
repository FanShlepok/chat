export default function VoiceButton({ connected, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`px-4 py-2 rounded text-white ${connected ? 'bg-red-600' : 'bg-blue-600'}`}
    >
      {connected ? 'Leave Voice' : 'Join Voice'}
    </button>
  );
}
