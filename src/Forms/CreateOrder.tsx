/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { Container, Jumbotron, Form, Button } from 'react-bootstrap';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getZipCode,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import '../css/createOrder.css';

function CreateOrder() {
  const [name, nameSet] = React.useState<string | undefined>(undefined);
  const [area, areaSet] = React.useState<string | undefined>(undefined);
  const [address, addressSet] = React.useState<string | undefined>(undefined);
  const [city, citySet] = React.useState<string | undefined>(undefined);
  const [state, stateSet] = React.useState<string | undefined>(undefined);
  const [zipCode, zipCodeSet] = React.useState<string | undefined>(undefined);
  const [orderType, orderTypeSet] = React.useState<string | undefined>(undefined);
  const [orderStatus, orderStatusSet] = React.useState<string | undefined>(undefined);
  const [quantity, quantitySet] = React.useState<number>(0);
  const [price, priceSet] = React.useState<string | undefined>(undefined);
  const [prepaid, prepaidSet] = React.useState<boolean>(false);
  const [description, descriptionSet] = React.useState<string | undefined>(undefined);
  const [trafficSource, trafficSourceSet] = React.useState<string | undefined>(undefined);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    // Update the keyword of the input element
    setValue(e.target.value, true);
  };

  const handleSelect = ({
    description,
  }: {
    description: string;
    place_id: string;
  }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    console.log('id is ', description);
    console.log('data: ', data);
    clearSuggestions();

    const address = description.split(',');
    console.log('address obj: ', address);
    if (address.length > 3) {
      // set address, city and state
      addressSet(address[0]);
      citySet(address[1]);
      stateSet(address[2]);
    }

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('📍 Coordinates: ', { lat, lng });
      })
      .catch((error) => {
        console.log('😱 Error: ', error);
      });

    getGeocode({ address: description })
      .then((results) => getZipCode(results[0], false))
      .then((zip) => {
        console.log('ZipCode: ', zip);
        if (zip !== null) {
          zipCodeSet(zip);
        }
      });
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      console.log('sugg ', suggestion);
      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          📍-<strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    nameSet(e.target.value);
  }

  function onChangeArea(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    areaSet(e.target.value);
  }

  function onChangeAddress(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    addressSet(e.target.value);
  }

  function onChangeCity(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    citySet(e.target.value);
  }

  function onChangeState(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    stateSet(e.target.value);
  }

  function onChangeZipCode(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    zipCodeSet(e.target.value);
  }

  function onChangeOrderType(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    orderTypeSet(e.target.value);
  }

  function onChangeOrderStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    orderStatusSet(e.target.value);
  }

  function onClickPlus(e: React.MouseEvent) {
    e.preventDefault();
    quantitySet(quantity + 1);
  }

  function onClickMinus(e: React.MouseEvent) {
    e.preventDefault();
    quantitySet(quantity - 1);
  }

  function onChangePrice(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    priceSet(e.target.value);
  }

  function onPrePaidCheckClick(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    prepaidSet(!prepaid);
  }

  function onChangeDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    descriptionSet(e.target.value);
  }

  function onChangeTrafficSource(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    trafficSourceSet(e.target.value);
  }

  function insertOrder(id: any) {
    let orderContent = {};

    orderContent = {
      Id: 0,
      Name: name,
      Area: area,
      Address: address,
      City: city,
      State: state,
      ZipCode: zipCode,
      OrderType: orderType,
      OrderStatus: orderStatus,
      Quantity: quantity,
      Description: description,
      DeliveryDate: 'string',
      OrderDate: new Date(),
      PrePaid: false,
    };

    console.log('payload', orderContent);

    const payload = new FormData();

    payload.append('orderContent', JSON.stringify(orderContent));

    const myInit = {
      method: 'POST',
      body: payload,
    };

    try {
      const response = fetch('http://localhost:7071/api/Function1', myInit);
      // const response = fetch(
      //   `https://cbetdata.azurewebsites.net/api/GetCbetContent?code=${process.env.cbetContentCode}`,
      //   myInit
      // );

      response.then((resp) => {
        if (resp.status === 200) {
          setTimeout(() => {
            // setIsSubmitting(false);
            // clearFields();
            // setIsDone(true);
            // ClearDone();
          }, 3000);
        } else {
          alert(`There was an error adding a new order. Status code:${resp.status}`);
        }
      });
    } catch (e) {
      console.log(`catch error on create/edit: ${e}`);
    }
  }

  return (
    <Container>
      <Jumbotron style={{ backgroundColor: 'white', marginTop: '3px' }}>
        <h2 className='text-center'>Create Order</h2>
      </Jumbotron>

      <Form>
        <Form.Group controlId='formName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name of order'
            onChange={onChangeName}
            value={name}
          />
        </Form.Group>

        <Form.Group controlId='formName'>
          <Form.Label>Area</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name of order'
            onChange={onChangeArea}
            value={area}
          />
        </Form.Group>

        <div style={{ marginBottom: '10px' }} ref={ref}>
          <Form.Label>Search Address</Form.Label>
          <Form.Control
            type='text'
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder='Where are you going?'
            style={{ width: '100%' }}
          />
          {/* We can use the "status" to decide whether we should display the dropdown or not */}
          {status === 'OK' && (
            <ul style={{ listStyleType: 'none' }}>{renderSuggestions()}</ul>
          )}
        </div>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='123 Street'
            value={address}
            onChange={onChangeAddress}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='City'
            value={city}
            onChange={onChangeCity}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>State</Form.Label>
          <Form.Control
            type='text'
            placeholder='State'
            value={state}
            onChange={onChangeState}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>ZipCode</Form.Label>
          <Form.Control
            type='text'
            placeholder='12345'
            value={zipCode}
            onChange={onChangeZipCode}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Order Type</Form.Label>
          <Form.Control as='select' onChange={onChangeOrderType} value={orderType}>
            <option>Select Order Type</option>
            <option>Erotic</option>
            <option>Cheetah</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Order Status</Form.Label>
          <Form.Control as='select' onChange={onChangeOrderStatus} value={orderStatus}>
            <option>Select Order Status</option>
            <option>Pending</option>
            <option>Ordered</option>
            <option>Delivered</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Quantity</Form.Label>
          <div>
            <Form.Control
              type='text'
              value={quantity}
              placeholder='1'
              style={{ width: '50px', display: 'inline' }}
            />
            <Button
              style={{
                display: 'inline',
                marginLeft: '5px',
                verticalAlign: 'top',
                fontWeight: 'bold',
              }}
              onClick={onClickPlus}
            >
              +
            </Button>
            <Button
              style={{
                display: 'inline',
                marginLeft: '5px',
                verticalAlign: 'top',
                fontWeight: 'bold',
              }}
              onClick={onClickMinus}
            >
              -
            </Button>
          </div>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Price</Form.Label>
          <div className='input-group'>
            <span className='input-group-addon'>$</span>
            <Form.Control
              type='number'
              placeholder='10.00'
              min='1'
              step='0.01'
              value={price}
              onChange={onChangePrice}
            />
          </div>
        </Form.Group>

        <Form.Group controlId='formBasicCheckbox'>
          <Form.Check
            type='checkbox'
            label='PrePaid'
            checked={prepaid}
            onChange={onPrePaidCheckClick}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={4}
            value={description}
            placeholder='Description here'
            onChange={onChangeDescription}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Source of Traffic</Form.Label>
          <Form.Control
            as='select'
            onChange={onChangeTrafficSource}
            value={trafficSource}
          >
            <option>Select Traffic</option>
            <option>3009 Moms group</option>
            <option>Facebook</option>
            <option>Instagram</option>
          </Form.Control>
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
        <br></br>
      </Form>
    </Container>
  );
}

export default CreateOrder;
