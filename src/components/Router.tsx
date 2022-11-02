import { HashRouter, Routes, Route } from 'react-router-dom';
import Auth from '@/routes/Auth';
import Home from '@/routes/Home';

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
  isLoggedIn: UserInfo | null;
}
export default ({ isLoggedIn }: IRouterProps) => {
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
