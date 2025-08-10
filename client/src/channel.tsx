import { useState } from 'react';
import { useCallStore } from './store/calls';

function Channel() {
  const { addCall } = useCallStore();
  const [open, setOpen] = useState(false);

  const callClickHandler = () => {
    addCall({ id: Date.now(), with: 'stub-user' });
    setOpen(true);
  };

  return (
    <div>
      <button onClick={callClickHandler} className="mt-6 bg-blue-600 px-4 py-2 rounded">
        Join Voice
      </button>
      {open && (
        <div className="mt-4 p-4 bg-gray-800 rounded">
          <p>Call dialog placeholder</p>
        </div>
      )}
    </div>
  );
}

export default Channel;
