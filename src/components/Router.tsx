import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

export default () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <HashRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </HashRouter>
  );
};
