import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from '@/routes/Auth';
import Home from '@/routes/Home';
import Navigation from '@components/Navigation';
import Profile from '@/routes/Profile';

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

interface IRouterProps {
  isLoggedIn: boolean;
}
export default ({ isLoggedIn }: IRouterProps) => {
  return (
    <HashRouter basename={import.meta.env.BASE_URL}>
      {isLoggedIn ? <Navigation /> : null}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Auth />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        )}
      </Routes>
    </HashRouter>
  );
};
