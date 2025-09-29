import { useMemo } from 'react';
import es from './messages/es.json';
import en from './messages/en.json';

export const useLocaleMessages = () => {
  const locale = (navigator.language || 'es').startsWith('es') ? 'es' : 'en';
  const messages = useMemo(() => (locale === 'es' ? es : en), [locale]);
  return { locale, messages } as const;
};
