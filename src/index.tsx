import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
// v9 compat packages are API compatible with v8 code
import firebases from './firebase';

console.log(firebases);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
