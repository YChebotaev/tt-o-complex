"use client";

import dynamic from "next/dynamic";
import { PageHeader } from "@/components/PageHeader";
import { Products } from "@/components/Products";
import { Reviews } from "@/components/Reviews";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useEffect } from "react";

const Cart = dynamic(() => import("@/components/Cart").then((m) => m.Cart), {
  ssr: false,
});

export default function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    page_size?: string;
  };
}) {
  const page = Number(searchParams?.page ?? 1);
  const pageSize = Number(searchParams?.page_size ?? 50);
  const {
    data: { pages } = { pages: [], pageParams: [{ page, pageSize }] },
    isLoading,
    fetchNextPage,
  } = useGetProducts({
    page,
    pageSize,
  });
  const products = pages.flatMap(({ products }) => products);

  useEffect(() => {
    const handleScroll = () => {
      if (isLoading) return;

      const scrolledTo = window.scrollY + window.innerHeight;
      const isReachBottom = document.body.scrollHeight === scrolledTo;
      const isLastPage = pages[pages.length - 1].amount < pageSize;

      if (isReachBottom && !isLastPage) {
        fetchNextPage();
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, pages, pageSize, fetchNextPage]);

  return (
    <>
      <PageHeader>Тестовое задание</PageHeader>
      <Reviews />
      <Cart products={products} />
      <Products products={products} />
    </>
  );
}
