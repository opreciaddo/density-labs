/* Context to handle data */
import { FC, PropsWithChildren, createContext, useState } from "react";


// Context-props typing
type DataContextType = {
  updateData: boolean;
  setUpdateData: (update: boolean) => void;
}

export const DataContext = createContext<DataContextType>({
  updateData: false,
  setUpdateData: () => {}
});

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {

  const [updateData, setUpdateData] = useState(false);
  const value = { updateData, setUpdateData };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
