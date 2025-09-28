import { cloneElement, createContext, useContext, useState } from 'react';

const TabContext = createContext();

function Tabs({ children, defaultOpenTab }) {
  const [opens, setOpens] = useState(defaultOpenTab);
  const open = setOpens;
  return (
    <TabContext.Provider value={{ opens, open }}>
      {children}
    </TabContext.Provider>
  );
}

function Button({ children, opens: openTabName }) {
  const { open, opens } = useContext(TabContext);
  const isOpen = opens === openTabName;

  return cloneElement(children, {
    onClick: () => open(openTabName),
    $isOpen: isOpen,
  });
}

function Window({ children, name }) {
  const { opens } = useContext(TabContext);

  if (name !== opens) return null;

  return <>{children}</>;
}

Tabs.Button = Button;
Tabs.Window = Window;

export default Tabs;
