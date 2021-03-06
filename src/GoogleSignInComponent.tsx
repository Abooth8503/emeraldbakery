import React, { FunctionComponent, useState } from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
// import video1 from './videos/AtTheBoothHeading.mp4';

interface GoogleSignInComponentProps {
  loginSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
}

export const GoogleSignInComponent: FunctionComponent<GoogleSignInComponentProps> = ({
  loginSuccess,
}) => {
  const [loginFailed, setLoginFailed] = useState<boolean>();

  return (
    <div className='text-center mb-4' style={{ marginTop: '10px' }}>
      <h1
        style={{
          fontFamily: 'AmaticSC-Bold',
          fontSize: '114px',
          color: 'violet',
          WebkitTextStroke: '2px black',
        }}
      >
        Welcome
      </h1>
      {loginFailed && (
        <div style={{ fontSize: 'larger' }}>Could not sign you in! Try again.</div>
      )}
      {/* <video src={video1} width='100%' height='400' autoPlay loop muted />
      <source src={video1} type='video/mp4' /> */}
      <p style={{ fontSize: 'larger' }}>Sign In</p>
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`}
        buttonText='Google'
        onSuccess={loginSuccess}// eslint-disable-next-line
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
