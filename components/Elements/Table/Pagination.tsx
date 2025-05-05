import React, { FC } from "react";
import ReactPaginate from "react-paginate";

interface IProps {
  pageCount: number;
  handlePageClick: (e: any) => void;
}

/**
 * @author
 * @function @Pagination
 **/

const Pagination: FC<IProps> = ({ pageCount, handlePageClick }) => {
  return (
    <div className="flex justify-end mt-10">
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >>"
        onPageChange={(e) => handlePageClick(e)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<< Prev"
        containerClassName="pagination-list"
        disabledLinkClassName="cursor-not-allowed"
        activeLinkClassName="active"
        className="flex text-[#010D3E] font-semibold gap-2"
      />
    </div>
  );
};

export default Pagination;
