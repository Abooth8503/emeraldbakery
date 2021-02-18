import * as React from 'react';
import { useEffect } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './css/reactCalendar.css';
import { useEmeraldContext, formatDate } from './Interfaces/EmeraldTypes';

function OrderDetail(): JSX.Element {
  const { orders, fetchOrders } = useEmeraldContext();
  const [value, onChange] = React.useState<Date | Date[]>(new Date());
  const [selectedDay, daySet] = React.useState<Date | undefined>(undefined);

  useEffect(() => {
    fetchOrders();
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function tileClassName({
    date,
    view,
  }: {
    date: any;
    view: any;
  }): string | string[] | null {
    // Add class to tiles in month view only
    if (view === 'month') {
      // console.log('date and view', date, view, moment(date).format('MM-DD-YYYY'));

      if (
        orders.find(
          (x) =>
            moment(x.DeliveryDate).format('MM-DD-YYYY') ===
            moment(date).format('MM-DD-YYYY')
        )
      ) {
        // console.log('found day!');
        return 'highlight';
      }
      return null;
    }
    return null;
  }

  function onClickDayDate(value: Date): void {
    console.log('onclickday is ', value);
    daySet(value);
    return;
  }

  return (
    <React.Fragment>
      <Container className='text-center' style={{ marginTop: '5px' }}>
        <Jumbotron style={{ backgroundColor: 'white' }}>
          <h2>Order Detail</h2>
        </Jumbotron>
        <Calendar
          onChange={(val) => onChange(val)}
          value={value}
          tileClassName={tileClassName}
          onClickDay={onClickDayDate}
          className='centercalendar'
        />
        
      </Container>
    </React.Fragment>
  );
}

export default OrderDetail;
