"use client";

import * as React from "react";
import { styled } from "@mui/system";
import TablePagination, {
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { reportData } from "@/app/apis";

export default function Table(props: { rowData: reportData[] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rowData.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (props.rowData[0] == undefined) {
    return <h1>No Data Fetched Yet</h1>;
  }

  const columnNames = Object.keys(props.rowData[0]);

  return (
    <Root sx={{ maxWidth: "100%" }}>
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            {columnNames.map((propertyName, index) => (
              <th key={index}>{propertyName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? props.rowData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : props.rowData
          ).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columnNames.map((propertyName, cellIndex) => (
                <td key={cellIndex} align="right">
                  {row[propertyName]}
                </td>
              ))}
            </tr>
          ))}
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={columnNames.length} />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={columnNames.length}
              count={props.rowData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  "aria-label": "props.rowData per page",
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </Root>
  );
}

const grey = {
  200: "#d0d7de",
  800: "#32383f",
  900: "#24292f",
};

const Root = styled("div")(
  ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  }
  `
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;
