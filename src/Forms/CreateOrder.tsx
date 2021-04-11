import * as React from 'react';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Jumbotron, Form, Button, Accordion, Card } from 'react-bootstrap';
import moment from 'moment';
import usePlacesAutocomplete, { getGeocode, getZipCode } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { FaCheck } from 'react-icons/fa';
import EmeraldDropzone from '../Common/EmeraldDropzone';
import '../css/createOrder.css';
import {
  calculateDays,
  Order,
  useEmeraldContext,
  OrderType,
} from '../Interfaces/EmeraldTypes';

type Props = {
  routeComponentProps: RouteComponentProps;
  user: string;
};

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

function CreateOrder(props: Props): JSX.Element {
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
  const [porcheDropoff, setPorchDropoff] = React.useState<boolean>(false);
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
  const [orderTypeValidated, setOrderTypeValidated] = React.useState<boolean>(false);
  const [orderStatusValidated, setOrderStatusValidated] = React.useState<boolean>(false);
  const [quantityValidated, setQuantityValidated] = React.useState<boolean>(false);
  const [priceValidated, setPriceValidated] = React.useState<boolean>(false);
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
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState<boolean>(true);
  // other
  const [isOrderSubmitted, setOrderSubmitted] = React.useState<boolean>(false);
  const [filteredBeginTime, setFilteredBeginTime] = React.useState<string>('');
  const [uploadFiles, setUploadFiles] = React.useState<Array<File>>([]);
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(undefined);

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

  const { orders, orderTypes } = useEmeraldContext();

  useEffect(() => {
    if (props.routeComponentProps.location.state !== undefined) {
      const filteredEditOrder = orders.filter(
        (order) => order.Id === props.routeComponentProps.location.state
      );

      console.log('order editing', filteredEditOrder);

      if (filteredEditOrder.length > 0) {
        setIsSubmitDisabled(false);
        nameSet(filteredEditOrder[0].Name);
        areaSet(filteredEditOrder[0].Area);
        addressSet(filteredEditOrder[0].Address);
        citySet(filteredEditOrder[0].City);
        stateSet(filteredEditOrder[0].State);
        zipCodeSet(filteredEditOrder[0].ZipCode);
        orderTypeSet(filteredEditOrder[0].OrderType);
        orderStatusSet(filteredEditOrder[0].OrderStatus);
        quantitySet(filteredEditOrder[0].Quantity);
        priceSet(filteredEditOrder[0].Price);
        prepaidSet(filteredEditOrder[0].PrePaid);
        setPorchDropoff(filteredEditOrder[0].PorchDropoff);

        // delivery date start
        const deliveryDateStart = moment(filteredEditOrder[0].DeliveryDate);
        console.log('start time', deliveryDateStart.format('HH:mm A'));
        deliveryMonthSet(deliveryDateStart.format('MM'));
        deliveryDaySet(deliveryDateStart.format('DD'));
        deliveryYearSet(deliveryDateStart.format('YYYY'));
        beginTimeSet(deliveryDateStart.format('HH:mm A'));

        // delivery date end
        const deliveryDateEnd = moment(filteredEditOrder[0].DeliveryDateEnd);
        deliveryMonthEndSet(deliveryDateEnd.format('MM'));
        deliveryDayEndSet(deliveryDateEnd.format('DD'));
        deliveryYearEndSet(deliveryDateEnd.format('YYYY'));
        endTimeSet(deliveryDateEnd.format('HH:mm A'));

        trafficSourceSet(filteredEditOrder[0].TrafficSource);
        descriptionSet(filteredEditOrder[0].Description);
        if (
          filteredEditOrder[0].OrderImageUrl !== null ||
          filteredEditOrder[0].OrderImageUrl !== undefined
        ) {
          setImageUrl(filteredEditOrder[0].OrderImageUrl);
          const path = filteredEditOrder[0].OrderImageUrl;
          if (path !== undefined && path !== null) {
            const fileName = path.replace(/^.*[\\/]/, '');
            Download(path, fileName);
          }
        }
      }
    }
  }, []);

  async function Download(path: string, fileName: string): Promise<void> {
    const a = document.createElement('a');
    a.href = await toDataURL(path, fileName);
    a.download = fileName;
    document.body.appendChild(a);
    // a.click();
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

  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
    if (address.length > 3) {
      // set address, city and state
      addressSet(address[0]);
      citySet(address[1]);
      stateSet(address[2]);
    }

    // Get Zip code from address.
    getGeocode({ address: description })
      .then((results) => getZipCode(results[0], false))
      .then((zip) => {
        if (zip !== null) {
          zipCodeSet(zip);
        }
      });
  };

  // Render temp ul of suggestions
  const renderSuggestions = (): JSX.Element[] =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          📍-<strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  function onChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    nameSet(e.target.value);
    if (name !== undefined) {
      if (name?.length > 0) {
        setNameValidated(true);
      }
    }
    isFormValidated();
  }

  function onChangeArea(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    areaSet(e.target.value);
  }

  function onChangeAddress(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    addressSet(e.target.value);
  }

  function onChangeCity(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    citySet(e.target.value);
  }

  function onChangeState(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    stateSet(e.target.value);
  }

  function onChangeZipCode(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    zipCodeSet(e.target.value);
  }

  function onChangeOrderType(e: React.ChangeEvent<HTMLSelectElement>): void {
    e.preventDefault();
    orderTypeSet(e.target.value);

    if (orderType !== undefined) {
      if (orderType?.length > 0) {
        setOrderTypeValidated(true);
      }
    }
    isFormValidated();
  }

  function onChangeOrderStatus(e: React.ChangeEvent<HTMLSelectElement>): void {
    e.preventDefault();
    orderStatusSet(e.target.value);

    if (orderStatus !== undefined) {
      if (orderStatus?.length > 0) {
        setOrderStatusValidated(true);
      }
    }
    isFormValidated();
  }

  function onClickPlus(e: React.MouseEvent): void {
    e.preventDefault();
    quantitySet(quantity + 1);

    if (quantity !== undefined) {
      setQuantityValidated(true);
    }
    isFormValidated();
  }

  function onClickMinus(e: React.MouseEvent): void {
    e.preventDefault();
    quantitySet(quantity - 1);

    if (quantity !== undefined) {
      setQuantityValidated(true);
    }
    isFormValidated();
  }

  function onChangePrice(e: React.ChangeEvent<HTMLSelectElement>): void {
    e.preventDefault();
    priceSet(e.target.value);

    if (price !== undefined) {
      setPriceValidated(true);
    }
    isFormValidated();
  }

  function onChangeDescription(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    e.preventDefault();
    descriptionSet(e.target.value);
  }

  function onChangeTrafficSource(e: React.ChangeEvent<HTMLSelectElement>): void {
    e.preventDefault();
    trafficSourceSet(e.target.value);
    if (e.target.value !== undefined) {
      setTrafficSourceValidated(true);
    }
    isFormValidated();
  }

  function onChangeDeliveryMonth(e: React.ChangeEvent<HTMLSelectElement>): void {
    e.preventDefault();
    const newDate = e.target.value;
    deliveryMonthSet(e.target.value);
    deliveryMonthEndSet(e.target.value);
    if (deliveryYear !== undefined) {
      daysLengthSet(calculateDays(newDate, deliveryYear));
    }
    if (e.target.value !== 'MM' && e.target.value !== undefined) {
      setDeliveryMonthValidated(true);
    }
    isFormValidated();
  }

  function onChangeDeliveryDay(e: React.ChangeEvent<HTMLSelectElement>): void {
    e.preventDefault();
    deliveryDaySet(e.target.value);
    deliveryDayEndSet(e.target.value);
    if (e.target.value !== 'DD' && e.target.value !== undefined) {
      setDeliveryDayValidated(true);
    }
    isFormValidated();
  }

  function onChangeDeliveryYear(e: React.ChangeEvent<HTMLSelectElement>): void {
    e.preventDefault();
    deliveryYearSet(e.target.value);
    deliveryYearEndSet(e.target.value);
    if (deliveryMonth !== undefined) {
      daysLengthSet(calculateDays(deliveryMonth, e.target.value));
    }
    if (e.target.value !== 'YYYY' && e.target.value !== undefined) {
      setDeliveryYearValidated(true);
    }
    isFormValidated();
  }

  function onChangeBeginTime(e: React.ChangeEvent<HTMLSelectElement>): void {
    e.preventDefault();

    beginTimeSet(e.target.value);
    // console.log(
    //   'onChange begin time',
    //   e.target.value,
    //   moment(e.target.value, 'HH:mm').format('hh:mm a').toString()
    // );
    const beginTime: string = moment(e.target.value, 'HH:mm')
      .format('hh:mm a')
      .toString();
    if (beginTime !== 'Select a Time') {
      setFilteredBeginTime(beginTime);
    } else {
      setFilteredBeginTime('');
    }
    if (e.target.value !== 'Select Time') {
      setBeginTimeValidated(true);
    }
  }

  function onChangeDeliveryMonthEnd(e: React.ChangeEvent<HTMLSelectElement>): void {
    e.preventDefault();
    deliveryMonthEndSet(e.target.value);
    if (deliveryYearEnd !== undefined) {
      daysLengthEndSet(calculateDays(e.target.value, deliveryYearEnd));
    }
    if (e.target.value !== 'MM' && e.target.value !== undefined) {
      setDeliveryDateMonthEndValidated(true);
    }
    isFormValidated();
  }

  function onChangeDeliveryDayEnd(e: React.ChangeEvent<HTMLSelectElement>): void {
    e.preventDefault();
    deliveryDayEndSet(e.target.value);
    if (e.target.value !== 'DD' && e.target.value !== undefined) {
      setDeliveryDateDayEndValidated(true);
    }
    isFormValidated();
  }

  function onChangeEndTime(e: React.ChangeEvent<HTMLSelectElement>): void {
    e.preventDefault();
    endTimeSet(e.target.value);
    if (e.target.value !== 'Select Time') {
      setEndTimeValidated(true);
    }
  }

  function onChangeDeliveryYearEnd(e: React.ChangeEvent<HTMLSelectElement>): void {
    e.preventDefault();
    deliveryYearEndSet(e.target.value);
    if (deliveryMonthEnd !== undefined) {
      daysLengthEndSet(calculateDays(deliveryMonthEnd, e.target.value));
    }
    if (e.target.value !== 'YYYY' && e.target.value !== undefined) {
      setdeliveryDateYearEndValidated(true);
    }
    isFormValidated();
  }

  function isFormValidated(): void {
    if (
      nameValidated &&
      orderTypeValidated &&
      orderStatusValidated &&
      quantityValidated &&
      priceValidated &&
      trafficSourceValidated &&
      deliveryMonthValidated &&
      deliveryDayValidated &&
      deliveryYearValidated &&
      beginTimeValidated &&
      deliveryDateMonthEndValidated &&
      deliveryDateDayEndValidated &&
      deliveryDateYearEndValidated &&
      endTimeValidated &&
      isSubmitDisabled
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }

  function insertOrder(e: React.MouseEvent<HTMLElement>): void {
    e.preventDefault();

    const orderContent: Order = {
      Id:
        props.routeComponentProps.location.state === undefined
          ? 0
          : Number(props.routeComponentProps.location.state),
      Name: name === undefined ? ' ' : name.trim(),
      Area: area === undefined ? ' ' : area.trim(),
      Address: address === undefined ? ' ' : address.trim(),
      City: city === undefined ? ' ' : city.trim(),
      State: state === undefined ? ' ' : state.trim(),
      ZipCode: zipCode === undefined ? ' ' : zipCode.trim(),
      OrderType: orderType === undefined ? ' ' : orderType.trim(),
      OrderStatus: orderStatus === undefined ? ' ' : orderStatus.trim(),
      Quantity: quantity,
      Price: price === undefined ? '0' : price,
      Description: description === undefined ? ' ' : description.trim(),
      DeliveryDate: `${deliveryMonth}/${deliveryDay}/${deliveryYear} ${beginTime}`,
      DeliveryDateEnd: `${deliveryMonthEnd}/${deliveryDayEnd}/${deliveryYearEnd} ${endTime}`,
      OrderDate: new Date(),
      PrePaid: prepaid,
      TrafficSource: trafficSource === undefined ? ' ' : trafficSource.trim(),
      User: props.user === undefined ? ' ' : props.user.trim(),
      CreatedBy: props.user === undefined ? ' ' : props.user.trim(),
      ImageUrl: '',
      OrderImageUrl: imageUrl === undefined ? ' ' : imageUrl.trim(),
      PorchDropoff: porcheDropoff,
    };

    console.log('payload', orderContent);

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
      setOrderSubmitted(true);

      response.then((resp) => {
        if (resp.status === 200) {
          setTimeout(() => {
            clearFields();
            setOrderSubmitted(false);
          }, 3000);
        } else {
          alert(`There was an error adding a new order. Status code:${resp.status}`);
        }
      });
    } catch (e) {
      console.log(`catch error on create/edit: ${e}`);
    }
  }

  function clearFields(): void {
    nameSet('');
    areaSet('');
    addressSet('');
    citySet('');
    stateSet('');
    zipCodeSet('');
    orderTypeSet('Select Order Type');
    orderStatusSet('Select Order Status');
    quantitySet(0);
    priceSet('');
    deliveryMonthSet('MM');
    deliveryDaySet('DD');
    deliveryYearSet('YYYY');
    deliveryMonthEndSet('MM');
    deliveryDayEndSet('DD');
    deliveryYearEndSet('YYYY');
    beginTimeSet('Select Time');
    endTimeSet('Select Time');
    trafficSourceSet('Select Traffic');
    setUploadFiles([]);
    descriptionSet(''); // Added clear description
    setValue('');
    setPorchDropoff(false);
    prepaidSet(false);
  }

  function GetUploadImage(files: Array<File>): void {
    setUploadFiles(files);
    const imageUrlAzure = `https://emeraldorderfunctionstor.blob.core.windows.net/emeraldbakery/${files[0].name}`;
    setImageUrl(imageUrlAzure);
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
    <Container>
      <Jumbotron style={{ backgroundColor: 'white', marginTop: '3px' }}>
        <h2
          className='text-center'
          style={{ fontFamily: 'AmaticSC-Bold', fontSize: 'xxx-large' }}
        >
          {props.routeComponentProps.location.state === undefined
            ? 'Create Order'
            : 'Edit Order'}
        </h2>
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
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey='0'>
              Address Info
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>
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
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Form.Group>
          <Form.Label>Order Type</Form.Label>
          <Form.Control as='select' onChange={onChangeOrderType} value={orderType}>
            <option>Select Order Type</option>
            {orderTypes.map((orderType) => {
              return <option key={orderType.Id}>{orderType.Name}</option>;
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Order Status</Form.Label>
          <Form.Control as='select' onChange={onChangeOrderStatus} value={orderStatus}>
            <option>Select Order Status</option>
            <option>Pending</option>
            <option>Ordered</option>
            <option>Delivered</option>
            <option>Cancelled</option>
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
            defaultChecked={prepaid}
            onChange={() => prepaidSet(!prepaid)}
          />
          <Form.Check
            type='checkbox'
            label='Porch Dropoff?'
            defaultChecked={porcheDropoff}
            onChange={() => setPorchDropoff(!porcheDropoff)}
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
            style={{ width: '78px', display: 'inline', marginLeft: '5px' }}
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
            style={{ display: 'inline', width: '100px', marginLeft: '5px' }}
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
          <br></br>
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
            style={{ width: '78px', display: 'inline', marginLeft: '5px' }}
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
            style={{ display: 'inline', width: '100px', marginLeft: '5px' }}
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
          <br></br>
          <Form.Label style={{ marginTop: '10px' }}>End Time</Form.Label>
          <Form.Control
            as='select'
            id='endTimeCtl'
            value={endTime}
            onChange={onChangeEndTime}
            style={{ width: '40%' }}
          >
            <option>Select Time</option>
            {filteredBeginTime.length > 0
              ? times
                  .filter((time) => time > filteredBeginTime)
                  .map((time, index) => {
                    const keyIndex = index;
                    return (
                      <option key={`time-${keyIndex}`} value={time}>
                        {time}
                      </option>
                    );
                  })
              : null}

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
            <option>Friend-Relatives</option>
            <option>Other</option>
          </Form.Control>
        </Form.Group>
        <Button variant='primary' onClick={insertOrder} disabled={isSubmitDisabled}>
          Submit
        </Button>
        <Button onClick={clearFields} style={{ marginLeft: '5px' }}>
          Clear
        </Button>
        {isOrderSubmitted ? (
          <Form.Label style={{ marginLeft: '5px' }}>Order is submitted!</Form.Label>
        ) : null}
        <br></br>
      </Form>
    </Container>
  );
}

export default CreateOrder;
