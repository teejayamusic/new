import { removeCookie } from 'react-cookie';

// Utility function to remove the token cookie
export const removeTokenCookie = () => {
  removeCookie('token', { path: '/' });
};
