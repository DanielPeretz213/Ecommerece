//import {
//  Button,
//  Card,
//  DatePicker,
//  Form,
//  Input,
//  Select,
//  Typography,
//} from "antd";
//import React from "react";
//import { toast } from "react-toastify";
//
//interface PaymentFormValues {
//  firstName: string;
//  lastName: string;
//  checkIn: unknown;
//  checkOut: unknown;
//  email: string;
//  phone: string;
//  guests: number;
//  payment: string;
//}
//
//const Payment: React.FC = () => {
//  const { Title } = Typography;
//  const [form] = Form.useForm();
//
//  const handleSubmit = (values: PaymentFormValues) => {
//    toast.success("Payment was made successfully.")
//  };
//
//  return (
//    <div
//      className="paymentContainer"
//      style={{ display: "flex", justifyContent: "center" }}
//    >
//      <Card
//        style={{
//          width: "50%",
//          padding: "20px",
//          backgroundColor: "#bf8d47ff",
//          borderRadius: "15px",
//        }}
//      >
//        <Title level={2}>Booking Information</Title>
//
//        <Card style={{ padding: "20px" }}>
//          <Form layout="vertical" form={form} onFinish={handleSubmit}>
//            <Form.Item
//              label="First Name"
//              name="firstName"
//              rules={[{ required: true }]}
//            >
//              <Input placeholder="Enter your first name" />
//            </Form.Item>
//
//            <Form.Item
//              label="Last Name"
//              name="lastName"
//              rules={[{ required: true }]}
//            >
//              <Input placeholder="Enter your last name" />
//            </Form.Item>
//
//            <Form.Item
//              label="Check-in Date"
//              name="checkIn"
//              rules={[{ required: true }]}
//            >
//              <DatePicker style={{ width: "100%" }} />
//            </Form.Item>
//
//           <Form.Item
//             label="Check-out Date"
//             name="checkOut"
//             rules={[{ required: true }]}
//           >
//             <DatePicker style={{ width: "100%" }} />
//           </Form.Item>
//
//            <Form.Item
//              label="Email"
//              name="email"
//              rules={[
//                { required: true },
//                { type: "email", message: "Invalid email format" },
//              ]}
//            >
//              <Input placeholder="Enter email" />
//            </Form.Item>
//
//            <Form.Item
//              label="Phone Number"
//              name="phone"
//              rules={[{ required: true }]}
//            >
//              <Input placeholder="Enter phone number" />
//            </Form.Item>
//
//            <Form.Item
//              label="Number of Guests"
//              name="guests"
//              rules={[{ required: true }]}
//            >
//              <Input type="number" min={1} max={10} />
//            </Form.Item>
//
//            <Form.Item
//              label="Payments"
//              name="payment"
//              rules={[{ required: true }]}
//            >
//              <Select placeholder="Choose number of payments">
//                <Select.Option value="1">1 payment</Select.Option>
//                <Select.Option value="2">2 payments</Select.Option>
//                <Select.Option value="3">3 payments</Select.Option>
//                <Select.Option value="5">5 payments</Select.Option>
//                <Select.Option value="10">10 payments</Select.Option>
//              </Select>
//            </Form.Item>
//
//            <Button
//              type="primary"
//              htmlType="submit"
//              style={{ width: "100%", marginTop: "1rem" }}
//            >
//              Payment
//            </Button>
//          </Form>
//        </Card>
//      </Card>
//    </div>
//  );
//};
//
//export default Payment;
//

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Payment: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(1);
  const [payment, setPayment] = useState("");

  const handleSubmit = () => {
    toast.success("Payment was made successfully.");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" justifyContent="center">
        <Card
          sx={{ width: "50%", p: 3, borderRadius: 3, bgcolor: "#bf8d47ff" }}
        >
          <Typography variant="h5" mb={2}>
            Booking Information
          </Typography>

          <Card sx={{ p: 3 }}>
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              margin="normal"
            />

            <DatePicker
              label="Check-in Date"
              value={checkIn}
              onChange={(newValue) => {
                setCheckIn(newValue);
                if (
                  checkOut &&
                  newValue &&
                  checkOut.isBefore(newValue, "day")
                ) {
                  setCheckOut(null);
                }
              }}
              minDate={dayjs()}
              slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
            />

            <DatePicker
              label="Check-out Date"
              value={checkOut}
              onChange={(newValue) => setCheckOut(newValue)}
              minDate={checkIn ?? dayjs()}
              disabled={!checkIn}
              slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
            />

            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              margin="normal"
            />

            <TextField
              fullWidth
              type="number"
              label="Guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              margin="normal"
              inputProps={{ min: 1, max: 10 }}
            />

            <TextField
              select
              fullWidth
              label="Payments"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              margin="normal"
            >
              <MenuItem value="1">1 payment</MenuItem>
              <MenuItem value="2">2 payments</MenuItem>
              <MenuItem value="3">3 payments</MenuItem>
              <MenuItem value="5">5 payments</MenuItem>
              <MenuItem value="10">10 payments</MenuItem>
            </TextField>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              Payment
            </Button>
          </Card>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default Payment;
