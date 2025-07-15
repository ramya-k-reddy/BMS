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
import { addMovie, updateMovie } from "../../api/movies";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { moment } from "moment";

const MovieForm = ({
  isModalOpen,
  setIsModalOpen,
  selectedMovie,
  setSelectedMovie,
  formType,
}) => {
  const dispatch = useDispatch();
  if (selectedMovie) {
    selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format(
      "YYYY-MM-DD"
    );
  }
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      if (formType === "add") {
        const response = await addMovie(values);
        message.success("Movie added successfully");
      } else {
        await updateMovie(selectedMovie._id, values);
        message.success("Movie updated successfully");
      }
      dispatch(HideLoading());
      setIsModalOpen(false);
      setSelectedMovie(null);
    } catch (error) {
      dispatch(HideLoading());
      message.error("Failed to process movie data");
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <Modal>
      <Form layout="vertical" initialValues={selectedMovie} onFinish={onFinish}>
        <Row gutter={(xs) => (xs.md ? 16 : 0)}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Please input the movie title!" },
              ]}
            >
              <Input placeholder="Enter movie title" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input the movie genre!" },
              ]}
            >
              <TextArea rows={4} placeholder="Enter movie description" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Movie duration(in minutes)"
                  name="duration"
                  rules={[
                    {
                      required: true,
                      message: "Please input the movie duration!",
                    },
                  ]}
                >
                  <Input placeholder="Enter movie duration" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Select Movie language"
                  name="language"
                  rules={[
                    {
                      required: true,
                      message: "Please select the movie language!",
                    },
                  ]}
                >
                  <Select placeholder="Select movie language">
                    <Select.Option value="English">English</Select.Option>
                    <Select.Option value="Hindi">Hindi</Select.Option>
                    <Select.Option value="Tamil">Tamil</Select.Option>
                    <Select.Option value="Telugu">Telugu</Select.Option>
                    <Select.Option value="Kannada">Kannada</Select.Option>
                    <Select.Option value="Malayalam">Malayalam</Select.Option>
                    <Select.Option value="Punjabi">Punjabi</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Release Date"
                  name="releaseDate"
                  rules={[
                    {
                      required: true,
                      message: "Please select the release date!",
                    },
                  ]}
                >
                  <Input type="date" placeholder="Select release date" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="Select Movie Genre"
                  name="genre"
                  rules={[
                    {
                      required: true,
                      message: "Please select the movie genre!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select movie genre"
                    options={[
                      { value: "Action", label: "Action" },
                      { value: "Comedy", label: "Comedy" },
                      { value: "Drama", label: "Drama" },
                      { value: "Horror", label: "Horror" },
                      { value: "Sci-Fi", label: "Sci-Fi" },
                      { value: "Romance", label: "Romance" },
                      { value: "Thriller", label: "Thriller" },
                      { value: "Animation", label: "Animation" },
                      { value: "Documentary", label: "Documentary" },
                    ]}
                  >
                    {" "}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  label="Poster URL"
                  name="poster"
                  rules={[
                    {
                      required: true,
                      message: "Please input the movie poster URL!",
                    },
                  ]}
                >
                  <Input placeholder="Enter movie poster URL" />
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

export default MovieForm;
