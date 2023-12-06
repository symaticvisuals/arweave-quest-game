export interface RewardsOption {
    value: string;
    label: string;
  }
  
  export interface AppContextType {
    question: string;
    rewards: RewardsOption[];
    setQuestion: React.Dispatch<React.SetStateAction<string>>;
    setRewards: React.Dispatch<React.SetStateAction<RewardsOption[]>>;
  }
  
  const defaultContextValue: AppContextType = {
    question: '',
    rewards: [],
    setQuestion: () => {},
    setRewards: () => {},
  };
  
  export default defaultContextValue;
  