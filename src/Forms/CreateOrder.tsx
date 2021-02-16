/* eslint-disable no-irregular-whitespace */
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
import { calculateDays, Order } from '../Interfaces/EmeraldTypes';

const year = new Date().getFullYear();
const years = Array.from(new Array(2), (val, index) => year - index);

const times = [
  '05:00 AM',
  '05:30 AM',
  '06:00 AM',
  '06:30 AM',
  '07:00 AM',
  '07:30 AM',
  '08:00 AM',
  '08:30 AM',
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '13:00 PM',
  '13:30 PM',
  '14:00 PM',
  '14:30 PM',
  '15:00 PM',
  '15:30 PM',
  '16:00 PM',
  '16:30 PM',
  '17:00 PM',
  '17:30 PM',
  '18:00 PM',
  '18:30 PM',
  '19:00 PM',
  '19:30 PM',
  '20:00 PM',
  '20:30 PM',
  '21:00 PM',
  '21:30 PM',
  '22:00 PM',
  '22:30 PM',
  '23:00 PM',
  '23:30 PM',
  '24:00 AM',
];

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
  const [deliveryMonth, deliveryMonthSet] = React.useState<string | undefined>(undefined);
  const [deliveryDay, deliveryDaySet] = React.useState<string | undefined>(undefined);
  const [deliveryYear, deliveryYearSet] = React.useState<string | undefined>(undefined);
  const [daysLength, daysLengthSet] = React.useState<number>(31);
  const [beginTime, beginTimeSet] = React.useState<string | undefined>(undefined);
  const [deliveryMonthEnd, deliveryMonthEndSet] = React.useState<string | undefined>(
    undefined
  );
  const [deliveryDayEnd, deliveryDayEndSet] = React.useState<string | undefined>(
    undefined
  );
  const [deliveryYearEnd, deliveryYearEndSet] = React.useState<string | undefined>(
    undefined
  );
  const [daysLengthEnd, daysLengthEndSet] = React.useState<number>(31);
  const [endTime, endTimeSet] = React.useState<string | undefined>(undefined);
  // validation state
  const [nameValidated, setNameValidated] = React.useState<boolean>(false);
  const [areaValidated, setAreaValidated] = React.useState<boolean>(false);
  const [addressValidated, setAddressValidated] = React.useState<boolean>(false);
  const [cityValidated, setCityValidated] = React.useState<boolean>(false);
  const [stateValidated, setStateValidated] = React.useState<boolean>(false);
  const [zipCodeValidated, setZipCodeValidated] = React.useState<boolean>(false);
  const [orderTypeValidated, setOrderTypeValidated] = React.useState<boolean>(false);
  const [orderStatusValidated, setOrderStatusValidated] = React.useState<boolean>(false);
  const [quantityValidated, setQuantityValidated] = React.useState<boolean>(false);
  const [priceValidated, setPriceValidated] = React.useState<boolean>(false);
  const [prepaidValidated, setPrepaidValidated] = React.useState<boolean>(false);
  const [descriptionValidated, setDescriptionValidated] = React.useState<boolean>(false);
  const [trafficSourceValidated, setTrafficSourceValidated] = React.useState<boolean>(
    false
  );
  const [deliveryMonthValidated, setDeliveryMonthValidated] = React.useState<boolean>(
    false
  );
  const [deliveryDayValidated, setDeliveryDayValidated] = React.useState<boolean>(false);
  const [deliveryYearValidated, setDeliveryYearValidated] = React.useState<boolean>(
    false
  );
  const [beginTimeValidated, setBeginTimeValidated] = React.useState<boolean>(false);
  const [
    deliveryDateMonthEndValidated,
    setDeliveryDateMonthEndValidated,
  ] = React.useState<boolean>(false);
  const [
    deliveryDateDayEndValidated,
    setDeliveryDateDayEndValidated,
  ] = React.useState<boolean>(false);
  const [
    deliveryDateYearEndValidated,
    setdeliveryDateYearEndValidated,
  ] = React.useState<boolean>(false);
  const [endTimeValidated, setEndTimeValidated] = React.useState<boolean>(false);

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

    // Get Zip code from address.
    getGeocode({ address: description })
      .then((results) => getZipCode(results[0], false))
      .then((zip) => {
        console.log('ZipCode: ', zip);
        if (zip !== null) {
          zipCodeSet(zip);
        }
      });
  };

  // Render temp ul of suggestions
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

  function onChangeDeliveryMonth(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    const newDate = e.target.value;
    deliveryMonthSet(e.target.value);
    if (deliveryYear !== undefined) {
      daysLengthSet(calculateDays(newDate, deliveryYear));
    }
  }

  function onChangeDeliveryDay(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    deliveryDaySet(e.target.value);
  }

  function onChangeDeliveryYear(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    deliveryYearSet(e.target.value);
    if (deliveryMonth !== undefined) {
      daysLengthSet(calculateDays(deliveryMonth, e.target.value));
    }
  }

  function onChangeBeginTime(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    beginTimeSet(e.target.value);
  }

  function onChangeDeliveryMonthEnd(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    deliveryMonthEndSet(e.target.value);
    if (deliveryYearEnd !== undefined) {
      daysLengthEndSet(calculateDays(e.target.value, deliveryYearEnd));
    }
  }

  function onChangeDeliveryDayEnd(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    deliveryDayEndSet(e.target.value);
  }

  function onChangeEndTime(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    endTimeSet(e.target.value);
  }

  function onChangeDeliveryYearEnd(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    deliveryYearEndSet(e.target.value);
    if (deliveryMonthEnd !== undefined) {
      daysLengthEndSet(calculateDays(deliveryMonthEnd, e.target.value));
    }
  }

  function isFormValidated(): void {
    // if (
    //   this.state.isDollarAmtValidated &&
    //   this.state.isFormUploaded &&
    //   this.state.isUnitValidated
    // ) {
    //   this.setState({
    //     isSubmitDisabled: false,
    //   });
    // } else {
    //   this.setState({
    //     isSubmitDisabled: true,
    //   });
    // }
  }

  function insertOrder(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

    const orderContent: Order = {
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
      DeliveryDate: new Date(`${deliveryMonth}/${deliveryDay}/${deliveryYear}`),
      DeliveryDateEnd: new Date(
        `${deliveryMonthEnd}/${deliveryDayEnd}/${deliveryYearEnd}`
      ),
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
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name of order'
            onChange={onChangeName}
            value={name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Area</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name of Area'
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
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='123 Street'
            value={address}
            onChange={onChangeAddress}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='City'
            value={city}
            onChange={onChangeCity}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>State</Form.Label>
          <Form.Control
            type='text'
            placeholder='State'
            value={state}
            onChange={onChangeState}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>ZipCode</Form.Label>
          <Form.Control
            type='text'
            placeholder='12345'
            value={zipCode}
            onChange={onChangeZipCode}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Order Type</Form.Label>
          <Form.Control as='select' onChange={onChangeOrderType} value={orderType}>
            <option>Select Order Type</option>
            <option>Erotic</option>
            <option>Cheetah</option>
            <option>Other</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Order Status</Form.Label>
          <Form.Control as='select' onChange={onChangeOrderStatus} value={orderStatus}>
            <option>Select Order Status</option>
            <option>Pending</option>
            <option>Ordered</option>
            <option>Delivered</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
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
        <Form.Group>
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
        <Form.Label>Delivery Begin Date</Form.Label>  
        <Form.Group>
          <Form.Control
            as='select'
            value={deliveryMonth}
            onChange={onChangeDeliveryMonth}
            style={{ width: '78px', display: 'inline' }}
          >
            <option value='MM'>MM</option>
            {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(
              (day) => {
                return <option value={`${day}`} key={Number(day)}>{`${day}`}</option>;
              }
            )}
          </Form.Control>
                        
          <Form.Control
            as='select'
            id='addDay'
            value={deliveryDay}
            onChange={onChangeDeliveryDay}
            style={{ width: '78px', display: 'inline' }}
          >
            <option value='DD'>DD</option>
            {[
              '01',
              '02',
              '03',
              '04',
              '05',
              '06',
              '07',
              '08',
              '09',
              '10',
              '11',
              '12',
              '13',
              '14',
              '15',
              '16',
              '17',
              '18',
              '19',
              '20',
              '21',
              '22',
              '23',
              '24',
              '25',
              '26',
              '27',
              '28',
              '29',
              '30',
              '31',
            ]
              .filter((numberOfDays) => {
                return Number(numberOfDays) <= daysLength;
              })
              .map((day) => {
                return (
                  <option value={`${day}`} key={`day-${Number(day)}`}>{`${day}`}</option>
                );
              })}
          </Form.Control>
                       
          <Form.Control
            as='select'
            id='addYear'
            value={deliveryYear}
            onChange={onChangeDeliveryYear}
            style={{ display: 'inline', width: '100px' }}
          >
            <option value='YYYY'>YYYY</option>       
            {years.map((everyYear, index) => {
              const keyIndex = index;
              return (
                <option key={`everyYear-${keyIndex}`} value={everyYear}>
                  {everyYear}           
                </option>
              );
            })}
          </Form.Control>
          <Form.Label style={{ marginTop: '10px' }}>Begin Time</Form.Label>  
          <Form.Control
            as='select'
            id='beginTimeCtl'
            value={beginTime}
            onChange={onChangeBeginTime}
            style={{ width: '40%' }}
          >
            <option>Select Time</option>        
            {times.map((time, index) => {
              const keyIndex = index;
              return (
                <option key={`time-${keyIndex}`} value={time}>
                  {time}           
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <hr></hr>
        <Form.Label>Delivery End Date</Form.Label>  
        <Form.Group>
          <Form.Control
            as='select'
            value={deliveryMonthEnd}
            onChange={onChangeDeliveryMonthEnd}
            style={{ width: '78px', display: 'inline' }}
          >
            <option value='MM'>MM</option>
            {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(
              (day) => {
                return <option value={`${day}`} key={Number(day)}>{`${day}`}</option>;
              }
            )}
          </Form.Control>
                        
          <Form.Control
            as='select'
            id='addDay'
            value={deliveryDayEnd}
            onChange={onChangeDeliveryDayEnd}
            style={{ width: '78px', display: 'inline' }}
          >
            <option value='DD'>DD</option>
            {[
              '01',
              '02',
              '03',
              '04',
              '05',
              '06',
              '07',
              '08',
              '09',
              '10',
              '11',
              '12',
              '13',
              '14',
              '15',
              '16',
              '17',
              '18',
              '19',
              '20',
              '21',
              '22',
              '23',
              '24',
              '25',
              '26',
              '27',
              '28',
              '29',
              '30',
              '31',
            ]
              .filter((numberOfDays) => {
                return Number(numberOfDays) <= daysLengthEnd;
              })
              .map((day) => {
                return (
                  <option value={`${day}`} key={`day-${Number(day)}`}>{`${day}`}</option>
                );
              })}
          </Form.Control>
                       
          <Form.Control
            as='select'
            id='addYear'
            value={deliveryYearEnd}
            onChange={onChangeDeliveryYearEnd}
            style={{ display: 'inline', width: '100px' }}
          >
            <option value='YYYY'>YYYY</option>       
            {years.map((everyYear, index) => {
              const keyIndex = index;
              return (
                <option key={`everyYear-${keyIndex}`} value={everyYear}>
                  {everyYear}           
                </option>
              );
            })}
          </Form.Control>
          <Form.Label style={{ marginTop: '10px' }}>End Time</Form.Label>  
          <Form.Control
            as='select'
            id='endTimeCtl'
            value={endTime}
            onChange={onChangeEndTime}
            style={{ width: '40%' }}
          >
            <option>Select Time</option>        
            {times.map((time, index) => {
              const keyIndex = index;
              return (
                <option key={`time-${keyIndex}`} value={time}>
                  {time}           
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group style={{ marginTop: '5px' }}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={4}
            value={description}
            placeholder='Description here'
            onChange={onChangeDescription}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Source of Traffic</Form.Label>
          <Form.Control
            as='select'
            onChange={onChangeTrafficSource}
            value={trafficSource}
          >
            <option>Select Traffic</option>
            <option>3009 Moms group</option>
            <option>San Antonio Moms group</option>
            <option>Grocery Facebook Group</option>
            <option>Facebook</option>
            <option>Instagram</option>
            <option>Other</option>
          </Form.Control>
        </Form.Group>
        <Button variant='primary' onClick={insertOrder}>
          Submit
        </Button>
        <br></br>
      </Form>
    </Container>
  );
}

export default CreateOrder;
