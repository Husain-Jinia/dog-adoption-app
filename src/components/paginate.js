import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
    onPageChange(selectedPage);
  };

  return (
    <ReactPaginate
    previousLabel={<p className=" text-xl text-slate-100 font-sans ">Previous</p>}
    nextLabel={<p className=" text-xl text-slate-100 font-sans  ">Next</p>}
    breakLabel={<span className="px-3">...</span>}
    breakClassName={"break-me"}
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={handlePageClick}
    containerClassName={"flex justify-center items-center space-x-2"}
    pageClassName={"cursor-pointer rounded-full hover:bg-slate-500  py-1 px-3"}
    pageLinkClassName={"focus:outline-none"}
    previousClassName={"cursor-pointer  hover:border-2 rounded hover:border-slate-300   mx-4 hover:bg-slate-300 py-1 px-3"}
    nextClassName={"cursor-pointer  hover:border-2 rounded hover:border-slate-300  mx-4 hover:bg-slate-300  py-1 px-3"}
    previousLinkClassName={"focus:outline-none"}
    nextLinkClassName={"focus:outline-none"}
    activeClassName={"bg-slate-400 text-white"}
    disabledClassName={"cursor-not-allowed"}
    />
  );
};

export default Pagination;