import * as React from 'react';
import { useState } from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { EmeraldProvider } from './Interfaces/EmeraldTypes';
import Dashboard from './Common/Dashboard';
import history from './Common/History';
import Orders from './Orders';
import CreateOrder from './Forms/CreateOrder';
import CalendarOrders from './CalendarOrders';
import './css/burgerMenu.css';
import { FcHome } from 'react-icons/fc';
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
      Go back to <Link to='/'>Homepage</Link>.
    </p>
  </div>
);

function App() {
  const [googleAccessToken, setGoogleAccessToken] = useState<string>('');
  const [loggedInUserEmail, setLoggedInUserEmail] = useState<string>('');
  const [loggedInUserName, setLoggedInUserName] = useState<string>('');

  const componentToDisplay: any = (
    <GoogleSignInComponent
      loginSuccess={(response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if ('tokenId' in response) {
          console.log('response: ', response);
          setLoggedInUserEmail(response.profileObj.email);
          setLoggedInUserName(response.profileObj.name);

          setGoogleAccessToken(response.tokenId);
        }
      }}
    />
  );

  const logoutSuccess = () => {
    setGoogleAccessToken('');
  };

  return (
    <React.Fragment>
      {googleAccessToken &&
        (loggedInUserEmail === 'azrael7@gmail.com' ||
          loggedInUserEmail === 'abooth8503@gmail.com') && (
          <EmeraldProvider>
            <Menu>
              <a id='home' className='menu-item' href='/'>
                <FcHome style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                Home
              </a>
              <a id='calendar' className='menu-item' href='/calendar'>
                <FcCalendar style={{ marginRight: '5px' }} />
                Calendar
              </a>
              <a id='create' className='menu-item' href='/create'>
                <AiOutlineForm style={{ marginRight: '5px' }} />
                Create Order
              </a>
              <a id='orders' className='menu-item' href='/orders'>
                <BiCookie style={{ marginRight: '5px' }} />
                Orders
              </a>
              <a id='orders' className='menu-item' href='/map'>
                <FaMap style={{ marginRight: '5px' }} />
                Map
              </a>
              <hr />
            </Menu>
            <Router history={history}>
              <Switch>
                <Route
                  exact
                  path={process.env.PUBLIC_URL + '/'}
                  render={() => <Dashboard userName={loggedInUserName} />}
                />
                <Route exact path='/orders' render={(props) => <Orders {...props} />} />
                <Route
                  exact
                  path={process.env.PUBLIC_URL + '/create'}
                  render={(props) => <CreateOrder {...props} />}
                />
                <Route
                  exact
                  path={process.env.PUBLIC_URL + '/calendar'}
                  render={(props) => <CalendarOrders {...props} />}
                />
                <Route exact path='/map' render={() => <GMap />} />
                <Route
                  exact
                  path={process.env.PUBLIC_URL + '/detail'}
                  render={(props) => <OrderDetail {...props} />}
                />
                <Route component={FourOhFour} />
              </Switch>
            </Router>
            {loggedInUserName ? (
              <div
                className='text-right'
                style={{
                  position: 'fixed',
                  bottom: '0',
                  width: '98%',
                  marginRight: '5px',
                }}
              >
                <GoogleLogout
                  clientId={`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`}
                  buttonText='Logout'
                  onLogoutSuccess={logoutSuccess}
                  style={{ marginBottom: '5px' }}
                ></GoogleLogout>
                <span style={{ marginLeft: '86px' }}>
                  Logged in User: {loggedInUserName}
                </span>
              </div>
            ) : null}
          </EmeraldProvider>
        )}
      {googleAccessToken ? null : componentToDisplay}
    </React.Fragment>
  );
}

export default App;
