/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import * as H from 'history';
import { useEffect, useLayoutEffect, useState } from 'react';

//https://stackoverflow.com/questions/56457935/typescript-error-property-x-does-not-exist-on-type-window
declare global {
  interface Window {
    OneSignal: any;
  }
}

export enum AtTheBoothBakery_Type {
  Delivered = 'Delivered',
  Ordered = 'ordered',
  Today = 'Today',
}

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
  DeliveryDate: string;
  DeliveryDateEnd: string;
  OrderDate: Date;
  PrePaid: boolean;
  TrafficSource: string | undefined;
  User: string | undefined;
  CreatedBy: string | undefined;
  ImageUrl: string | undefined;
  OrderImageUrl: string | undefined;
  PorchDropoff: boolean;
  Employee: number;
  EmployeeName: string | undefined;
}

export type Orders = Array<Order>;

export interface OrderType {
  Id: number;
  Name: string | undefined;
  Description: string | undefined;
  ImageUrl: string | undefined;
  User: string | undefined;
}

export interface RouteComponentProps<P> {
  match: match<P>;
  location: H.Location;
  history: H.History;
  staticContext?: any;
}

export interface match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}

export async function emeraldGet<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useOrders = (initial: Order[] = [], emeraldOrderTypes: OrderType[] = []) => {
  const [orders, setOrders] = React.useState<Order[]>(initial);
  const [orderTypes, setOrderType] = React.useState<OrderType[]>(emeraldOrderTypes);

  const [newOrder, setNewOrder] = React.useState<string>('');
  useEffect(() => {
    // fetch(`http://localhost:7071/api/Function1`)

    fetchEmeraldOrders();
    fetchEmeraldOrderTypes();
  }, []);

  async function fetchEmeraldOrders(): Promise<void> {
    try {
      const getOrders = new Request(
        `https://emeraldorderfunction.azurewebsites.net/api/Function1?code=${process.env.REACT_APP_FUNC_KEY}`,
        {
          method: 'GET',
        }
      );

      const data = await emeraldGet<Order[]>(getOrders);

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchEmeraldOrderTypes(): Promise<void> {
    try {
      const getOrderTypes = new Request(
        `https://emeraldordertype.azurewebsites.net/api/Function1?code=${process.env.REACT_APP_ORDERTYPE_FUNC_KEY}`,
        {
          method: 'GET',
        }
      );

      const data = await emeraldGet<Order[]>(getOrderTypes);

      setOrderType(data);
    } catch (error) {
      console.log(error);
    }
  }

  function getEmeraldOrders(): Promise<Order[]> {
    return new Promise((resolve) => {
      if (orders.length > 0) {
        resolve(orders);
      }
    });
  }

  return {
    orders,
    orderTypes,
    newOrder,
    setNewOrder,
    setOrders,
    getEmeraldOrders,
    fetchEmeraldOrders,
  };
};

const EmeraldContext = React.createContext<ReturnType<typeof useOrders> | null>(null);

export const useEmeraldContext = () => React.useContext(EmeraldContext)!;

export function EmeraldProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
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
  if (withTime) return `${monthIndex + 1}/${day}/${year} ${time}`;
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

export function isLeapYear(yearSelected: number): boolean {
  const isLeapYearMade = yearSelected % 4 === 0;
  const AndEvenDivisible = yearSelected % 100 !== 0;
  const OrEvenDiv100 = yearSelected % 400 === 0;
  const isItEvenLeapYear = (isLeapYearMade && AndEvenDivisible) || OrEvenDiv100;
  return isItEvenLeapYear;
}

export function calculateDays(month: string, yearSelected: string): number {
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

export function isValidDate(day: any, month: any, year: any): boolean {
  return day <= calculateDays(month, year);
}

export function useMediaQuery(): number[] {
  const [screenSize, setScreenSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateScreenSize(): void {
      setScreenSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateScreenSize);
    updateScreenSize();
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
}

const MonthDays = { FullMonth: 31, Thirty: 30, NonLeapYear: 28, LeapYear: 29 };
Object.freeze(MonthDays);
