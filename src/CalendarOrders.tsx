/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './css/reactCalendar.css';
import { Container } from 'react-bootstrap';

const mark = ['02/04/2021', '02/05/2021', '02/03/2021'];

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
      mark.find(
        (x) => moment(x).format('MM-DD-YYYY') === moment(date).format('MM-DD-YYYY')
      )
    ) {
      console.log('found day!');
      return 'highlight';
    }
    return null;
  }
  return null;
}

function onClickDayDate(value: Date): void {
  console.log('onclickday is ', value);
  return;
}

function CalendarOrders(): JSX.Element {
  const [value, onChange] = React.useState<Date | Date[]>(new Date());

  console.log('value is ', value, ' type of: ', typeof value);

  return (
    <Container className='text-center'>
      <Calendar
        onChange={(val) => onChange(val)}
        value={value}
        tileClassName={tileClassName}
        onClickDay={onClickDayDate}
      />
    </Container>
  );
}

export default CalendarOrders;
