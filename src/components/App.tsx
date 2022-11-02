import { useState } from 'react';
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
  const [isLoggedIn, setIsLoggedIn] = useState<UserInfo | null>(
    authService.currentUser,
  );

  return (
    <>
      <Router isLoggedIn={isLoggedIn} />
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
