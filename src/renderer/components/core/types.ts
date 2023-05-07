export type WebViewOverride = {
  canGoBack: () => void;
  goBack: () => void;
  canGoForward: () => void;
  goForward: () => void;
  isLoading: () => void;
  stop: () => void;
  reload: () => void;
  getTitle: () => string;
  findInPage: (text: string, options: Object) => any;
  stopFindInPage: (action: string) => any;
} & HTMLWebViewElement;
