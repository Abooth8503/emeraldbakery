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
