import { useEffect } from 'react';
import ShortcutKeys from './ShortcutKeys';

const useHotkeys = (
  shortcut: string,
  execute: (event?: KeyboardEvent) => void
) => {
  const keydown = (event: KeyboardEvent) => {
    const parsed = shortcut.split('+');

    switch (parsed[0]) {
      case ShortcutKeys.CTRL:
        if (event.ctrlKey && event.code === parsed[1]) {
          execute(event);
        }
        break;
      case ShortcutKeys.ALT:
        if (event.altKey && event.code === parsed[1]) {
          execute(event);
        }
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keydown);

    return () => {
      window.removeEventListener('keydown', keydown);
    };
  }, [execute, shortcut]);
};
export default useHotkeys;
