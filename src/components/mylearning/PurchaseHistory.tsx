import React, { useEffect, useState } from "react";
import { getPurchaseHistory } from "../../services/PaymentService"; // Giả sử bạn đã có service này
import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
} from "@mui/material";
import SearchBar from "../navbar/SearchBar";

// Interface cho dữ liệu payment
interface ICourseInfoPage {
  title: string;
  thumbnail: string;
  owner: {
    first_name: string;
    last_name: string;
  };
}

interface IPayment {
  course: ICourseInfoPage;
  course_id: string;
  created_at: string;
  discount?: number;
  owner: string;
  payment_price: number;
  paypal_id: string;
  price: number;
  updated_at: string;
  _id: string;
}

const PurchaseHistory: React.FC = () => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const [purchaseHistory, setPurchaseHistory] = useState<
    IPayment[] | undefined
  >([]); // Lưu trữ lịch sử thanh toán
  const [searchQuery, setSearchQuery] = useState<string>(""); // Lưu trữ từ khoá tìm kiếm

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        const data = await getPurchaseHistory(token); // Gọi service để lấy dữ liệu
        console.log("Purchase History:", data.data.payments); // Kiểm tra dữ liệu trả về
        setPurchaseHistory(data.data.payments); // Cập nhật state với dữ liệu
      } catch (error) {
        console.error("Error fetching purchase history", error);
      }
    };
    fetchData();
  }, [token]);

  // Handle tìm kiếm
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Lọc các giao dịch thanh toán dựa trên title khóa học
  const filteredPayments = purchaseHistory?.filter((payment) =>
    payment.course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: 0 }}>
      {/* Thanh tìm kiếm */}
      <Box
        sx={{
          mb: 2,
          width: "200px",
          backgroundColor: "white",
          borderRadius: 1,
          ml: "auto",
          display: "block",
        }}
      >
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{ boxShadow: "none", border: "none" }}
      >
        <Table sx={{ borderCollapse: "collapse" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  borderBottom: "1px solid #ddd", // Viền dưới
                }}
              >
                Course
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  borderBottom: "1px solid #ddd", // Viền dưới
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  borderBottom: "1px solid #ddd", // Viền dưới
                }}
              >
                Total Price
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  borderBottom: "1px solid #ddd", // Viền dưới
                }}
              >
                Payment method
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayments?.map((payment, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    borderBottom: "1px solid #ddd", // Viền dưới
                    borderLeft: "none", // Không có viền trái
                    borderRight: "none", // Không có viền phải
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={payment.course.thumbnail}
                      alt={payment.course.title}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {payment.course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {payment.course.owner.first_name}{" "}
                        {payment.course.owner.last_name}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "1px solid #ddd",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                >
                  {new Date(payment.created_at).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "1px solid #ddd",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                >
                  ${payment.payment_price.toFixed(3).toLocaleString()}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "1px solid #ddd",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                >
                  Paypal{" "}
                  {/* Hoặc bạn có thể thay thế theo phương thức thanh toán cụ thể */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PurchaseHistory;
