import React, { FC, createContext, ReactNode } from 'react';

interface IAppData {
  language: string;
  //token:string,
  //refreshToken:string,
  customerName?: string;
  role?: string;
  clientId?: string;
  plantId?: string;
  plantName?: string;
  source?: string;
}

interface IContextType {
  data: IAppData;
  updateContext: Function;
}

const AppDataContext = createContext<IContextType | undefined>(undefined);
const AppDataProvider: FC<{
  defaultAppData: IContextType;
  children: ReactNode;
}> = ({ defaultAppData, children }) => {
  return (
    <AppDataContext.Provider value={defaultAppData}>
      {children}
    </AppDataContext.Provider>
  );
};

export type { IAppData, IContextType };
export { AppDataContext, AppDataProvider };
