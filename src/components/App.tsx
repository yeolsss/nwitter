import { useEffect, useState } from 'react';
import Router from '@components/Router';
// v9 compat packages are API compatible with v8 code

import { authService } from '@/fbConfig';

interface UserInfo {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  /**
   * The user's unique ID.
   */
  uid: string;
}

function App() {
  const [init, setInit] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<UserInfo | null>(
    authService.currentUser,
  );

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <Router isLoggedIn={isLoggedIn} /> : 'inital...'}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
