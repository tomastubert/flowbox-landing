declare global {
  interface Window {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     flowbox: (method: string, options?: any) => any
  }
}

export {};