import {
  col,
  Modal,
  Row,
  Form,
  Input,
  Button,
  Typography,
  Select,
  message,
  Col,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { addTheatre, updateTheatre } from "../../api/theatreApi";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { moment } from "moment";

const TheatreFormModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedTheatre,
  setSelectedTheatre,
  formType,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (formType === "add") {
        const response = await addTheatre({ ...values, owner: user._id });
      } else {
        values.theatreId = selectedTheatre._id;
        response = await updateTheatre({ values });
      }
      if (response.success) {
        message.success(response.message);
        setIsModalOpen(false);
      } else {
        message.error(response.message);
      }
      setIsModalOpen(false);
      setSelectedTheatre(null);
    } catch (error) {
      dispatch(HideLoading());
      message.error("Failed to process movie data");
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      centered
      open={isModalOpen}
      title={`${formType === "add" ? "Add Theatre" : "Update Theatre"}`}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        initialValues={selectedTheatre}
        onFinish={onFinish}
      >
        <Row gutter={(xs) => (xs.md ? 16 : 0)}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Theatre Name"
              name="title"
              rules={[
                { required: true, message: "Please input the Theatre name!" },
              ]}
            >
              <Input placeholder="Enter threatre name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input the Theatre address!",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Enter theatre address " />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input the email!",
                    },
                  ]}
                >
                  <Input type="email" placeholder="Enter email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Phone number "
                  name="Phone number"
                  rules={[
                    {
                      required: true,
                      message: "Phone number is required!",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Enter contact number" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit the Data
          </Button>
          <Button className="mt-2" onClick={() => setIsModalOpen(false)} block>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TheatreFormModal;
