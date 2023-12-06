import React, { createContext, useState, useContext, ReactNode } from 'react';
import defaultContextValue, { AppContextType, RewardsOption } from '../types/AppContextTypes';

const AppContext = createContext<AppContextType>(defaultContextValue);

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [question, setQuestion] = useState<string>('How happy is Farhat?');
  const [rewards, setRewards] = useState<RewardsOption[]>([
    { value: 'reward1', label: 'Reward 1' },
    { value: 'reward2', label: 'Reward 2' },
    { value: 'reward3', label: 'Reward 3' },
  ]);

  return (
    <AppContext.Provider value={{ question, rewards, setQuestion, setRewards }}>
      {children}
    </AppContext.Provider>
  );
};
