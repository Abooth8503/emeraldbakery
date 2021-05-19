import * as React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { FcHome } from 'react-icons/fc';
import { BiCookie } from 'react-icons/bi';
import { AiOutlineForm } from 'react-icons/ai';
import { FcCalendar } from 'react-icons/fc';
import { FaMap, FaClipboardList } from 'react-icons/fa';

const BoothNavbar = (): JSX.Element => (
  <Navbar bg='dark' variant='dark'>
    <Navbar.Brand href='#home'>At The Booth Admin</Navbar.Brand>
    <Nav className='mr-auto'>
      <Link to='/'>
        <Nav.Link href='#home'>
          <FcHome size={28} style={{ marginBottom: '3px', marginRight: '4px' }} />
          Home
        </Nav.Link>
      </Link>
      <Link to='/Calendar'>
        <Nav.Link href='#features'>
          <FcCalendar size={28} style={{ marginBottom: '3px', marginRight: '4px' }} />
          Calendar
        </Nav.Link>
      </Link>
      <Link to='/Create'>
        <Nav.Link href='#pricing'>
          <AiOutlineForm
            size={28}
            color='Black'
            style={{ marginBottom: '3px', marginRight: '4px' }}
          />
          Create Order
        </Nav.Link>
      </Link>
      <Link to='/Orders'>
        <Nav.Link href='#orders'>
          <BiCookie
            size={28}
            color='#ef89bb'
            style={{ marginBottom: '3px', marginRight: '4px' }}
          />
          Orders
        </Nav.Link>
      </Link>
      <Link to='/Map'>
        <Nav.Link href='#orders'>
          <FaMap
            size={28}
            color='Blue'
            style={{ marginBottom: '3px', marginRight: '4px' }}
          />
          Map
        </Nav.Link>
      </Link>
      <Link to='/ordertypes'>
        <Nav.Link href='#orders'>
          <FaClipboardList
            size={28}
            style={{ marginBottom: '3px', marginRight: '4px' }}
          />{' '}
          Order Types
        </Nav.Link>
      </Link>
    </Nav>
  </Navbar>
);

export default BoothNavbar;
