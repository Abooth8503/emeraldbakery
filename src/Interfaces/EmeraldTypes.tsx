import * as React from 'react';

export interface Order {
  id: number;
  name: string;
  area: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  ordertype: string;
  quantity: number;
  description: string;
  deliverydate: Date;
  orderdate: Date;
  prepaid: boolean;
}

const useOrders = (initial: Order[] = []) => {
  const [orders, setOrders] = React.useState<Order[]>(initial);
  const [newOrder, setNewOrder] = React.useState<string>('');

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
