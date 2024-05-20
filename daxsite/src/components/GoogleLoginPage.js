import React, { useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import withGoogleOAuthProvider from './withGoogleOAuthProvider'; // Import the HOC
import { UserContext } from './UserContext';


const GoogleLoginPage = () => {
  const {user, setUser} = useContext(UserContext); // User state

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        setUser(userInfo.data);
        console.log(userInfo.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        toast.error('Failed to fetch user info');
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
      toast.error('Login failed. Please try again.');
    },
  });

  return (
    <div>
      <ToastContainer />
      {!user ? (
        <div>
          <h2>Please log in to play the game</h2>
          <button onClick={googleLogin}>Login with Google</button>
        </div>
      ) : (
        <h2>Logged in as {user.given_name} </h2>
      )}
    </div>
  );
};

export default withGoogleOAuthProvider(GoogleLoginPage);
