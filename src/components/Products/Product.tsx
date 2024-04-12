import { type FC } from "react";
import Image from "next/image";
import { CartControl } from "./CartControl";

export const Product: FC<{
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
}> = ({ id, imageUrl, title, description, price }) => (
  <div className="flex flex-col rounded-[15px] bg-light-gray p-[10px] text-black">
    <div className="relative w-full h-[366px]">
      <Image className="w-full" src={imageUrl} layout="fill" alt="" />
    </div>
    <div className="text-[36px]">{title}</div>
    <div className="text-[24px] grow">{description}</div>
    <div className="text-[36px] text-center">Цена: {price}₽</div>
    <div className="p-[10px]">
      <CartControl id={id} price={price} />
    </div>
  </div>
);
