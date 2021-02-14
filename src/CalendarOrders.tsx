/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './css/reactCalendar.css';
import { Jumbotron, Container, Row, Col, Card, Image } from 'react-bootstrap';
import { Order } from './Interfaces/EmeraldTypes';
import { useEmeraldContext } from './Interfaces/EmeraldTypes';
import cat from './cat.jpg';

function CalendarOrders(): JSX.Element {
  const { orders } = useEmeraldContext();
  // const [, ordersSet] = React.useState<Order[]>([]);
  const [selectedDay, daySet] = React.useState<Date | undefined>(undefined);
  const [value, onChange] = React.useState<Date | Date[]>(new Date());

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
        orders.find(
          (x) =>
            moment(x.DeliveryDate).format('MM-DD-YYYY') ===
            moment(date).format('MM-DD-YYYY')
        )
      ) {
        // console.log('found day!');
        return 'highlight';
      }
      return null;
    }
    return null;
  }

  function onClickDayDate(value: Date): void {
    console.log('onclickday is ', value);
    daySet(value);
    return;
  }

  // console.log('value is ', value, ' type of: ', typeof value);
  return (
    <Container className='text-center' style={{ marginTop: '5px' }}>
      <Jumbotron style={{ backgroundColor: 'white' }}>
        <h2>Calendar</h2>
      </Jumbotron>
      <Calendar
        onChange={(val) => onChange(val)}
        value={value}
        tileClassName={tileClassName}
        onClickDay={onClickDayDate}
        className='centercalendar'
      />
      <Row>
        <Col>
          <p className='text-left'>
            <u>Upcoming</u>
          </p>
        </Col>
      </Row>
      {selectedDay === undefined
        ? orders.map((order: Order) => {
            const mapAddress = `${order.Address} ${order.City},${order.State}`;
            const encodedAddress = encodeURI(mapAddress);
            const addressToUse = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
            // console.log('addr', mapAddress, addressToUse);
            return (
              <Card key={order.Id} style={{ marginBottom: '3px' }}>
                <Row>
                  <Col style={{ maxWidth: '108px' }}>
                    <Image src={cat} rounded style={{ marginTop: '3px' }} />
                  </Col>
                  <Col>
                    <Card.Title>
                      {`${order.Name} `}
                      <span style={{ fontSize: 'small', verticalAlign: 'baseline' }}>
                        ({`${order.DeliveryDate}`})
                      </span>
                    </Card.Title>
                    <Card.Text>
                      {order.Quantity} {order.Description}
                    </Card.Text>
                    <Card.Text style={{ fontSize: 'medium' }}>
                      <a href={addressToUse}>{mapAddress}</a>
                    </Card.Text>
                  </Col>
                </Row>
              </Card>
            );
          })
        : null}

      {orders
        .filter((day) => {
          console.log('day', day.DeliveryDate);
          if (
            moment(day.DeliveryDate).format('MM-DD-YYYY') ==
            moment(selectedDay).format('MM-DD-YYYY')
          ) {
            return day;
          }
        })
        .map((order: Order) => {
          const mapAddress = `${order.Address} ${order.City},${order.State}`;
          const encodedAddress = encodeURI(mapAddress);
          const addressToUse = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
          // console.log('addr', mapAddress, addressToUse);
          return (
            <Card key={order.Id} style={{ marginBottom: '3px' }}>
              <Row>
                <Col style={{ maxWidth: '108px' }}>
                  <Image src={cat} rounded style={{ marginTop: '3px' }} />
                </Col>
                <Col>
                  <Card.Title>
                    {`${order.Name} `}
                    <span style={{ fontSize: 'small', verticalAlign: 'baseline' }}>
                      ({`${order.DeliveryDate}`})
                    </span>
                  </Card.Title>
                  <Card.Text>
                    {order.Quantity} {order.Description}
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
