import React, { FunctionComponent, useState } from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { BiFontSize } from 'react-icons/bi';

interface GoogleSignInComponentProps {
  loginSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
}

export const GoogleSignInComponent: FunctionComponent<GoogleSignInComponentProps> = ({
  loginSuccess,
}) => {
  const [loginFailed, setLoginFailed] = useState<boolean>();

  return (
    <div className='text-center mb-4' style={{ marginTop: '300px' }}>
      <h1
        className='h3 mb-3 font-weight-normal'
        style={{ fontFamily: 'AmaticSC-Bold', fontSize: 'xxx-large' }}
      >
        Welcome to Emerald Bakery.
      </h1>
      {loginFailed && (
        <div style={{ fontSize: 'larger' }}>Could not sign you in! Try again.</div>
      )}
      <p style={{ fontSize: 'larger' }}>Sign In</p>
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`}
        buttonText='Google'
        onSuccess={loginSuccess}
        onFailure={(response: any) => {
          setLoginFailed(true);
        }}
        isSignedIn={true}
        cookiePolicy={'single_host_origin'}
        responseType='code,token'
      />
    </div>
  );
};
