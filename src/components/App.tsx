import { useEffect, useState } from 'react';
import Router from '@components/Router';
// v9 compat packages are API compatible with v8 code

import { authService, firebaseUserType } from '@/fbConfig';
import { useSetRecoilState } from 'recoil';
import { userObjState } from '@/atoms/atom';

function App() {
  const [init, setInit] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const setUserObj = useSetRecoilState(userObjState);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <Router isLoggedIn={isLoggedIn} /> : 'Initializing...'}
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </>
  );
}

export default App;
