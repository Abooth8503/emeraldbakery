import * as React from 'react';
import { useEffect } from 'react';

export interface Order {
  Id: number;
  Name: string;
  Area: string;
  Address: string;
  City: string;
  State: string;
  ZipCode: string;
  OrderType: string;
  Quantity: number;
  Description: string;
  DeliveryDate: Date;
  OrderDate: Date;
  PrePaid: boolean;
}

const useOrders = (initial: Order[] = []) => {
  const [orders, setOrders] = React.useState<Order[]>(initial);
  const [newOrder, setNewOrder] = React.useState<string>('');

  // useEffect(() => {
  //   fetch(`http://localhost:7071/api/Function1`)
  //     .then((response) => response.json()) // parse JSON from request
  //     .then((resultData) => {
  //       setOrders(resultData);
  //     });
  // }, []);

  function fetchOrders() {
    fetch(`http://localhost:7071/api/Function1`)
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        setOrders(resultData);
      });
  }

  return {
    orders,
    newOrder,
    setNewOrder,
    setOrders,
    fetchOrders,
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
