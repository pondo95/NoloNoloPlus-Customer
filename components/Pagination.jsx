import React, { useEffect, useState, useMemo } from "react";
import Pagination from "react-bootstrap/Pagination";
import "../styles/Pagination.module.css";
import styles from "../styles/Pagination.module.css";

function PaginationComponent({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  handlePageClick,
  handleCurrentPage,
}) {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(total);
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return pages;
  }, [totalPages, currentPage, handlePageClick]);

  if (totalPages === 0) return null;

  return (
    <Pagination className={styles.container}>
      
      <style>
        {`
          .pagination > li > a
          {
              background-color: white;
              color: #222;
          }
          
          .pagination > li > a:focus,
          .pagination > li > a:hover,
          .pagination > li > span:focus,
          .pagination > li > span:hover
          {
              color: #222;
              background-color: #lightgray;
              border-color: #lightgray;
          }
          
          .pagination > .active > span
          {
              color: white;
              background-color: #222 !Important;
              border: solid 1px #222 !Important;
          }
        `}
      </style>
      <Pagination.Prev
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {paginationItems}
      <Pagination.Next
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}

export default PaginationComponent;
