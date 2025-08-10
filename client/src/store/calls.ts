import { createContext, useContext, useState, ReactNode } from 'react';

interface Call {
  id: number;
  with: string;
}

interface CallStore {
  calls: Call[];
  addCall: (call: Call) => void;
}

const CallContext = createContext<CallStore | undefined>(undefined);

export const CallProvider = ({ children }: { children: ReactNode }) => {
  const [calls, setCalls] = useState<Call[]>([]);
  const addCall = (call: Call) => setCalls((prev) => [...prev, call]);
  return <CallContext.Provider value={{ calls, addCall }}>{children}</CallContext.Provider>;
};

export const useCallStore = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCallStore must be used within a CallProvider');
  }
  return context;
};
