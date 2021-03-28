/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { Card, Col, Row, Image, Button } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import { FaMapSigns } from 'react-icons/fa';
import { Order } from '../Interfaces/EmeraldTypes';

type Props = {
  routeComponentProps: RouteComponentProps;
  order: Order;
  address: string;
  parent: 'calender' | 'other';
};

function OrderCard(props: Props): JSX.Element {
  function selectOrder(id: number): void {
    props.routeComponentProps.history.push(`/detail`, id);
  }

  let OrderImageUrl = '';

  const mapAddress = `${props.order.Address} ${props.order.City},${props.order.State}`;
  console.log('order', props.order);
  if (
    props.order.OrderImageUrl === 'NONE' ||
    props.order.OrderImageUrl === null ||
    props.order.OrderImageUrl === undefined
  ) {
    console.log('found none');
    OrderImageUrl =
      'https://emeraldorderfunctionstor.blob.core.windows.net/emeraldbakery/defaultOrderImage_min.png';
  } else {
    if (props.order.OrderImageUrl !== undefined) {
      OrderImageUrl = props.order.OrderImageUrl;
    }
  }
  const beginDeliveryDate = new Date(props.order.DeliveryDate);
  const endDeliveryDate = new Date(props.order.DeliveryDateEnd);
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
    >
      <Row>
        {props.parent === 'other' ? (
          <Col>
            <Card.Img as={Image} src={OrderImageUrl} fluid={true} />
          </Col>
        ) : null}

        <Col>
          <Card.Title>
            <span style={{ fontSize: 'large', fontWeight: 'bold' }}>
              {props.order.Name}
            </span>
            <br />
            <span style={{ fontSize: 'small', verticalAlign: 'baseline' }}>
              {`${beginDeliveryDate.toLocaleTimeString('en-US', {
                timeStyle: 'short',
              } as Intl.DateTimeFormatOptions)}`}
            </span>
            <span style={{ fontSize: 'initial' }}> to </span>
            <span style={{ fontSize: 'small', verticalAlign: 'baseline' }}>
              {`${endDeliveryDate.toLocaleTimeString('en-US', {
                timeStyle: 'short',
              } as Intl.DateTimeFormatOptions)}`}
            </span>
          </Card.Title>
          <Card.Text>
            <span style={{ fontWeight: 'bold' }}>Quantity:</span>
            <span style={{ marginLeft: '5px' }}>{props.order.Quantity}</span>
            {props.parent === 'other' ? (
              <>
                <br />
                {props.order.Description !== undefined &&
                props.order.Description.length > 0 ? (
                  <>
                    <span style={{ fontWeight: 'bold' }}>Description: </span>
                    <span>{props.order.Description}</span>
                  </>
                ) : null}
              </>
            ) : null}
            <br />
            <Button size='sm' onClick={() => selectOrder(props.order.Id)}>
              Edit
            </Button>
            <Button size='sm' variant="success" style={{ marginLeft: '5px' }}>
              Delivered
            </Button>
            <Button variant='danger' size='sm' style={{ marginLeft: '5px' }}>
              Cancel
            </Button>
          </Card.Text>
          <Card.Text style={{ fontSize: 'medium' }}>
            <FaMapSigns />
            <a href={props.address} style={{ marginLeft: '5px' }}>
              {mapAddress}
            </a>
          </Card.Text>
        </Col>
      </Row>
    </Card>
  );
}

export default OrderCard;
