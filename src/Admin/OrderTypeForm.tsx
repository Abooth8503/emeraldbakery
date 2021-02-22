/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  Jumbotron,
  ListGroup,
  Form,
  Button,
} from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import { OrderType, useEmeraldContext } from '../Interfaces/EmeraldTypes';
import EmeraldDropzone from '../Common/EmeraldDropzone';
import { FaCheck } from 'react-icons/fa';

type Props = {
  user: string;
};

function OrderTypeForm(props: Props) {
  const { orderTypes } = useEmeraldContext();
  const [showOrderTypes, setShowOrderTypes] = React.useState<boolean>(false);
  const [id, setId] = React.useState<number>(0);
  const [name, setName] = React.useState<string | undefined>(undefined);
  const [description, setDescription] = React.useState<string | undefined>(undefined);
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(undefined);
  const [saveMessage, setSaveMessage] = React.useState<string | undefined>(undefined);
  // dropzone
  const [uploadFiles, setUploadFiles] = React.useState<Array<File>>([]);

  function orderTypeClicked(id: OrderType['Id']) {
    console.log('id ', id);
    setShowOrderTypes(!showOrderTypes);
    const selectedOrderType = orderTypes.filter((ot) => ot.Id === id);
    setId(selectedOrderType[0].Id);
    setName(selectedOrderType[0].Name);
    if (selectedOrderType[0].Description === null) {
      setDescription('');
    } else {
      setDescription(selectedOrderType[0].Description);
    }
    console.log('image url', selectedOrderType[0].ImageUrl);
    setImageUrl(selectedOrderType[0].ImageUrl);
  }

  function onClickshowOrderTypes(e: React.MouseEvent) {
    console.log('clicked');
    e.preventDefault();
    setShowOrderTypes(!showOrderTypes);
  }

  function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setName(e.target.value);
  }

  function onChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setDescription(e.target.value);
  }

  function GetUploadImage(files: Array<File>): void {
    setUploadFiles(files);
    const imageUrlAzure = `https://emeraldorderfunctionstor.blob.core.windows.net/emeraldbakery/${files[0].name}`;
    setImageUrl(imageUrlAzure);
  }

  function clearFields(): void {
    setName('');
    setId(0);
    setDescription('');
    setImageUrl('');
  }

  function formSubmit(): void {
    const orderType = {
      Id: id,
      Name: name,
      Description: description,
      ImageUrl: imageUrl,
      User: props.user,
    };

    const payload = new FormData();

    uploadFiles.forEach((file) => {
      payload.append('file', file);
    });

    payload.append('ordertype', JSON.stringify(orderType));

    console.log('order type obj', orderType);
    try {
      fetch(
        // 'http://localhost:7071/api/Function1', //   fetch(
        `https://emeraldordertype.azurewebsites.net/api/Function1?code=${process.env.REACT_APP_ORDERTYPE_FUNC_KEY}`,
        {
          method: 'POST',
          body: payload,
        }
      ).then((response) => {
        if (!response.ok) {
          throw Error('Network Request failed');
        }

        setSaveMessage('Order Type saved!');

        setTimeout(() => {
          clearFields();
          setSaveMessage('');
        }, 4000);

        return response;
      });
    } catch (error) {
      console.log('order type error', error);
    }
  }

  if (orderTypes.length === 0) {
    return <div>Order Types not ready.</div>;
  }

  orderTypes.sort((a: OrderType, b: OrderType) => {
    if (a.Name !== undefined && b.Name !== undefined) {
      if (a.Name > b.Name) {
        return 1;
      }
    }

    return -1;
  });

  return (
    <Container fluid>
      <Row>
        <Col className='text-center'>
          <Jumbotron>
            <h1 style={{ fontFamily: 'AmaticSC-Bold', fontSize: 'xxx-large' }}>
              Order Type Form
            </h1>
          </Jumbotron>
        </Col>
      </Row>
      <Button
        onClick={onClickshowOrderTypes}
        style={{ marginBottom: '5px' }}
        variant='secondary'
      >
        Show Order Types
      </Button>
      {showOrderTypes ? (
        <FlipMove
          typeName='ListGroup'
          staggerDurationBy='22'
          duration={500}
          leaveAnimation='elevator'
          enterAnimation='elevator'
          appearAnimation='elevator'
          maintainContainerHeight={true}
          easing='cubic-bezier(0.39, 0.0, 0.45, 1.4)'
        >
          {orderTypes.map((orderType: OrderType) => {
            return (
              <ListGroup.Item
                key={orderType.Id}
                action
                onClick={() => orderTypeClicked(orderType.Id)}
              >
                {orderType.Name}
              </ListGroup.Item>
            );
          })}
        </FlipMove>
      ) : null}
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name of order type'
            onChange={onChangeName}
            value={name}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter description of order type'
            onChange={onChangeDescription}
            value={description}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Upload Image</Form.Label>
          <EmeraldDropzone uploadDoc={GetUploadImage} />
          {uploadFiles !== undefined ? (
            <ul style={{ listStyleType: 'none', paddingLeft: '0px', marginTop: '0px' }}>
              {uploadFiles.map((file: File) => (
                <li key={file.name}>
                  <FaCheck color='green' size={22} style={{ marginTop: '10px' }} />
                  <span
                    style={{
                      color: '#005ea2',
                      marginTop: '10px',
                      verticalAlign: 'bottom',
                    }}
                    data-testid='uploadfilename'
                  >
                    {file.name}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Image src={imageUrl} thumbnail />
        </Form.Group>

        <Form.Group>
          <Button onClick={formSubmit}>Save</Button>
          <Button onClick={clearFields} style={{ marginLeft: '5px' }}>
            Clear
          </Button>
          <Form.Label>{saveMessage}</Form.Label>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default OrderTypeForm;
