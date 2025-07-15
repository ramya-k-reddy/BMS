import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/users";

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      await LoginUser(values);
      // Handle successful login, e.g., redirect to home page or show success message
      message.success("Login successful!");
      localStorage.setItem("token", values.data); // Assuming token is returned in values
      navigate("/");
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
      console.error("Login failed:", error);
    }
  };
  return (
    <div>
      <main class="App-header">
        <h1>Login to Book My Show</h1>
        <section className="mw-500 text-center px-3">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
          <p>
            New User? <Link to="/register">Register here</Link>
          </p>
        </section>
      </main>
    </div>
  );
}

export default Login;
