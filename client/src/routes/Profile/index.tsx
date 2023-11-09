import { useAuthContext } from '@/contexts/auth';

const Profile = () => {
  const { user } = useAuthContext();
  return (
    <section>
      <h3>Username: {user?.username}</h3>
      <p>Role: {user?.role}</p>
      <p>Deposit: {user?.deposit}</p>
    </section>
  );
};

export default Profile;
