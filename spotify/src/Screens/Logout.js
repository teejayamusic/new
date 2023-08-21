import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { removeCookie } from '../utils/cookieUtils'; // Define your own utility function for cookie removal

function Logout() {
  const navigate = useNavigate();
  const [, , removeTokenCookie] = useCookies(['token']);

  const handleLogout = () => {
    // Remove the token cookie
    removeTokenCookie('token');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div>
      {/* Add a "Logout" button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
