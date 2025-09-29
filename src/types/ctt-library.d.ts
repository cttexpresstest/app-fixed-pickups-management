declare module '@ctt-library/header' {
  import * as React from 'react';
  export const Header: React.FC<{ title?: string }>;
}

declare module '@ctt-library/alert' {
  import * as React from 'react';
  export const Alert: React.FC<{ type?: 'success' | 'error' | 'info'; message: string }>;
}

declare module '@ctt-library/modal' {
  import * as React from 'react';
  export const Modal: React.FC<{ open: boolean; onClose: () => void; title?: string; children?: React.ReactNode }>;
}

declare module '@ctt-library/styles' {
  // side-effect styles import
  const styles: unknown;
  export default styles;
}

declare module '@ctt-library/auth' {
  export function useAuth(): { isAuthenticated: boolean };
}
