import * as React from 'react';
import Calendar from 'react-calendar';
// import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './css/reactCalendar.css';
import { Container } from 'react-bootstrap';

const mark = ['02-04-2021', '02-05-2021', '02-03-2021'];

function CalendarOrders(): JSX.Element {
  const [value, onChange] = React.useState<Date | Date[]>(new Date());

  return (
    <Container className='text-center'>
      <Calendar
        onChange={(val) => onChange(val)}
        value={value}
        // tileClassName={({ date, view }) => {
        //   if (mark.find((x) => x === moment(date).format('DD-MM-YYYY'))) {
        //     return 'highlight';
        //   }
        // }}
      />
    </Container>
  );
}

export default CalendarOrders;
