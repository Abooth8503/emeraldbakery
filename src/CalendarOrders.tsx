/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './css/reactCalendar.css';
import { Jumbotron, Container, Row, Col, Badge, Form } from 'react-bootstrap';
import OrderCard from './Common/OrderCard';
import { Order, Orders } from './Interfaces/EmeraldTypes';
import { useEmeraldContext } from './Interfaces/EmeraldTypes';

interface Props {
  routeComponentProps: RouteComponentProps;
  userName: string;
}

function CalendarOrders(props: Props): JSX.Element {
  const { orders, fetchEmeraldOrders } = useEmeraldContext();
  const [selectedDay, daySet] = React.useState<Date | undefined>(undefined);
  const [calenderOrders, setCalenderOrders] = React.useState<Orders>(orders);
  const [value, onChange] = React.useState<Date | Date[]>(new Date());
  const [employee, setEmployee] = React.useState<string | undefined>('Select Employee');

  useEffect(() => {
    fetchEmeraldOrders();

    switch (props.userName) {
      case 'Ariel Castillo':
        setCalenderOrders(orders.filter((empOrder) => empOrder.EmployeeName === 'Ariel'));
        setEmployee('Ariel');
        break;
      case 'Paul Castillo':
        setCalenderOrders(orders.filter((empOrder) => empOrder.EmployeeName === 'Ariel'));
        setEmployee('Ariel');
        break;
      case 'Jordan Hebert':
        setCalenderOrders(
          orders.filter((empOrder) => empOrder.EmployeeName === 'Jordan')
        );
        setEmployee('Jordan');
        break;
      default:
        console.log('default');
    }
  }, []);

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
        calenderOrders.find(
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

  function onChangeEmployee(e: React.ChangeEvent<HTMLSelectElement>): void {
    e.preventDefault();
    setEmployee(e.target.value);

    switch (e.target.value) {
      case 'Ariel':
        setCalenderOrders(orders.filter((empOrder) => empOrder.EmployeeName === 'Ariel'));
        break;
      case 'Jordan':
        setCalenderOrders(
          orders.filter((empOrder) => empOrder.EmployeeName === 'Jordan')
        );
        break;
      default:
        setCalenderOrders(orders);
    }
  }

  if (orders.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <Container className='text-center' style={{ marginTop: '5px' }}>
      <Jumbotron style={{ backgroundColor: 'white' }}>
        <h2 style={{ fontFamily: 'AmaticSC-Bold', fontSize: 'xxx-large' }}>Calender</h2>
      </Jumbotron>
      <Form.Group>
        <Form.Control
          as='select'
          onChange={onChangeEmployee}
          value={employee}
          title='Select Employee view.'
        >
          <option>Select Employee</option>
          <option>Ariel</option>
          <option>Jordan</option>
          <option>All</option>
        </Form.Control>
      </Form.Group>
      <Calendar
        onChange={(val) => onChange(val)}
        value={value}
        tileClassName={tileClassName}
        onClickDay={onClickDayDate}
        className='centercalendar'
        calendarType='US'
      />
      <Row>
        <Col>
          <span className='text-left' style={{ marginLeft: '5px' }}>
            <h5>
              <span style={{ fontWeight: 'bold' }}>Count:</span>
              <Badge
                style={{
                  fontSize: 'large',
                  color: '#007bff',
                  marginLeft: '5px',
                  background: 'white',
                }}
              >
                {
                  calenderOrders
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
                    .filter(
                      (statusOrder) =>
                        statusOrder.OrderStatus !== 'Delivered' &&
                        statusOrder.OrderStatus !== 'Cancelled'
                    ).length
                }
              </Badge>
            </h5>
          </span>
        </Col>
      </Row>
      {selectedDay === undefined
        ? calenderOrders
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
                  routeComponentProps={props.routeComponentProps}
                  order={order}
                  address={addressToUse}
                  parent='calender'
                />
              );
            })
        : calenderOrders
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
            .filter(
              (statusOrder) =>
                statusOrder.OrderStatus !== 'Delivered' &&
                statusOrder.OrderStatus !== 'Cancelled'
            )
            .sort((a: Order, b: Order) => {
              if (a.DeliveryDate > b.DeliveryDate) {
                return 1;
              }

              return -1;
            })
            .map((order: Order) => {
              const mapAddress = `${order.Address} ${order.City},${order.State}`;
              const encodedAddress = encodeURI(mapAddress);
              const addressToUse = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
              return (
                <OrderCard
                  key={order.Id}
                  routeComponentProps={props.routeComponentProps}
                  order={order}
                  address={addressToUse}
                  parent='calender'
                />
              );
            })}
    </Container>
  );
}

export default CalendarOrders;
