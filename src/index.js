import ReactDOM from 'react-dom/client';
import App from './App';
import { ModalProvider } from './context/modal-context';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import './i18n.js';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <HelmetProvider>
    <ModalProvider>
      <App />
    </ModalProvider>
  </HelmetProvider>
);
