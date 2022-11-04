import { authService } from '@/fbConfig';

const Profile = () => {
  const handleLogOut = () => {
    authService.signOut();
  };
  return (
    <>
      <button onClick={handleLogOut}>Log Out</button>
    </>
  );
};

export default Profile;
