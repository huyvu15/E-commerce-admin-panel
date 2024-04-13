"use client";
import React, { useState } from "react";
import { useGetAllProductsQuery } from "@/redux/product/productApi";
import ErrorMsg from "../../common/error-msg";
import ProductGridItem from "./product-grid-item";
import Pagination from "../../ui/Pagination";
import { Search } from "@/svg";
import Link from "next/link";

const ProductGridArea = () => {
  const { data: products, isError, isLoading } = useGetAllProductsQuery();
  const [currPage, setCurrPage] = useState<number>(1);
  const [countOfPage, setCountOfPage] = useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("");

  // search field
  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // handle select input
  const handleSelectField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && isError && products?.data.length === 0) {
    content = <ErrorMsg msg="No Products Found" />;
  }

  if (!isLoading && !isError && products?.success) {
    let productItems =[...products.data].reverse();
    const pageStart = (currPage - 1) * countOfPage;
    const pageEnd = pageStart + countOfPage;
    const displayedProducts = productItems.slice(pageStart, pageEnd);
    const totalPage = Math.ceil(productItems.length / countOfPage);

    // search field
    if (searchValue) {
      productItems = productItems.filter((p) =>
        p.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }


    content = (
      <>
        <div className="relative mx-8 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 ">
            {productItems.slice(pageStart, pageEnd).map((prd) => (
              <ProductGridItem key={prd._id} product={prd} />
            ))}
          </div>
        </div>

        {/* bottom  */}
        {productItems.length > countOfPage && <div className="flex justify-between items-center flex-wrap mx-8">
          <p className="mb-0 text-tiny">
            Showing {pageStart + 1}-{pageStart + displayedProducts.length} of{" "}
            {productItems.length}
          </p>
          <div className="pagination py-3 flex justify-end items-center mx-8">
            <Pagination
              currPage={currPage}
              totalPage={totalPage}
              setCurrPage={setCurrPage}
            />
          </div>
        </div>}
      </>
    );
  }
  return (
    <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
      <div className="tp-search-box flex items-center justify-between px-8 py-8 flex-wrap">
        <div className="search-input relative">
          <input
            onChange={handleSearchProduct}
            className="input h-[44px] w-full pl-14"
            type="text"
            placeholder="Search by product name"
          />
          <button className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme">
            <Search />
          </button>
        </div>
        <div className="flex sm:justify-end sm:space-x-6 flex-wrap">
          <div className="product-add-btn flex ">
            <Link href="/add-product" className="tp-btn">
              Add Product
            </Link>
          </div>
        </div>
      </div>
      {content}
    </div>
  );
};

export default ProductGridArea;
