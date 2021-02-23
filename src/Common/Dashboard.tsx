import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import { useEmeraldContext } from '../Interfaces/EmeraldTypes';

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

interface Props {
  userName: string;
}

function Dashboard(props: Props): JSX.Element {
  const { orders } = useEmeraldContext();

  const randNumber = Math.floor(Math.random() * motivationalQuotes.length);
  if (orders.length < 1) {
    return <div>Loading...</div>;
  }

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
      <Row>
        <Col style={{ fontSize: 'larger' }}>
          {' '}
          Total <Link to='/orders'>Orders</Link>: {orders.length}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
