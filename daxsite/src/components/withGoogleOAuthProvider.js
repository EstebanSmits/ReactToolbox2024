import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const withGoogleOAuthProvider = (Component) => {
  return (props) => (
    <GoogleOAuthProvider clientId="1002660029597-a22ce1c7amr6cr47idh9f04f2lf8fse5.apps.googleusercontent.com">
      <Component {...props} />
    </GoogleOAuthProvider>
  );
};

export default withGoogleOAuthProvider;
