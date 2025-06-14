import React from 'react';
import {Button, Form, Input} from 'antd';
import {Link} from 'react-router-dom';

function Login() {
    return (
        <div>
            <main class ="App-header">
                <h1>Login to Book My Show</h1>
                <section className="mw-500 text-center px-3">
                <Form layout="vertical">
                    <Form.Item label="Email" name="email" rules={[{required: true, message: 'Please input your email!'}]}>
                        <Input type="email" placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{required: true, message: 'Please input your password!'}]}>
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Login</Button>
                </Form>
                <p>New User? <Link to="/register">Register here</Link></p>
                </section>
            </main>
                
        </div>
    );
}

export default Login;