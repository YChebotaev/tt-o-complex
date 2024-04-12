import { useMemo, type FC } from "react";
import type { Product as ProductType } from "@/lib/apiClient/types";
import { Product } from "./Product";
import { ProductSkeleton } from "./ProductSkeleton";

export const Products: FC<{ products: ProductType[] }> = ({ products }) => {
  const productsEls = useMemo(() => {
    if (products.length === 0) {
      return [0, 1].map(i => <ProductSkeleton key={i} />)
    }

    return products.map(({ id, image_url, title, description, price }) => (
      <Product
        key={id}
        id={id}
        imageUrl={image_url}
        title={title}
        description={description}
        price={price}
      />
    ));
  }, [products]);

  return (
    <div className="max-w-[1442px] m-auto p-[14px]">
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-[20px]">
        {productsEls}
      </div>
    </div>
  );
};
