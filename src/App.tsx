import * as React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
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

// Used when a user hits a route not defined below
const FourOhFour = (): JSX.Element => (
  <div>
    <h1>Page not found</h1>
    <p>
      Go back to <Link to='/'>Dashboard</Link>.
    </p>
  </div>
);

function App() {
  // function showSettings(event: MouseEvent<HTMLAnchorElement, MouseEvent>) {
  //   event.preventDefault();
  // }
  return (
    <EmeraldProvider>
      <Menu>
        <a id='home' className='menu-item' href='/'>
          <FcHome style={{ marginRight: '3px', verticalAlign: 'middle' }} />
          Home
        </a>
        <a id='orders' className='menu-item' href='/orders'>
          <BiCookie style={{ marginRight: '3px' }} />
          Orders
        </a>
        <a id='create' className='menu-item' href='/create'>
          <AiOutlineForm style={{ marginRight: '3px' }} />
          Create Order
        </a>
        <a id='calendar' className='menu-item' href='/calendar'>
          <FcCalendar style={{ marginRight: '3px' }} />
          Calendar
        </a>
        <hr />
        {/* <a onClick={showSettings} className='menu-item--small' href=''>
          Settings
        </a> */}
      </Menu>
      <Router history={history}>
        <Switch>
          <Route exact path='/' render={() => <Dashboard />} />
          <Route exact path='/orders' render={() => <Orders />} />
          <Route exact path='/create' render={() => <CreateOrder />} />
          <Route exact path='/calendar' render={() => <CalendarOrders />} />
          <Route component={FourOhFour} />
        </Switch>
      </Router>
    </EmeraldProvider>
  );
}

export default App;
