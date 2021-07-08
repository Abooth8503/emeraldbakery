/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Badge,
  Jumbotron,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import moment from 'moment';
import { Order } from './Interfaces/EmeraldTypes';
import {
  useEmeraldContext,
  AtTheBoothBakery_Type,
  useMediaQuery,
} from './Interfaces/EmeraldTypes';
import OrderCard from './Common/OrderCard';
import BoothNavbar from './Common/BoothNavbar';

const sectionStyle = {
  marginTop: '5px',
  fontFamily: 'Andika-R',
};

type Props = RouteComponentProps;

function Orders(props: Props): JSX.Element {
  const { orders } = useEmeraldContext();
  const [displayOrders, setDisplayOrders] = useState(orders);
  const [filterType, setFilterType] = useState<string>('Delivered');
  const [width] = useMediaQuery();

  const handleSelect = (e: any) : void => {
    setFilterType(e);

    let atbOrders: Array<Order> = [];

    switch (e) {
      case AtTheBoothBakery_Type.Delivered:
        atbOrders = orders.filter((order: Order) => {
          return order.OrderStatus === 'Delivered';
        });
        break;
      case AtTheBoothBakery_Type.Ordered:
        atbOrders = orders.filter((order: Order) => {
          return order.OrderStatus === 'Ordered';
        });
        break;
      case AtTheBoothBakery_Type.Today:
        // eslint-disable-next-line no-case-declarations
        const today = new Date();

        atbOrders = orders
          .filter((day) => {
            if (today) {
              if (
                moment(day.DeliveryDate).format('MM-DD-YYYY') ==
                moment(today).format('MM-DD-YYYY')
              ) {
                return day;
              }
            }
          })
          .filter(
            (statusOrder) =>
              statusOrder.OrderStatus !== 'Delivered' &&
              statusOrder.OrderStatus !== 'Cancelled'
          );
        break;
      default:
        atbOrders = orders;
    }

    setDisplayOrders(atbOrders);
  };

  const onSearchKey = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const regExOrder = new RegExp(`${e.target.value.toString()}`, 'i');
    const searchedOrders = orders.filter((order: Order) => {
      return (
        (order.Name && order.Name.match(regExOrder)) ||
        (order.Address && order.Address.match(regExOrder))
      );
    });

    setDisplayOrders(searchedOrders);
  };

  if (orders.length === 0) {
    return <div>Orders not ready.</div>;
  }

  // Top is Mobile view. Bottom view is Desktop.
  return width < 769 ? (
    <Container fluid style={sectionStyle}>
      <Row>
        <Col className='text-center'>
          <Jumbotron>
            <h1 style={{ fontFamily: 'AmaticSC-Bold', fontSize: 'xxx-large' }}>
              Orders
              <Badge variant='success' style={{ marginLeft: '3px' }}>
                {displayOrders.length}
              </Badge>
            </h1>
            <label>
              {filterType === 'Delivered' ? <span>🚚{filterType}</span> : filterType}
            </label>
          </Jumbotron>
        </Col>
      </Row>

      <Row>
        <Col>
          <Dropdown style={{ marginBottom: '5px' }}>
            <DropdownButton title='Orders filter' onSelect={handleSelect}>
              <Dropdown.Item eventKey='Today'>Today</Dropdown.Item>
              <Dropdown.Item eventKey='Delivered'>Delivered</Dropdown.Item>
              <Dropdown.Item eventKey='ordered'>Ordered</Dropdown.Item>
            </DropdownButton>
          </Dropdown>
        </Col>
        <Col>
          <input
            style={{ marginTop: '5px' }}
            placeholder='Search Name or Address'
            onChange={onSearchKey}
          ></input>
        </Col>
      </Row>

      <div style={{ textAlign: 'left', fontFamily: 'AmaticSC-Regular' }}>
        {displayOrders.map((order: Order) => {
          const mapAddress = `${order.Address} ${order.City},${order.State}`;
          const encodedAddress = encodeURI(mapAddress);
          const addressToUse = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
          return (
            <OrderCard
              key={order.Id}
              routeComponentProps={props}
              order={order}
              address={addressToUse}
              parent='other'
            />
          );
        })}
      </div>
    </Container>
  ) : (
    <Container style={sectionStyle}>
      <Row>
        <Col className='text-center'>
          <BoothNavbar />
          <Jumbotron style={{ marginTop: '5px' }}>
            <h1 style={{ fontFamily: 'AmaticSC-Bold', fontSize: 'xxx-large' }}>
              Orders
              <Badge variant='success' style={{ marginLeft: '3px' }}>
                {displayOrders.length}
              </Badge>
            </h1>
            <label>
              {filterType === 'Delivered' ? <span>🚚{filterType}</span> : filterType}
            </label>
          </Jumbotron>
        </Col>
      </Row>

      <Row>
        <Col>
          <Dropdown
            className='text-right'
            style={{ marginBottom: '5px', marginRight: '250px' }}
          >
            <DropdownButton title='Orders filter' onSelect={handleSelect}>
              <Dropdown.Item eventKey='Today'>Today</Dropdown.Item>
              <Dropdown.Item eventKey='Delivered'>Delivered</Dropdown.Item>
              <Dropdown.Item eventKey='ordered'>Ordered</Dropdown.Item>
            </DropdownButton>
          </Dropdown>
        </Col>
        <Col>
          <input
            className='float-left'
            style={{ marginTop: '5px', marginLeft: '173px' }}
            placeholder='Search Name or Address'
            onChange={onSearchKey}
          ></input>
        </Col>
      </Row>

      <div style={{ textAlign: 'left', fontFamily: 'AmaticSC-Regular' }}>
        {displayOrders.map((order: Order) => {
          const mapAddress = `${order.Address} ${order.City},${order.State}`;
          const encodedAddress = encodeURI(mapAddress);
          const addressToUse = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
          return (
            <OrderCard
              key={order.Id}
              routeComponentProps={props}
              order={order}
              address={addressToUse}
              parent='other'
            />
          );
        })}
      </div>
    </Container>
  );
}

export default Orders;
