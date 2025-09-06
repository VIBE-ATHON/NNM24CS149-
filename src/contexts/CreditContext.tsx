import { createContext, useContext, useState, ReactNode } from 'react';

interface CreditContextType {
  credits: number;
  earnCredits: (amount: number, reason: string) => void;
  spendCredits: (amount: number, reason: string) => boolean;
  creditHistory: CreditTransaction[];
}

interface CreditTransaction {
  id: string;
  type: 'earned' | 'spent';
  amount: number;
  reason: string;
  timestamp: string;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export function CreditProvider({ children }: { children: ReactNode }) {
  const [credits, setCredits] = useState(100); // Starting credits
  const [creditHistory, setCreditHistory] = useState<CreditTransaction[]>([
    {
      id: '1',
      type: 'earned',
      amount: 100,
      reason: 'Welcome bonus',
      timestamp: new Date().toISOString()
    }
  ]);

  const earnCredits = (amount: number, reason: string) => {
    setCredits(prev => prev + amount);
    const transaction: CreditTransaction = {
      id: Date.now().toString(),
      type: 'earned',
      amount,
      reason,
      timestamp: new Date().toISOString()
    };
    setCreditHistory(prev => [transaction, ...prev]);
  };

  const spendCredits = (amount: number, reason: string): boolean => {
    if (credits >= amount) {
      setCredits(prev => prev - amount);
      const transaction: CreditTransaction = {
        id: Date.now().toString(),
        type: 'spent',
        amount,
        reason,
        timestamp: new Date().toISOString()
      };
      setCreditHistory(prev => [transaction, ...prev]);
      return true;
    }
    return false;
  };

  return (
    <CreditContext.Provider value={{ credits, earnCredits, spendCredits, creditHistory }}>
      {children}
    </CreditContext.Provider>
  );
}

export function useCredits() {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditProvider');
  }
  return context;
}