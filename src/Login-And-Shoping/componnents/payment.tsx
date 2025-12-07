import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
} from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Payment: React.FC = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div
      className="paymentContainer"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Card
        style={{
          width: "50%",
          padding: "20px",
          backgroundColor: "#bf8d47ff",
          borderRadius: "15px",
        }}
      >
        <Title level={2}>Booking Information</Title>

        <Card style={{ padding: "20px" }}>
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter your first name" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter your last name" />
            </Form.Item>

            <Form.Item
              label="Check-in Date"
              name="checkIn"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Check-out Date"
              name="checkOut"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>

            <Form.Item
              label="Number of Guests"
              name="guests"
              rules={[{ required: true }]}
            >
              <Input type="number" min={1} max={10} />
            </Form.Item>

            <Form.Item
              label="Payments"
              name="payment"
              rules={[{ required: true }]}
            >
              <Select placeholder="Choose number of payments">
                <Select.Option value="1">1 payment</Select.Option>
                <Select.Option value="2">2 payments</Select.Option>
                <Select.Option value="3">3 payments</Select.Option>
                <Select.Option value="5">5 payments</Select.Option>
                <Select.Option value="10">10 payments</Select.Option>
              </Select>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Payment
            </Button>
          </Form>
        </Card>
      </Card>
    </div>
  );
};

export default Payment;
