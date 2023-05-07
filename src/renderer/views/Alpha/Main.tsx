import { useContext } from 'react';
import { TabContext } from 'renderer/context/Alpha/TabContext';
import { TabPanel } from 'renderer/components/Tab/Tab';

function Main() {
  const { tabs } = useContext(TabContext);

  return (
    <>
      {tabs?.map((_, index) => {
        return <TabPanel index={index} />;
      })}
    </>
  );
}

export default Main;
