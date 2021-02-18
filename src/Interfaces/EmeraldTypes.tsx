/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { useEffect } from 'react';
import { JsxChild } from 'typescript';

export interface Order {
  Id: number;
  Name: string | undefined;
  Area: string | undefined;
  Address: string | undefined;
  City: string | undefined;
  State: string | undefined;
  ZipCode: string | undefined;
  OrderType: string | undefined;
  OrderStatus: string | undefined;
  Quantity: number;
  Price: string | undefined;
  Description: string | undefined;
  DeliveryDate: Date;
  DeliveryDateEnd: Date;
  OrderDate: Date;
  PrePaid: boolean;
  TrafficSource: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useOrders = (initial: Order[] = []) => {
  const [orders, setOrders] = React.useState<Order[]>(initial);
  const [newOrder, setNewOrder] = React.useState<string>('');

  useEffect(() => {
    fetch(`http://localhost:7071/api/Function1`)
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        setOrders(resultData);
      });
  }, []);

  return {
    orders,
    newOrder,
    setNewOrder,
    setOrders,
  };
};

const EmeraldContext = React.createContext<ReturnType<typeof useOrders> | null>(null);

export const useEmeraldContext = () => React.useContext(EmeraldContext)!;

export function EmeraldProvider({ children }: { children: React.ReactNode }) {
  return (
    <EmeraldContext.Provider value={useOrders([])}>{children}</EmeraldContext.Provider>
  );
}

export type OnChangeDateCallback = (date: Date | Date[]) => void;

export function formatDate(
  date: string | Date,
  withTime: boolean,
  withSlashes: boolean
): string {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dateF = new Date(date);
  const day = dateF.getDate();
  const monthIndex = dateF.getMonth();
  const year = dateF.getFullYear();
  const time = dateF.toLocaleTimeString();
  if (withTime) return `${monthIndex}/${day}/${year} ${time}`;
  if (withSlashes) return `${monthIndex + 1}/${day}/${year}`;

  return `${day} ${monthNames[monthIndex]} ${year}`;
}

export function calculateDate(date: string): number {
  // JavaScript program to illustrate
  // calculation of no. of days between two date

  // To set two dates to two variables
  const date1 = new Date(date);
  const date2 = new Date();

  // To calculate the time difference of two dates
  const DifferenceInTime = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  const DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);

  return Math.floor(DifferenceInDays);
}

export function isLeapYear(yearSelected: number) {
  const isLeapYearMade = yearSelected % 4 === 0;
  const AndEvenDivisible = yearSelected % 100 !== 0;
  const OrEvenDiv100 = yearSelected % 400 === 0;
  console.log('isLeapYear', isLeapYearMade);
  const isItEvenLeapYear = (isLeapYearMade && AndEvenDivisible) || OrEvenDiv100;
  return isItEvenLeapYear;
}
export function calculateDays(month: string, yearSelected: string) {
  let daysArrayLength = 31;
  if (month === '' || yearSelected === '') {
    return daysArrayLength;
  }
  if (
    month === '01' ||
    month === '03' ||
    month === '05' ||
    month === '07' ||
    month === '08' ||
    month === '10' ||
    month === '12'
  ) {
    // these are 31 days
    daysArrayLength = MonthDays.FullMonth;
  } else if (month === '02' && isLeapYear(Number(yearSelected)) === true) {
    daysArrayLength = MonthDays.LeapYear;
  } else if (month === '02') {
    daysArrayLength = MonthDays.NonLeapYear;
  } else if (month === '04' || month === '06' || month === '09' || month === '11') {
    daysArrayLength = MonthDays.Thirty;
  }
  return daysArrayLength;
}
export function isValidDate(day: any, month: any, year: any) {
  return day <= calculateDays(month, year);
}

const MonthDays = { FullMonth: 31, Thirty: 30, NonLeapYear: 28, LeapYear: 29 };
Object.freeze(MonthDays);
