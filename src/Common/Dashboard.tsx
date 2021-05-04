import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Jumbotron, Form } from 'react-bootstrap';
import { Order, useEmeraldContext, Orders } from '../Interfaces/EmeraldTypes';

const motivationalQuotes = [
  {
    quote: 'The hard days are what make you stronger.',
    name: 'Aly Raisman',
  },
  {
    quote: 'Keep your eyes on the stars, and your feet on the ground.',
    name: 'Theodore Roosevelt',
  },
  {
    quote:
      'You can waste your lives drawing lines. Or you can live your life crossing them',
    name: 'Shonda Rhimes',
  },
  {
    quote: 'All our dreams can come true, if we have the courage to pursue them.',
    name: 'Walt Disney',
  },
  {
    quote: 'The secret of getting ahead is getting started.',
    name: 'Mark Twain',
  },
  {
    quote:
      'I’ve missed more than 9,000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life and that is why I succeed.',
    name: 'Michael Jordan',
  },
  {
    quote:
      'Don’t limit yourself. Many people limit themselves to what they think they can do. You can go as far as your mind lets you. What you believe, remember, you can achieve.',
    name: 'Mary Kay Ash',
  },
  { quote: 'It’s hard to beat a person who never gives up.', name: 'Babe Ruth' },
  { quote: 'If opportunity doesn’t knock, build a door.', name: 'Kurt Cobain' },
  { quote: 'Work hard in silence, let your success be the noise.', name: 'Frank Ocean' },
  { quote: 'Hard work beats talent when talent doesn’t work hard.', name: 'Tim Notke' },
  { quote: 'Don’t limit your challenges. Challenge your limits.', name: 'Unknown' },
  {
    quote: 'Start where you are. Use what you have. Do what you can.',
    name: 'Arthur Ashe',
  },
];

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

interface Props {
  userName: string;
}

function Dashboard(props: Props): JSX.Element {
  const { orders } = useEmeraldContext();
  const [employee, setEmployee] = React.useState<string | undefined>('Select Employee');
  const [dashboardOrders, setDashboardOrders] = React.useState<Orders>(orders);

  useEffect(() => {
    switch (props.userName) {
      case 'Ariel Castillo':
        setDashboardOrders(
          orders.filter((empOrder) => empOrder.EmployeeName === 'Ariel')
        );
        break;
      case 'Paul Castillo':
        setDashboardOrders(
          orders.filter((empOrder) => empOrder.EmployeeName === 'Jordan')
        );
        break;
      case 'Jordan Hebert':
        setDashboardOrders(
          orders.filter((empOrder) => empOrder.EmployeeName === 'Jordan')
        );
        break;
      default:
        console.log('default');
    }
  }, []);

  function onChangeEmployee(e: React.ChangeEvent<HTMLSelectElement>): void {
    e.preventDefault();
    setEmployee(e.target.value);
    if (e.target.value === 'Ariel') {
      setDashboardOrders(orders.filter((empOrder) => empOrder.EmployeeName === 'Ariel'));
    } else if (e.target.value === 'Jordan') {
      setDashboardOrders(orders.filter((empOrder) => empOrder.EmployeeName === 'Jordan'));
    } else {
      setDashboardOrders(orders);
    }
  }

  const randNumber = Math.floor(Math.random() * motivationalQuotes.length);
  if (orders.length < 1) {
    return <div>Loading...</div>;
  }

  const deliveredOrders = dashboardOrders.filter((order: Order) => {
    return order.OrderStatus === 'Delivered';
  });

  const sumCost = deliveredOrders.reduce(
    (cost: number, entry: any) => cost + (parseFloat(entry.Price) || 0),
    0
  );

  const orderedButNotDeliveredandNotCancelled = dashboardOrders.filter((order: Order) => {
    return order.OrderStatus === 'Ordered';
  });

  console.log('Price of all Delivered is: ', formatter.format(sumCost));

  const userNameString = props.userName.split(' ')[0];
  return (
    <Container fluid>
      <Row className='justify-content-center h-100' style={{ marginTop: '5px' }}>
        <Col>
          <Jumbotron style={{ backgroundColor: 'white' }}>
            <h2
              className='text-center'
              style={{ fontFamily: 'AmaticSC-Bold', fontSize: 'xxx-large' }}
            >
              Welcome {userNameString}!
            </h2>
          </Jumbotron>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col>
          <figure className='quote'>
            <blockquote
              style={{ fontSize: 'large' }}
            >{`"${motivationalQuotes[randNumber].quote}"`}</blockquote>
            <figcaption
              style={{
                textAlign: 'right',
                fontSize: 'larger',
              }}
            >
              <cite>{`- ${motivationalQuotes[randNumber].name} `}</cite>
            </figcaption>
          </figure>
        </Col>
      </Row>
      <Row style={{ marginTop: '5px' }}>
        <Col style={{ fontSize: 'larger' }}>
          <Jumbotron style={{ backgroundColor: 'white' }}>
            <h5
              style={{
                fontWeight: 'bold',
                fontStyle: 'oblique',
                textDecoration: 'underline',
              }}
            >
              At The Booth Bakery - Dashboard
            </h5>
            <Form.Control
              as='select'
              onChange={onChangeEmployee}
              value={employee}
              style={{ marginBottom: '10px' }}
            >
              <option>Select Employee</option>
              <option>Ariel</option>
              <option>Jordan</option>
              <option>All</option>
            </Form.Control>
            <span>
              Total <Link to='/orders'>Orders</Link>: 📝{dashboardOrders.length}
            </span>
            <br />
            <span>
              Total Paid:
              <span style={{ color: 'green', marginLeft: '5px', fontWeight: 'bold' }}>
                💰{formatter.format(sumCost)}
              </span>
            </span>
            <br></br>
            Total Deliveries: 🚚<span>{deliveredOrders.length}</span>
            <br />
            <hr />
            <span>
              Currently Ordered:
              <span style={{ marginLeft: '5px' }}>
                ✔️{orderedButNotDeliveredandNotCancelled.length}
              </span>
            </span>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
