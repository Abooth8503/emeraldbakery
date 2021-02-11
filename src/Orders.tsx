import * as React from 'react';
import { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
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

  if (orders.length === 0) {
    return <div>Orders not ready.</div>;
  }

  console.log(orders[0].name, orders.length);
  return (
    <React.Fragment>
      <div>Orders here {orders.length}</div>
      <ListGroup>
        <ListGroup.Item action>Select Order</ListGroup.Item>
        {orders.map((order: Order) => {
          return (
            <ListGroup.Item action key={order.id}>
              {order.name}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </React.Fragment>
  );
}

export default Orders;
