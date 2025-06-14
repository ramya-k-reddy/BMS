import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { RegisterUser } from '../../api/users'; 

function Register() {
    const onFinish = async (values) => {
        try {
            const response = await RegisterUser(values);
            if (response.success) {
                message.success(response.message);
                // Redirect to login or home page
            } else {
                message.error(response.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            message.error(error.message || 'Registration failed. Please try again.');
        }
    };
    return (
        <div style={{ maxWidth: 400, margin: "40px auto" }}>
            <h1>Register to Book My Show</h1>
            <Form
                layout="vertical"
                name="register"
                onFinish={onFinish}
            >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
        </div>
    );
}
export default Register;