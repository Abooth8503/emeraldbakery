import * as React from 'react';
import { useEffect } from 'react';
import {
  Container,
  Jumbotron,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
} from 'react-bootstrap';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './css/reactCalendar.css';
import { RouteComponentProps } from 'react-router-dom';
import { useEmeraldContext, formatDate } from './Interfaces/EmeraldTypes';
import OrderTypeImage from './images/Erotic1.jpg';

function OrderDetail(props: RouteComponentProps<number>): JSX.Element {
  const { orders, fetchOrders } = useEmeraldContext();
  const [value, onChange] = React.useState<Date | Date[]>(new Date());
  const [selectedDay, daySet] = React.useState<Date | undefined>(undefined);

  useEffect(() => {
    fetchOrders();
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

  console.log('props for orderDetail', props.location.state, orders);
  if (orders.length < 1) {
    return <div>Loading...</div>;
  }
  const filteredOrderProp = orders.filter((order) => order.Id === props.location.state);
  console.log('filteredOrderProp', filteredOrderProp);
  return (
    <React.Fragment>
      <Container className='text-center' style={{ marginTop: '5px' }}>
        <Jumbotron style={{ backgroundColor: 'white' }}>
          <h2>Order Detail</h2>
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
            {filteredOrderProp.map((order) => {
              return (
                <Card
                  className='d-flex align-items-center justify-content-center'
                  key={order.Id}
                  style={{
                    height: '233px',
                    marginTop: '5px',
                  }}
                >
                  <Card.Header style={{ fontSize: 'larger', fontWeight: 'bolder' }}>
                    {`${order.Name}'s Order`}
                  </Card.Header>
                  <Card.Text>Order Type: {order.OrderType}</Card.Text>
                  <Card.Text>Quantity: {order.Quantity}</Card.Text>
                  <Button>Edit</Button>
                </Card>
              );
            })}
          </Col>
          <Col className='d-flex align-items-center justify-content-center'>
            <Image src={OrderTypeImage} thumbnail />
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup style={{ marginTop: '5px' }}>
              {filteredOrderProp.map((order) => {
                const mapAddress = `${order.Address} ${order.City},${order.State}`;
                const encodedAddress = encodeURI(mapAddress);
                const addressToUse = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
                return (
                  <React.Fragment key={order.Id}>
                    <ListGroup.Item key={order.Id} className='d-flex align-items-center'>
                      <b>Date Created:</b>{' '}
                      <span style={{ marginLeft: '5px' }}>
                        {formatDate(order.OrderDate, false, true)}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item key={order.Id} className='d-flex align-items-center'>
                      <b>Description:</b>{' '}
                      <span style={{ marginLeft: '5px' }}>{order.Description}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className='d-flex align-items-center'>
                      <b>Address:</b>{' '}
                      <span>
                        <a href={addressToUse}>{mapAddress}</a>
                      </span>
                    </ListGroup.Item>
                  </React.Fragment>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
        {/* </Container> */}
      </Container>
    </React.Fragment>
  );
}

export default OrderDetail;
