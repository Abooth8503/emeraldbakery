/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { useEffect } from 'react';
import { Card, Col, Row, Image, Button, Form } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import { FaMapSigns } from 'react-icons/fa';
import { Order, useEmeraldContext } from '../Interfaces/EmeraldTypes';

type Props = {
  routeComponentProps: RouteComponentProps;
  order: Order;
  address: string;
  parent: 'calender' | 'other';
};

function OrderCard(props: Props): JSX.Element {
  const [uploadFiles, setUploadFiles] = React.useState<Array<File>>([]);
  const [message, setMessage] = React.useState<string>('');
  const { fetchEmeraldOrders } = useEmeraldContext();

  useEffect(() => {
    const path = props.order.OrderImageUrl;
    if (path !== undefined && path !== null) {
      const fileName = path.replace(/^.*[\\/]/, '');
      Download(path, fileName);
    }
  }, []);

  function selectOrder(id: number): void {
    props.routeComponentProps.history.push(`/detail`, id);
  }

  async function Download(path: string, fileName: string): Promise<void> {
    const a = document.createElement('a');
    a.href = await toDataURL(path, fileName);
    a.download = fileName;
    document.body.appendChild(a);
    //a.click();
    document.body.removeChild(a);
  }

  function toDataURL(url: string, fileName: string): Promise<string> {
    return fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        blobToFile(blob, fileName);
        return URL.createObjectURL(blob);
      });
  }

  //https://stackoverflow.com/questions/27159179/how-to-convert-blob-to-file-in-javascript
  function blobToFile(theBlob: Blob, fileName: string): void {
    const b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;
    const newFileArray = [];

    const f = new File([b], fileName);
    newFileArray.push(f);
    setUploadFiles(newFileArray);
  }

  function updateBakeryOrder(
    e: React.MouseEvent<HTMLElement>,
    orderStatus: string
  ): void {
    e.preventDefault();

    const orderContent: Order = {
      Id: props.order.Id,
      Name: props.order.Name,
      Area: props.order.Area,
      Address: props.order.Address,
      City: props.order.City,
      State: props.order.State,
      ZipCode: props.order.ZipCode,
      OrderType: props.order.OrderType,
      OrderStatus: orderStatus,
      Quantity: props.order.Quantity,
      Price: props.order.Price,
      Description: props.order.Description,
      DeliveryDate: props.order.DeliveryDate,
      DeliveryDateEnd: props.order.DeliveryDateEnd,
      OrderDate: props.order.OrderDate,
      PrePaid: props.order.PrePaid,
      TrafficSource: props.order.TrafficSource,
      User: props.order.CreatedBy,
      CreatedBy: props.order.CreatedBy,
      ImageUrl: props.order.ImageUrl,
      OrderImageUrl: props.order.OrderImageUrl,
    };

    console.log('payload', orderContent, uploadFiles);

    const payload = new FormData();

    uploadFiles.forEach((file) => {
      payload.append('file', file);
    });

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

      response.then((resp) => {
        if (resp.status === 200) {
          setMessage(`Order was ${orderStatus}`);
          setTimeout(() => {
            fetchEmeraldOrders();
            setMessage(``);
          }, 3000);
        } else {
          setMessage(`Order was not saved correctly.`);
          setTimeout(() => {
            setMessage(``);
          }, 3000);
        }
      });
    } catch (e) {
      console.log(`catch error on create/edit: ${e}`);
    }
  }

  let OrderImageUrl = '';

  const mapAddress = `${props.order.Address} ${props.order.City},${props.order.State}`;
  if (
    props.order.OrderImageUrl === 'NONE' ||
    props.order.OrderImageUrl === null ||
    props.order.OrderImageUrl === undefined
  ) {
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
            <Button
              size='sm'
              variant='success'
              style={{ marginLeft: '5px' }}
              onClick={(e) => updateBakeryOrder(e, 'Delivered')}
            >
              Delivered
            </Button>
            <Button
              variant='danger'
              size='sm'
              style={{ marginLeft: '5px' }}
              onClick={(e) => updateBakeryOrder(e, 'Cancelled')}
            >
              Cancel
            </Button>
            {message.length > 0 ? (
              <Form.Label
                style={{ marginLeft: '5px', color: '#28a745', fontSize: 'x-large' }}
              >
                {message}
              </Form.Label>
            ) : null}
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
