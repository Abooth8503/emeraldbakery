/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { Card, Col, Row, Image } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import { Order, formatDate } from '../Interfaces/EmeraldTypes';

type Props = {
  routeComponentProps: RouteComponentProps;
  order: Order;
  address: string;
};

function OrderCard(props: Props): JSX.Element {
  function selectOrder(id: number): void {
    props.routeComponentProps.history.push(`/detail`, id);
  }

  let OrderImageUrl = '';

  const mapAddress = `${props.order.Address} ${props.order.City},${props.order.State}`;
  console.log('order', props.order);
  if (props.order.ImageUrl === 'NONE') {
    console.log('found none');
    OrderImageUrl =
      'https://emeraldorderfunctionstor.blob.core.windows.net/emeraldbakery/defaultOrderImage_min.png';
  } else {
    if (props.order.ImageUrl !== undefined) {
      OrderImageUrl = props.order.ImageUrl;
    }
  }
  return (
    <Card
      key={props.order.Id}
      style={{
        marginBottom: '3px',
        padding: '5px',
        border: 'black',
        borderWidth: '1px',
        borderStyle: 'solid',
        fontFamily: 'Andika-R',
      }}
      onClick={() => selectOrder(props.order.Id)}
    >
      <Row>
        <Col style={{ maxWidth: '108px' }}>
          <Image src={OrderImageUrl} thumbnail />
        </Col>
        <Col>
          <Card.Title>
            {props.order.Name}{' '}
            <span style={{ fontSize: 'small', verticalAlign: 'baseline' }}>
              ({`${formatDate(props.order.DeliveryDate, false, true)}`})
            </span>
          </Card.Title>
          <Card.Text>
            Quantity: {props.order.Quantity}
            <br></br>
            Description: {props.order.Description}
          </Card.Text>
          <Card.Text style={{ fontSize: 'medium' }}>
            <a href={props.address}>{mapAddress}</a>
          </Card.Text>
        </Col>
      </Row>
    </Card>
  );
}

export default OrderCard;