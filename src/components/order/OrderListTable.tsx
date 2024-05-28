import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  LinearProgress,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";

import { orderHeadCells, orderType } from "../../config/static-data";
import { Order, OrderListType } from "../../types/order";
import { formatPhoneNumber } from "../../utils/functions";
import { EnhancedTableProps } from "../../types/props";
import { getOrderList } from "../../redux/actions/order.action";
import OrderDetailDialog from "./OrderDetailDialog";



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof OrderListType) => (event: React.MouseEvent<unknown>) => onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        {orderHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
            className="whitespace-nowrap"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const OrderListTable = ({ search }: { search: string }) => {
  const dispatch = useDispatch();
  const { isLoading, total, list } = useSelector(({ orderReducer }) => orderReducer);

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof OrderListType>("number");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<OrderListType>();

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof OrderListType) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    dispatch(getOrderList(rowsPerPage, newPage + 1));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: number = parseInt(event.target.value, 10);
    setRowsPerPage(newValue);
    setPage(0);
    dispatch(getOrderList(newValue, page + 1));
  };

  const visibleRows: any = React.useMemo(() =>
    stableSort(list, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ), [order, orderBy, page, rowsPerPage],
  );

  const handleDialogOpen = (record: OrderListType) => {
    setSelectedOrder(record);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  React.useEffect(() => {
    dispatch(getOrderList(rowsPerPage, page + 1));
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center w-full p-4">
        <h1 className="text-xl">Recent Orders</h1>

        {list.length > 0 && isLoading && <CachedIcon className="animate-spin" />}
      </div>

      {
        list.length === 0 && isLoading ? (
          <div className="flex justify-center w-full px-12 py-32">
            <LinearProgress className="w-96" />
          </div>
        ) : list.length > 0 ? (
          <Box className="w-full fade-up-anim anim-500">
            <Paper className="w-full mb-1">
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="orderListTable"
                >
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={list.length}
                  />

                  <TableBody>
                    {
                      visibleRows.map((row: OrderListType) => JSON.stringify(row).toLowerCase().includes(search.toLowerCase()) && (
                        <TableRow
                          key={row.number}
                          role="checkbox"
                          tabIndex={-1}
                          className="cursor-pointer"
                          onClick={() => handleDialogOpen(row)}
                          hover
                        >
                          <TableCell className="whitespace-nowrap">{row.number}</TableCell>
                          <TableCell className="whitespace-nowrap" align="right">{row.accountCode}</TableCell>
                          <TableCell className="whitespace-nowrap" align="right">
                            {orderType.map(type => type.value === row.type && type.label)}
                          </TableCell>
                          <TableCell className="whitespace-nowrap" align="right">{row.court}</TableCell>
                          <TableCell className="whitespace-nowrap" align="right">{row.causeNumber}</TableCell>
                          <TableCell className="whitespace-nowrap" align="right">{row.plaintiffs[0]}</TableCell>
                          <TableCell className="whitespace-nowrap" align="right">{row.defendants[0]}</TableCell>
                          <TableCell className="whitespace-nowrap" align="right">
                            {formatPhoneNumber(row.phoneNumber)}
                          </TableCell>
                          <TableCell className="whitespace-nowrap" align="right">{row.phoneCode}</TableCell>
                          <TableCell className="whitespace-nowrap" align="right">{row.startedAt}</TableCell>
                          <TableCell className="whitespace-nowrap" align="right">{row.updatedAt}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        ) : (
          <div className="flex flex-col items-center w-full">
            <img
              alt="placeholder"
              src="/assets/images/order/list-empty.png"
              width={200}
            />

            <h1 className="mt-8 text-lg text-center">
              The current order list is empty.<br />Please initiate the creation of a new order by clicking the designated button.
            </h1>
          </div>
        )
      }

      <OrderDetailDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        data={selectedOrder}
      />
    </div>
  );
};

export default OrderListTable;