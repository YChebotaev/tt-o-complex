import { useState, type FC, type FormEvent } from "react";
import { InputMask } from "@react-input/mask";
import type { Product } from "@/lib/apiClient/types";
import { useCart } from "@/hooks/useCart";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "@/hooks/useApiClient";
import { onlyDigits } from "@/lib/apiClient/onlyDigits";
import { SuccessModal } from "./SuccessModal";

export const Cart: FC<{ products: Product[] }> = ({ products }) => {
  const apiClient = useApiClient();
  const { items } = useCart();
  const [phone, setPhone] = useLocalStorage("phone", "");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { mutate } = useMutation({
    async mutationFn() {
      return apiClient.createOrder({
        phone: onlyDigits(phone),
        cart: items,
      });
    },
    onSuccess({ success, error }) {
      switch (success) {
        case 0: {
          setModalOpen(true);

          break;
        }
        case 1: {
          setPhoneError(error!);

          break;
        }
      }
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPhoneError(null);

    const isPhoneValid = isValidPhoneNumber(phone);

    if (!isPhoneValid) {
      setPhoneError("Неверный формат номера телефона");

      return;
    }

    setModalOpen(true);

    // mutate();
  };

  return (
    <div className="max-w-[1442px] m-auto p-[14px] mt-[250px]">
      <div className="flex items-center justify-center text-black">
        <div className="rounded-[15px] bg-light-gray p-[10px]">
          <form onSubmit={handleSubmit}>
            <div className="text-[36px]">Добавленные товары</div>
            {items.length === 0 && <div>Нет товаров</div>}
            {items.length > 0 && (
              <div>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Название</th>
                      <th>Количество</th>
                      <th>Цена</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(({ id, quantity }) => {
                      const product = products.find((it) => it.id === id);

                      if (!product) return null;

                      return (
                        <tr key={id}>
                          <td>{product.title}</td>
                          <td>x{quantity}</td>
                          <td>{product.price * quantity}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {items.length > 0 && (
              <div className="flex gap-[10px]">
                <div>
                  <InputMask
                    showMask
                    value={phone}
                    mask="+7 ___ ___-__-__"
                    replacement={{ _: /\d/ }}
                    className="block border-0 rounded-[15px] bg-dark-gray w-full p-[20px] text-[36px] text-center text-lightest-gray min-w-[360px]"
                    onChange={(e) => {
                      const value = e.target.value;

                      setPhone(value);
                    }}
                  />
                  {phoneError && (
                    <div className="text-red-600">{phoneError}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="border-0 rounded-[15px] bg-dark-gray w-full p-[20px] text-[36px] text-lightest-gray"
                >
                  Заказать
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      {modalOpen && <SuccessModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};
