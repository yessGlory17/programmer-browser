import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: string): void;
        on(
          channel: string,
          func: (...args: string[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: string[]) => void): void;
      };
    };
  }
}

export {};
