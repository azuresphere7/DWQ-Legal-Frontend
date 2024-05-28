import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { OrderDetailProps } from "../../types/props";
import { OrderTableHeadCell } from "../../types/order";
import { orderHeadCells } from "../../config/static-data";
import { findOrderRecordValue } from "../../utils/functions";

const OrderDetailDialog = (props: OrderDetailProps) => {
  const { open, onClose, data } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Order Details</DialogTitle>

      <DialogContent>
        <table>
          <tbody>
            {
              data && orderHeadCells.map((headcell: OrderTableHeadCell) => (
                <tr key={headcell.id}>
                  <td className="pr-12 py-3">{headcell.label}</td>
                  <td>{findOrderRecordValue(headcell.id, data)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;