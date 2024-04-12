import { useCart } from "@/hooks/useCart";
import { type FC } from "react";

export const CartControl: FC<{ id: number; price: number }> = ({
  id,
  price,
}) => {
  const { items, incr, decr, setQuantity } = useCart();
  const item = items.find((it) => it.id === id);
  const inCart = Boolean(item);

  if (inCart && item) {
    return (
      <div className="flex gap-[5px]">
        <button
          className="border-0 rounded-[15px] bg-dark-gray w-full p-[20px] text-[43px] text-lightest-gray"
          onClick={(e) => {
            e.preventDefault();

            decr(id);
          }}
        >
          -
        </button>
        <input
          value={item.quantity}
          type="number"
          className="border-0 rounded-[15px] bg-dark-gray w-full p-[20px] text-[36px] text-center text-lightest-gray"
          onChange={(e) => {
            const value = e.target.valueAsNumber;

            setQuantity(id, value);
          }}
        />
        <button
          className="border-0 rounded-[15px] bg-dark-gray w-full p-[20px] text-[43px] text-lightest-gray"
          onClick={(e) => {
            e.preventDefault();

            incr(id);
          }}
        >
          +
        </button>
      </div>
    );
  } else {
    return (
      <button
        className="border-0 rounded-[15px] bg-dark-gray w-full p-[20px] text-[36px] text-lightest-gray"
        onClick={(e) => {
          e.preventDefault();

          incr(id);
        }}
      >
        Купить
      </button>
    );
  }
};
