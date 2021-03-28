/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './css/reactCalendar.css';
import { Jumbotron, Container, Row, Col, Badge } from 'react-bootstrap';
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

  function insertOrder(e: React.MouseEvent<HTMLElement>): void {
    e.preventDefault();

    // const orderContent: Order = {
    //   Id: props.location.state === undefined ? 0 : Number(props.location.state),
    //   Name: name === undefined ? ' ' : name,
    //   Area: area === undefined ? ' ' : area,
    //   Address: address === undefined ? ' ' : address,
    //   City: city === undefined ? ' ' : city,
    //   State: state === undefined ? ' ' : state.trim(),
    //   ZipCode: zipCode === undefined ? ' ' : zipCode,
    //   OrderType: orderType === undefined ? ' ' : orderType,
    //   OrderStatus: orderStatus === undefined ? ' ' : orderStatus,
    //   Quantity: quantity,
    //   Price: price === undefined ? ' ' : price,
    //   Description: description === undefined ? ' ' : description,
    //   DeliveryDate: new Date(
    //     `${deliveryMonth}/${deliveryDay}/${deliveryYear} ${beginTime}`
    //   ),
    //   DeliveryDateEnd: new Date(
    //     `${deliveryMonthEnd}/${deliveryDayEnd}/${deliveryYearEnd} ${endTime}`
    //   ),
    //   OrderDate: new Date(),
    //   PrePaid: false,
    //   TrafficSource: trafficSource === undefined ? ' ' : trafficSource,
    //   User: props.user === undefined ? ' ' : props.user,
    //   CreatedBy: props.user === undefined ? ' ' : props.user,
    //   ImageUrl: '',
    //   OrderImageUrl: imageUrl === undefined ? ' ' : imageUrl,
    // };

    const orderContent = props.location.state;

    console.log('payload', orderContent);

    const payload = new FormData();

    // uploadFiles.forEach((file) => {
    //   payload.append('file', file);
    // });

    payload.append('orderContent', JSON.stringify(orderContent));

    const myInit = {
      method: 'POST',
      body: payload,
    };

    try {
      // const response = fetch('http://localhost:7071/api/Function1', myInit);
      const response = fetch(
        `https://emeraldorderfunction.azurewebsites.net/api/Function1?code=${process.env.REACT_APP_FUNC_KEY}`,
        myInit
      );
      // setOrderSubmitted(true);

      // response.then((resp) => {
      //   if (resp.status === 200) {
      //     setTimeout(() => {
      //       clearFields();
      //       setOrderSubmitted(false);
      //     }, 3000);
      //   } else {
      //     alert(`There was an error adding a new order. Status code:${resp.status}`);
      //   }
      // });
    } catch (e) {
      console.log(`catch error on create/edit: ${e}`);
    }
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
            <span style={{ marginLeft: '5px' }}>
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
                    orders.filter((day) => {
                      if (selectedDay) {
                        if (
                          moment(day.DeliveryDate).format('MM-DD-YYYY') ==
                          moment(selectedDay).format('MM-DD-YYYY')
                        ) {
                          return day;
                        }
                      }
                    }).length
                  }
                </Badge>
              </h5>
            </span>
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
                  parent='calender'
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
                  routeComponentProps={props}
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
