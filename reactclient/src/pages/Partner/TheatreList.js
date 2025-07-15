import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Radio } from "antd";
import TheatreFormModal from "./TheatreFormModal";
import DeleteTheatreModal from "./DeleteTheatreModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { getAllTheatre } from "../../api/theatre";
import { useSelector, useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";

function TheatreList() {
  const { user } = useSelector((state) => state.users);
  const [selectedTheatre, setSelectedTheatres] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [theatre, setTheatre] = useState(null);
  const [formType, setFormType] = useState("add");
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllTheatre(user.id);
      dispatch(HideLoading());
      if (response.success) {
        setTheatre(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.error("Error fetching theatres:", error);
      message.error("Failed to fetch theatres. Please try again later.");
    }
  };
  return (
    <div>
      <h2>🎭 Theatre List</h2>
    </div>
  );
}

export default TheatreList;
