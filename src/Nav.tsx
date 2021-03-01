/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Link } from 'react-router-dom';
import { scaleDown as Menu, State } from 'react-burger-menu';
import { FcHome } from 'react-icons/fc';
import { BiCookie } from 'react-icons/bi';
import { AiOutlineForm } from 'react-icons/ai';
import { FcCalendar } from 'react-icons/fc';
import { FaMap, FaClipboardList } from 'react-icons/fa';
import './css/burgerMenu.css';

type Props = {
  outerContainerId: string;
  pageWrapId: string;
};

const Nav = (props: Props): JSX.Element => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  function handleStateChange(state: State) {
    setIsOpen(state.isOpen);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <Menu
      isOpen={isOpen}
      onStateChange={(state) => handleStateChange(state)}
      pageWrapId={props.pageWrapId}
      outerContainerId={props.outerContainerId}
    >
      <Link
        to='/'
        className='menu-item'
        onClick={() => {
          closeMenu();
        }}
      >
        <FcHome style={{ marginRight: '5px', verticalAlign: 'middle' }} />
        Home
      </Link>
      <Link
        to='/calendar'
        className='menu-item'
        onClick={() => {
          closeMenu();
        }}
      >
        <FcCalendar style={{ marginRight: '5px' }} />
        Calendar
      </Link>
      <Link
        to='/create'
        className='menu-item'
        onClick={() => {
          closeMenu();
        }}
      >
        <AiOutlineForm style={{ marginRight: '5px' }} />
        Create Order
      </Link>
      <Link
        to='/orders'
        className='menu-item'
        onClick={() => {
          closeMenu();
        }}
      >
        <BiCookie style={{ marginRight: '5px' }} />
        Orders
      </Link>
      <Link
        to='/map'
        className='menu-item'
        onClick={() => {
          closeMenu();
        }}
      >
        <FaMap style={{ marginRight: '5px' }} />
        Map
      </Link>
      <hr />
      <Link
        to='/ordertypes'
        className='menu-item'
        onClick={() => {
          closeMenu();
        }}
      >
        <FaClipboardList style={{ marginRight: '5px' }} />
        Order Types
      </Link>
    </Menu>
  );
};

export default Nav;
