import React from "react";
import { Next, Prev } from "@/svg";

interface PaginationProps {
  totalPage: number;
  currPage: number;
  setCurrPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ totalPage, currPage, setCurrPage }: PaginationProps) => {
  const getItemProps = (index: number) =>
    ({
      variant: currPage === index ? "filled" : "text",
      color: currPage === index ? "blue" : "blue-gray",
      onClick: () => setCurrPage(index),
      className: "rounded-full",
    } as any);

  const next = () => {
    if (currPage === totalPage) return;

    setCurrPage(currPage + 1);
  };

  const prev = () => {
    if (currPage === totalPage) return;

    setCurrPage(currPage - 1);
  };
  return (
    <div className="flex justify-end items-center gap-4">
      <button
        className="rounded-md w-10 h-10 text-center leading-[33px] border border-gray last:mr-0 hover:bg-theme hover:text-white hover:border-theme inline-block p-0"
        onClick={prev}
        disabled={currPage === 1}
      >
        <Prev/>
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((n) => (
          <button key={n} {...getItemProps(n)} className="pagination-btn text-base inline-block rounded-md w-10 h-10 text-center leading-[33px] border border-gray last:mr-0 hover:bg-theme hover:text-white hover:border-theme">
            {n}
          </button>
        ))}
      </div>
      <button
        className="rounded-md w-10 h-10 text-center leading-[33px] border border-gray last:mr-0 hover:bg-theme hover:text-white hover:border-theme p-0 inline-block"
        onClick={next}
        disabled={currPage === totalPage}
      >
        <Next/>
      </button>
    </div>
  );
};

export default Pagination;
