import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";
import { Grid } from "@mui/material";
import React from "react";

const CustomTablePagination = ({
  dataCount,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const TablePaginationActions = () => {
    return (
      <Pagination
        color="primary"
        count={Math.ceil(dataCount / rowsPerPage)}
        page={page + 1}
        onChange={(e, num) => handleChangePage(e, num - 1)}
      />
    );
  };
  const FakeTablePaginationActions = () => {
    return <></>;
  };

  return (
    <Grid
      container
      sx={{
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Grid item>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100, 500, 1000]}
          component="div"
          count={dataCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, page) => handleChangePage(e, page)}
          onRowsPerPageChange={(e) => {
            handleChangeRowsPerPage(e);
          }}
          ActionsComponent={FakeTablePaginationActions}
        />
      </Grid>
      <Grid item>
        <TablePaginationActions />
      </Grid>
    </Grid>
  );
};

export default CustomTablePagination;
