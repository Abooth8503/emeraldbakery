/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './css/reactCalendar.css';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import OrderCard from './Common/OrderCard';
import { Order } from './Interfaces/EmeraldTypes';
import { useEmeraldContext } from './Interfaces/EmeraldTypes';

type Props = RouteComponentProps;

function CalendarOrders(props: Props): JSX.Element {
  const { orders } = useEmeraldContext();
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
      if (
        orders.find(
          (x) =>
            moment(x.DeliveryDate).format('MM-DD-YYYY') ===
            moment(date).format('MM-DD-YYYY')
        )
      ) {
        return 'highlight';
      }
      return null;
    }
    return null;
  }

  function onClickDayDate(value: Date): void {
    daySet(value);
    return;
  }

  if (orders.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <Container className='text-center' style={{ marginTop: '5px' }}>
      <Jumbotron style={{ backgroundColor: 'white' }}>
        <h2 style={{ fontFamily: 'AmaticSC-Bold', fontSize: 'xxx-large' }}>Calendar</h2>
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
        ? orders
            .filter((upcomingOrder) => {
              const deliveryDate = moment(upcomingOrder.DeliveryDate);
              const currentDate = moment();

              if (deliveryDate > currentDate) {
                return upcomingOrder;
              }
            })
            .map((order: Order) => {
              const mapAddress = `${order.Address} ${order.City},${order.State}`;
              const encodedAddress = encodeURI(mapAddress);
              const addressToUse = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
              return (
                <OrderCard
                  key={order.Id}
                  routeComponentProps={props}
                  order={order}
                  address={addressToUse}
                />
              );
            })
        : orders
            .filter((day) => {
              if (selectedDay) {
                if (
                  moment(day.DeliveryDate).format('MM-DD-YYYY') ==
                  moment(selectedDay).format('MM-DD-YYYY')
                ) {
                  return day;
                }
              }
            })
            .map((order: Order) => {
              const mapAddress = `${order.Address} ${order.City},${order.State}`;
              const encodedAddress = encodeURI(mapAddress);
              const addressToUse = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
              return (
                <OrderCard
                  key={order.Id}
                  routeComponentProps={props}
                  order={order}
                  address={addressToUse}
                />
              );
            })}
    </Container>
  );
}

export default CalendarOrders;
