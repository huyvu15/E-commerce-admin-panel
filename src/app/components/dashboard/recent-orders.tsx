"use client";
import React, { useState } from "react";
import ErrorMsg from "../common/error-msg";
import TableItem from "./table-item";
import TableHead from "./table-head";
import Pagination from "../ui/Pagination";
import { useGetRecentOrdersQuery } from "@/redux/order/orderApi";
import Link from "next/link";

const RecentOrders = () => {
  const [currPage, setCurrPage] = useState(1);
  const [countOfPage, setCountOfPage] = useState(5);
  const { data: recentOrders, isError, isLoading } = useGetRecentOrdersQuery();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }

  if (!isLoading && !isError && recentOrders?.orders) {
    const totalPage = Math.ceil(recentOrders?.orders.length / countOfPage);
    const pageStart = (currPage - 1) * countOfPage;
    content = (
      <>
        <table className="w-full text-base text-left text-gray-500">
          <TableHead />
          <tbody>
            {recentOrders?.orders
              .slice(pageStart, pageStart + countOfPage)
              .map((order) => (
                <TableItem key={order._id} order={order} />
              ))}
          </tbody>
        </table>
        {/*  */}
        {recentOrders.orders.length > countOfPage && <div className="px-4 pt-6 border-t border-gray6">
          <div className="flex flex-col justify-between sm:flex-row">
            <span className="flex items-center uppercase">
              Showing 1-
              {recentOrders?.orders.slice(pageStart, pageStart + countOfPage).length} {" "}
              of {recentOrders?.orders.length}
            </span>
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
    <>
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="bg-white p-8 col-span-12 xl:col-span-12 2xl:col-span-12 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium tracking-wide text-slate-700 text-lg mb-0 leading-none">
              Recent Orders
            </h3>
            <Link
              href="/orders"
              className="leading-none text-base text-info border-b border-info border-dotted capitalize font-medium hover:text-info/60 hover:border-info/60"
            >
              View All
            </Link>
          </div>

          {/* table */}
          <div className="overflow-scroll 2xl:overflow-visible">
            <div className="w-[700px] 2xl:w-full">{content}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentOrders;
