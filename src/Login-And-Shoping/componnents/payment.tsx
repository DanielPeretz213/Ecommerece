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
                const dayjsValue = newValue ? dayjs(newValue) : null;
                setCheckIn(dayjsValue);

                if (
                  checkOut &&
                  dayjsValue &&
                  checkOut.isBefore(dayjsValue, "day")
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
              onChange={(newValue) =>
                setCheckOut(newValue ? dayjs(newValue) : null)
              }
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
