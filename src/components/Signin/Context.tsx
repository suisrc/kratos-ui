import { createContext } from 'react';

export interface ContextProps {
  tabUtil?: {
    addTab: (id: string) => void;
    removeTab: (id: string) => void;
  };
  updateActive?: (activeItem: { [key: string]: string } | string) => void;
}

const ContextProps: React.Context<ContextProps> = createContext({});

export default ContextProps;
