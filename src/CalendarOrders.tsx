/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './css/reactCalendar.css';
import { Jumbotron, Container, Row, Col, Card, Image } from 'react-bootstrap';
import { Order } from './Interfaces/EmeraldTypes';
import cat from './cat.jpg';

const mark = ['02/04/2021', '02/05/2021', '02/03/2021'];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function tileClassName({
  date,
  view,
}: {
  date: any;
  view: any;
}): string | string[] | null {
  // Add class to tiles in month view only
  if (view === 'month') {
    // console.log('date and view', date, view, moment(date).format('MM-DD-YYYY'));
    if (
      mark.find(
        (x) => moment(x).format('MM-DD-YYYY') === moment(date).format('MM-DD-YYYY')
      )
    ) {
      console.log('found day!');
      return 'highlight';
    }
    return null;
  }
  return null;
}

function onClickDayDate(value: Date): void {
  console.log('onclickday is ', value);
  return;
}

function CalendarOrders(): JSX.Element {
  const [orders, ordersSet] = React.useState<Order[]>([]);
  const [value, onChange] = React.useState<Date | Date[]>(new Date());

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Abooth8503/emeraldbakery/master/orders.json')
      .then((resp) => resp.json())
      .then((tds: Order[]) => {
        console.log('orders', tds);
        ordersSet(tds);
      });
  }, []);
  // console.log('value is ', value, ' type of: ', typeof value);

  return (
    <Container className='text-center'>
      <Jumbotron style={{ backgroundColor: 'white' }}>
        <h2>Calendar</h2>
      </Jumbotron>
      <Calendar
        onChange={(val) => onChange(val)}
        value={value}
        tileClassName={tileClassName}
        onClickDay={onClickDayDate}
      />
      <Row>
        <Col>
          <p className='text-left'>Upcoming</p>
        </Col>
      </Row>
      {orders.map((order: Order) => {
        const mapAddress = `${order.address} ${order.city},${order.state}`;
        const encodedAddress = encodeURI(mapAddress);
        const addressToUse = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        // console.log('addr', mapAddress, addressToUse);
        return (
          <Card key={order.id} style={{ marginBottom: '3px' }}>
            <Row>
              <Col style={{ maxWidth: '108px' }}>
                <Image src={cat} rounded style={{ marginTop: '3px' }} />
              </Col>
              <Col>
                <Card.Title>
                  {`${order.name} `}
                  <span style={{ fontSize: 'small', verticalAlign: 'baseline' }}>
                    ({`${order.deliverydate}`})
                  </span>
                </Card.Title>
                <Card.Text>
                  {order.quantity} {order.description}
                </Card.Text>
                <Card.Text style={{ fontSize: 'medium' }}>
                  <a href={addressToUse}>{mapAddress}</a>
                </Card.Text>
              </Col>
            </Row>
          </Card>
        );
      })}
    </Container>
  );
}

export default CalendarOrders;
