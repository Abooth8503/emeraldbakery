import * as React from 'react';
import { useState } from 'react';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { slide as Menu } from 'react-burger-menu';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { EmeraldProvider } from './Interfaces/EmeraldTypes';
import Dashboard from './Common/Dashboard';
// import history from './Common/History';
import Orders from './Orders';
import CreateOrder from './Forms/CreateOrder';
import CalendarOrders from './CalendarOrders';
import './css/burgerMenu.css';
import { FcHome, FcGoogle } from 'react-icons/fc';
import { BiCookie } from 'react-icons/bi';
import { AiOutlineForm } from 'react-icons/ai';
import { FcCalendar } from 'react-icons/fc';
import { FaMap } from 'react-icons/fa';
import GMap from './Gmap';
import OrderDetail from './OrderDetail';
import { GoogleSignInComponent } from './GoogleSignInComponent';
import { GoogleLogout } from 'react-google-login';

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
  // fontWeight: 500,
  fontFamily: 'Roboto, sans-serif',
  top: '97%',
  transform: 'translateY(-50%)',
  position: 'fixed',
  marginLeft: '5px',
} as React.CSSProperties;

function App() {
  const [googleAccessToken, setGoogleAccessToken] = useState<string>('');
  const [loggedInUserEmail, setLoggedInUserEmail] = useState<string>('');
  const [loggedInUserName, setLoggedInUserName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');

  const componentToDisplay: any = (
    <GoogleSignInComponent
      loginSuccess={(response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if ('tokenId' in response) {
          console.log('response: ', response);
          setLoggedInUserEmail(response.profileObj.email);
          setLoggedInUserName(response.profileObj.name);
          setProfileImage(response.profileObj.imageUrl);
          setGoogleAccessToken(response.tokenId);
        }
      }}
    />
  );

  const logoutSuccess = () => {
    setGoogleAccessToken('');
  };

  console.log('public url', process.env.PUBLIC_URL);

  return (
    <React.Fragment>
      {googleAccessToken &&
        (loggedInUserEmail === 'azrael7@gmail.com' ||
          loggedInUserEmail === 'abooth8503@gmail.com' ||
          loggedInUserEmail === 'jbooth6985@gmail.com' ||
          loggedInUserEmail === 'dlbooth64@gmail.com' ||
          loggedInUserEmail === 'frank.pigeonjr@gmail.com') && (
          <EmeraldProvider>
            <Menu>
              <a id='home' className='menu-item' href={process.env.PUBLIC_URL + '/'}>
                <FcHome style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                Home
              </a>
              <a
                id='calendar'
                className='menu-item'
                href={process.env.PUBLIC_URL + '/calendar'}
              >
                <FcCalendar style={{ marginRight: '5px' }} />
                Calendar
              </a>
              <a
                id='create'
                className='menu-item'
                href={process.env.PUBLIC_URL + '/create'}
              >
                <AiOutlineForm style={{ marginRight: '5px' }} />
                Create Order
              </a>
              <a
                id='orders'
                className='menu-item'
                href={process.env.PUBLIC_URL + '/orders'}
              >
                <BiCookie style={{ marginRight: '5px' }} />
                Orders
              </a>
              <a id='orders' className='menu-item' href={process.env.PUBLIC_URL + '/map'}>
                <FaMap style={{ marginRight: '5px' }} />
                Map
              </a>
              <hr />
            </Menu>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
              <Switch>
                <Route
                  exact
                  path='/'
                  render={() => <Dashboard userName={loggedInUserName} />}
                />
                <Route exact path='/orders' render={(props) => <Orders {...props} />} />
                <Route
                  exact
                  path='/create'
                  render={(props) => (
                    <CreateOrder user={loggedInUserEmail} routeComponentProps={props} />
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
                <Route component={FourOhFour} />
              </Switch>
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

      {googleAccessToken === '' &&
      !(
        loggedInUserEmail === 'azrael7@gmail.com' ||
        loggedInUserEmail === 'abooth8503@gmail.com' ||
        loggedInUserEmail === 'jbooth6985@gmail.com' ||
        loggedInUserEmail === 'dlbooth64@gmail.com'
      ) &&
      loggedInUserEmail.length > 0 ? (
        <div style={{ fontFamily: 'Andika-R' }}>
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
