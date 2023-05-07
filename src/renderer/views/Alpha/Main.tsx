import { useContext } from 'react';
import { TabPanel } from 'renderer/components/Tab';
import { TabContext } from 'renderer/context/Alpha/TabContext';

function Main() {
  const { tabs } = useContext(TabContext);

  return (
    <>
      {tabs?.map((_, index) => (
        <TabPanel index={index} />
      ))}
    </>
  );
}

export default Main;
