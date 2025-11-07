declare global {
  interface Window {
    flowbox?: (action: string, options: { container: string; key: string; locale?: string }) => void;
  }
}

export {};