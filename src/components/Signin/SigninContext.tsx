import { createContext } from 'react';

export interface SigninContextProps {
  tabUtil?: {
    addTab: (id: string) => void;
    removeTab: (id: string) => void;
  };
  updateActive?: (activeItem: { [key: string]: string } | string) => void;
}

const SigninContext: React.Context<SigninContextProps> = createContext({});

export default SigninContext;
