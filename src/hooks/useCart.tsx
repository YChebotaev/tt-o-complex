import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type FC,
  type ReactNode,
} from "react";
import { useLocalStorage } from "./useLocalStorage";

export type CartApiItem = {
  id: number;
  quantity: number;
};

export type CartApi = {
  items: CartApiItem[];
  incr(id: number): void;
  decr(id: number): void;
  setQuantity(id: number, quantity: number): void;
};

const context = createContext<CartApi | null>(null);

export const useCart = () => useContext(context)!;

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useLocalStorage<CartApiItem[]>("cartItems", [], {
    parse: (json) => JSON.parse(json),
    stringify: (items) => JSON.stringify(items),
  });
  const updateQuantity = useCallback(
    (id: number, updateFn: (quantity: number) => number) => {
      setItems((items) => {
        items = [...items];
        let item = items.find((it) => it.id === id);

        if (item) {
          item.quantity = updateFn(item.quantity);
        } else {
          item = {
            id,
            quantity: updateFn(0),
          };

          items.push(item);
        }

        if (item.quantity <= 0) {
          const index = items.findIndex((it) => it.id === id);

          items.splice(index, 1);
        }

        return items;
      });
    },
    [],
  );
  const setQuantity = useCallback(
    (id: number, quantity: number) => {
      updateQuantity(id, () => quantity);
    },
    [updateQuantity],
  );
  const decr = useCallback(
    (id: number) => {
      updateQuantity(id, (q) => q - 1);
    },
    [updateQuantity],
  );
  const incr = useCallback(
    (id: number) => {
      updateQuantity(id, (q) => q + 1);
    },
    [updateQuantity],
  );
  const api = useMemo(
    () => ({ items, decr, incr, setQuantity }),
    [items, decr, incr, setQuantity],
  );

  return <context.Provider value={api}>{children}</context.Provider>;
};
