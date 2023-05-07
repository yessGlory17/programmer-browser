import { createContext, useState } from 'react';

type SidebarToggleContextProps = {
  isOpen: boolean;
  toggle: () => void;
};

export const SidebarToggleContext = createContext<
  Partial<SidebarToggleContextProps>
>({});

type SidebarToggleProviderProps = {
  children: React.ReactNode;
};

export function SidebarToggleProvider({
  children,
}: SidebarToggleProviderProps) {
  const [isOpen, setOpen] = useState<boolean>(true);

  const toggle = () => {
    setOpen(!isOpen);
  };

  return (
    <SidebarToggleContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarToggleContext.Provider>
  );
}
