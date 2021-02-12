/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './css/reactCalendar.css';
import { Container } from 'react-bootstrap';

type Detail = 'month' | 'year' | 'decade' | 'century';
interface CalendarTileProperties {
  activeStartDate: Date;
  date: Date;
  view: Detail;
}

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
    console.log('date and view', date, view, moment(date).format('MM-DD-YYYY'));
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

function CalendarOrders(): JSX.Element {
  const [value, onChange] = React.useState<Date | Date[]>(new Date());

  return (
    <Container className='text-center'>
      <Calendar
        onChange={(val) => onChange(val)}
        value={value}
        tileClassName={tileClassName}
      />
    </Container>
  );
}

export default CalendarOrders;
