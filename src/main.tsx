import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { router } from './app/routes';
import { useLocaleMessages } from './i18n';
import '@ctt-library/styles';
import './styles/index.css';

const Root = () => {
  const { locale, messages } = useLocaleMessages();
  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale="es">
      <RouterProvider router={router} />
    </IntlProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
