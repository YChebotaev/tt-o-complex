import { useEffect, type FC } from "react";

export const SuccessModal: FC<{ onClose(): void }> = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, []);

  return (
    <div className="fixed f-full h-full inset-0 flex items-center justify-center z-10 bg-[#00000066]">
      <div className="flex flex-col rounded-[15px] bg-light-gray p-[10px] text-black">
        <div className="text-[42px] p-4">Заказ успешно создан!</div>
        <div>
          <button
            className="border-0 rounded-[15px] bg-dark-gray w-full p-[20px] text-[43px] text-lightest-gray"
            onClick={(e) => {
              e.preventDefault();

              onClose();
            }}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
