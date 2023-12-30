import { createContext, useState } from "react";

interface IThemeContextInterface {
  darkmode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<IThemeContextInterface>({
  darkmode: false,
  toggleDarkMode: () => {},
});

interface IThemeContextProviderProps  {
  children: React.ReactNode;
}

const ThemeContextProvider = ({ children } : IThemeContextProviderProps ) => {
  const [darkmode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode: () => void = () => {
    setDarkMode((prevState) => !prevState);
  };

  return (
    <ThemeContext.Provider value={{ darkmode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};


export default ThemeContextProvider;