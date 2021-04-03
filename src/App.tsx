import * as React from 'react';
import { useState, useEffect } from 'react';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { EmeraldProvider } from './Interfaces/EmeraldTypes';
import Dashboard from './Common/Dashboard';
import Orders from './Orders';
import CreateOrder from './Forms/CreateOrder';
import CalendarOrders from './CalendarOrders';
import './css/burgerMenu.css';
import { FcGoogle } from 'react-icons/fc';
import GMap from './Gmap';
import OrderDetail from './OrderDetail';
import { GoogleSignInComponent } from './GoogleSignInComponent';
import { GoogleLogout } from 'react-google-login';
import OrderTypeForm from './Admin/OrderTypeForm';
import Nav from './Nav';

// Used when a user hits a route not defined below
const FourOhFour = (): JSX.Element => (
  <div>
    <h1>Page not found</h1>
    <p>
      Go back to <Link to={process.env.PUBLIC_URL + '/'}>Homepage</Link>.
    </p>
  </div>
);

const logoutBtnStyles = {
  marginBottom: '10px',
  backgroundColor: 'rgb(255, 255, 255)',
  display: 'inline-flex',
  alignItems: 'center',
  color: 'rgba(0, 0, 0, 0.54)',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px',
  padding: '0px',
  borderRadius: '2px',
  border: '1px solid transparent',
  fontSize: '14px',
  fontFamily: 'Roboto, sans-serif',
  top: '97%',
  transform: 'translateY(-50%)',
  position: 'fixed',
  marginLeft: '5px',
} as React.CSSProperties;



function App(): JSX.Element {
  const [googleAccessToken, setGoogleAccessToken] = useState<string>('');
  const [loggedInUserEmail, setLoggedInUserEmail] = useState<string>('');
  const [loggedInUserName, setLoggedInUserName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');
  window.OneSignal = window.OneSignal || [];
  const OneSignal = window.OneSignal;

  useEffect(() => {
    OneSignal.push(() => {
      OneSignal.init(
        {
          appId: `${process.env.REACT_APP_ONESIGNAL}`, //STEP 9
          promptOptions: {
            slidedown: {
              enabled: true,
              actionMessage: "We'd like to show you notifications for the latest Orders.",
              acceptButtonText: 'Sure!',
              cancelButtonText: 'No Thanks',
              categories: {
                tags: [
                  {
                    tag: 'orders',
                    label: 'BakeryOrders',
                  },
                ],
              },
            },
          },
          welcomeNotification: {
            title: 'At The Booth Bakery',
            message: 'Thanks for subscribing!',
          },
        },
        //Automatically subscribe to the new_app_version tag
        OneSignal.sendTag('new_app_version', 'new_app_version', (tagsSent: any) => {
          // Callback called when tag has finished sending
          console.log('new_app_version TAG SENT', tagsSent);
        })
      );
    });
  }, []);

  const componentToDisplay: JSX.Element = (
    <GoogleSignInComponent
      loginSuccess={(response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if ('tokenId' in response) {
          setLoggedInUserEmail(response.profileObj.email);
          setLoggedInUserName(response.profileObj.name);
          setProfileImage(response.profileObj.imageUrl);
          setGoogleAccessToken(response.tokenId);
        }
      }}
    />
  );

  const logoutSuccess = (): void => {
    setGoogleAccessToken('');
  };

  console.log('public url', process.env.PUBLIC_URL, process.env.NODE_ENV);
  return (
    <React.Fragment>
      {googleAccessToken &&
        (loggedInUserEmail === 'azrael7@gmail.com' ||
          loggedInUserEmail === 'abooth8503@gmail.com' ||
          loggedInUserEmail === 'jbooth6985@gmail.com' ||
          loggedInUserEmail === 'dlbooth64@gmail.com' ||
          loggedInUserEmail === 'frank.pigeonjr@gmail.com') && (
          <EmeraldProvider>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
              <div className='App' id='outer-container' style={{ height: '100%' }}>
                <Nav outerContainerId={'outer-container'} pageWrapId={'page-wrap'}></Nav>
                <div id='page-wrap'>
                  <Switch>
                    <Route
                      exact
                      path='/'
                      render={() => <Dashboard userName={loggedInUserName} />}
                    />
                    <Route
                      exact
                      path='/orders'
                      render={(props) => <Orders {...props} />}
                    />
                    <Route
                      exact
                      path='/create'
                      render={(props) => (
                        <CreateOrder
                          user={loggedInUserEmail}
                          routeComponentProps={props}
                        />
                      )}
                    />
                    <Route
                      exact
                      path='/calendar'
                      render={(props) => <CalendarOrders {...props} />}
                    />
                    <Route exact path='/map' render={() => <GMap />} />
                    <Route
                      exact
                      path='/detail'
                      render={(props) => <OrderDetail {...props} />}
                    />
                    <Route
                      exact
                      path='/ordertypes'
                      render={() => <OrderTypeForm user={loggedInUserEmail} />}
                    />
                    <Route component={FourOhFour} />
                  </Switch>
                </div>
              </div>
            </BrowserRouter>
            {loggedInUserName ? (
              <div
                style={{
                  position: 'fixed',
                  bottom: '0',
                  width: '98%',
                  marginRight: '5px',
                  height: '42px',
                }}
              >
                <GoogleLogout
                  render={(renderProps) => (
                    <button onClick={renderProps.onClick} style={logoutBtnStyles}>
                      <div
                        style={{
                          marginRight: '10px',
                          background: 'rgb(255, 255, 255)',
                          padding: '10px',
                          borderRadius: '2px',
                        }}
                      >
                        <FcGoogle size={20}></FcGoogle>
                      </div>
                      <span style={{ padding: '10px 10px 10px 0px', fontWeight: 500 }}>
                        Logout
                      </span>
                    </button>
                  )}
                  clientId={`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`}
                  buttonText='Logout'
                  onLogoutSuccess={logoutSuccess}
                ></GoogleLogout>
                <div className='text-right' style={{ fontFamily: 'Andika-R' }}>
                  <span style={{ marginLeft: '58px' }}>
                    Logged in User: {loggedInUserName}
                  </span>
                  <Image
                    src={profileImage}
                    style={{ height: '35px', marginLeft: '5px' }}
                    roundedCircle
                  ></Image>
                </div>
              </div>
            ) : null}
          </EmeraldProvider>
        )}
      {googleAccessToken ? null : componentToDisplay}

      {googleAccessToken &&
      !(
        loggedInUserEmail === 'azrael7@gmail.com' ||
        loggedInUserEmail === 'abooth8503@gmail.com' ||
        loggedInUserEmail === 'jbooth6985@gmail.com' ||
        loggedInUserEmail === 'dlbooth64@gmail.com'
      ) &&
      loggedInUserEmail.length > 0 ? (
        <div>
          Unauthorized Access: please email:{' '}
          <a href='email:azrael7@gmail.com'>azrael7@gmail.com</a>
          <GoogleLogout
            clientId={`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`}
            buttonText='Logout'
            onLogoutSuccess={logoutSuccess}
          ></GoogleLogout>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default App;
