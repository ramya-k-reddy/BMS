import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Radio, Table } from "antd";
import TheatreFormModal from "./TheatreFormModal";
import DeleteTheatreModal from "./DeleteTheatreModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllTheatre } from "../../api/theatreApi";
import { useSelector, useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { all } from "axios";

function TheatreList() {
  const { user } = useSelector((state) => state.users);
  const [selectedTheatre, setSelectedTheatres] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [theatre, setTheatre] = useState(null);
  const [formType, setFormType] = useState("add");
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllTheatre(user.id);
      dispatch(HideLoading());
      if (response.success) {
        const allTheatres = response.data;
        setTheatre(
          allTheatres.map(function (theatre) {
            return { ...theatre, key: theatre._id };
          })
        );
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.error("Error fetching theatres:", error);
      message.error("Failed to fetch theatres. Please try again later.");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => {
        if (record.isActive === false) {
          return "Pending/Blocked";
        } else if (record.isActive === true) {
          return "Approved";
        }
      },
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <div>
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setSelectedTheatres(record);
              setFormType("edit");
              setIsModalOpen(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              setSelectedTheatres(record);
              setIsDeleteModalOpen(true);
            }}
          />
          {record.isActive && (
            <Button
              onClick={() => {
                setSelectedTheatres(record);
                setIsShowModalOpen(true);
              }}
            >
              Shows
            </Button>
          )}
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-end">
        <Button
          type="primary"
          onClick={() => {
            setFormType("add");
            setIsModalOpen(true);
          }}
        >
          {" "}
          Add Theatre
        </Button>
        <Table dataSource={theatre} columns={columns} />
        {isModalOpen && (
          <TheatreFormModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            selectedTheatre={selectedTheatre}
            formType={formType}
            getData={getData}
            setSelectedTheatres={setSelectedTheatres}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteTheatreModal
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            selectedTheatre={selectedTheatre}
            getData={getData}
            setSelectedTheatres={setSelectedTheatres}
          />
        )}
      </div>
    </>
  );
}

export default TheatreList;
