import React from "react";
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Divider,
} from "@mui/material";

interface ModalInvoiceProps {
  open: boolean;
  onClose: () => void;
  invoiceData: {
    payment_id: string;
    date: string;
    description: string;
    listPrice: number;
    discount: number;
    salePrice: number;
    total: number;
    customerName: string;
  };
}

const ModalInvoice: React.FC<ModalInvoiceProps> = ({
  open,
  onClose,
  invoiceData,
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="invoice-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          overflow: "auto",
          maxHeight: "90vh",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Box>
            <img src="/bt_logo2.png" alt="logo" width="300" />
          </Box>
          <Box textAlign="left">
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
              INVOICE
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
              <strong>Invoice:</strong> {invoiceData.payment_id}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
              <strong>Date:</strong> {invoiceData.date.slice(0, 10)}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
              <strong>Place:</strong> 01 Vo Van Ngan St, Thu Duc city, VN
            </Typography>
          </Box>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Thông tin nhà cung cấp và người nhận */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
              Provided by:
            </Typography>
            <Typography>BrightOra</Typography>
            <Typography>01 Vo Van Ngan St</Typography>
            <Typography>Thu Duc city, VN</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
              Provided to:
            </Typography>
            <Typography>{invoiceData.customerName}</Typography>
          </Grid>
        </Grid>

        {/* Bảng thông tin hóa đơn */}
        <TableContainer component={Paper} sx={{ border: "1px solid #ddd" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  DESCRIPTION
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  LIST PRICE
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  DISCOUNT
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  SALE PRICE
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  TOTAL
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{invoiceData.description}</TableCell>
                <TableCell align="right">
                  {invoiceData.listPrice.toFixed(2).toLocaleString()} USD
                </TableCell>
                <TableCell align="right">
                  {((invoiceData.discount / 100) * invoiceData.listPrice)
                    .toFixed(2)
                    .toLocaleString()}{" "}
                  USD
                </TableCell>
                <TableCell align="right">
                  {invoiceData.salePrice.toFixed(2).toLocaleString()} USD
                </TableCell>
                <TableCell align="right">
                  {invoiceData.total.toFixed(2).toLocaleString()} USD
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Total
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  {invoiceData.total.toFixed(2).toLocaleString()} USD
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            textAlign: "right",
            mt: 3,
            fontStyle: "italic",
            color: "gray",
          }}
        >
          <Typography variant="body2">
            Thank you for choosing BrightOra!
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalInvoice;
