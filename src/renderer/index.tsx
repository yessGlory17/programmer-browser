import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';

const theme = extendTheme({
  styles: {
    global: () => ({
      body: 'tranparent',
    }),
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          transform: 'scale(1)',
        },
      },
    },
    Accordion: {
      baseStyle: {
        _hover: {
          transform: 'scale(1)',
        },
      },
    },
  },
});

const container = document.getElementById('root');
const root = container && createRoot(container);

root?.render(
  <ChakraProvider resetCSS theme={theme}>
    <App />
  </ChakraProvider>
);

// calling IPC exposed from preload script
// window.electron.ipcRenderer.once('ipc-example', (arg) => {
//   // eslint-disable-next-line no-console
//   console.log(arg);
// });
// window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
