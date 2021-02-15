/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { Container, Jumbotron, Form, Button } from 'react-bootstrap';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';

function CreateOrder() {
  const [address, addressSet] = React.useState<string | undefined>(undefined);
  const [city, citySet] = React.useState<string | undefined>(undefined);
  const [state, stateSet] = React.useState<string | undefined>(undefined);
  const [orderType, orderTypeSet] = React.useState<string | undefined>(undefined);
  const [quantity, quantitySet] = React.useState<number>(0);
  const [price, priceSet] = React.useState<string | undefined>(undefined);
  const [prepaid, prepaidSet] = React.useState<boolean>(false);
  const [description, descriptionSet] = React.useState<string | undefined>(undefined);

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
    place_id: any;
  }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    console.log('id is ', description);
    clearSuggestions();

    const address = description.split(',');
    if (address.length > 3) {
      //
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

  function onChangeOrderType(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    orderTypeSet(e.target.value);
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

  return (
    <Container>
      <Jumbotron style={{ backgroundColor: 'white', marginTop: '3px' }}>
        <h2 className='text-center'>Create Order</h2>
      </Jumbotron>

      <Form>
        <Form.Group controlId='formName'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder='Enter name of order' />
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
          <Form.Label>Order Type</Form.Label>
          <Form.Control as='select' onChange={onChangeOrderType} value={orderType}>
            <option>Select Order Type</option>
            <option>Erotic</option>
            <option>Cheetah</option>
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
            label='PrePaid?'
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
          <Form.Control as='select'>
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
