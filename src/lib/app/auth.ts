import { useAuthStore } from '@/store';

export const requiresAuth = () => {
  const {
    auth: { isLoggedIn, session },
  } = useAuthStore.getState();

  if (!isLoggedIn) {
    throw new Error('User not logged in!!');
  }

  return session.user.id;
};
