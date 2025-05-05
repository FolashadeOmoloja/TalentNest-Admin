"use client";
import Table from "./Table";
import { useEffect, useState } from "react";
import { Column } from "react-table";

const MainTable = <T extends object>({
  columns,
  data,
  borderNone = "",
}: {
  columns: Column<T>[];
  data: T[];
  borderNone?: string;
}) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;
  const lastPage = Math.ceil(data.length / itemsPerPage) - 1;

  useEffect(() => {
    if (page > lastPage) {
      setPage(lastPage);
    }
  }, [data.length, page, itemsPerPage]);

  const currentPageData = data.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const displayTotalPages =
    currentPageData.length === 0 ? totalPages - 1 : totalPages;

  return (
    <>
      <Table
        data={currentPageData}
        columns={columns}
        setPage={setPage}
        totalPages={displayTotalPages > 1 ? displayTotalPages : 0}
        borderNone={borderNone}
      />
    </>
  );
};

export default MainTable;
