import * as React from 'react';
import { useEffect } from 'react';
import { Order } from './Interfaces/EmeraldTypes';
// import { Container, Row, Col, Button, Jumbotron } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

function Orders() {
  const [orders, ordersSet] = React.useState<Order[]>([]);
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Abooth8503/emeraldbakery/master/orders.json')
      .then((resp) => resp.json())
      .then((tds: Order[]) => {
        console.log('orders', tds);
        ordersSet(tds);
      });
  }, []);

  return <div>Orders here {orders.length}</div>;
}

export default Orders;
