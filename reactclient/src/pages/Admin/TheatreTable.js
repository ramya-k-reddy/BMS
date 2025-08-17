import React, { useState, useEffect } from "react";
import { getAllTheatre } from "../../api/theatreApi";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { message, Button } from "antd";
import { isAction } from "@reduxjs/toolkit";
import { title } from "process";
import { text } from "body-parser";

function TheatreTable() {
  const { theatres, setTheatres } = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllTheatresForAdmin();
      dispatch(HideLoading());
      if (response.success) {
        const allTheatres = response.data;
        setTheatres(
          allTheatres.map((theatre) => ({
            ...theatre,
            key: `theatre${theatre._id}`,
          }))
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
  const handleStatusChange = async (theatreId, status) => {
    try {
      dispatch(ShowLoading());
      const values = {
        ...theatre,
        theatreId: theatreId,
        isActive: !theatre.isActive,
      };
      const response = await updateTheatre(values);
      console.log("Response from update:", response);
      if (response.success) {
        message.success("Theatre status updated successfully");
        getData();
        dispatch(HideLoading());
      } else {
        message.error(response.message);
      }

      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error("Failed to update theatre status");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (text, record) => {
        return record.owner ? record.owner.name : "N/A";
      },
      key: "owner",
    },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => {
        return record.isActive ? "Approved" : "Pending/Blocked";
      },
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          {record.isActive ? (
            <Button onClick={handleStatusChange(record)}> Block </Button>
          ) : (
            <Button onClick={handleStatusChange(record)}> Approve </Button>
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
      {theatres && theatres.length > 0 ? (
        <Table dataSource={theatres} columns={columns} />
      ) : (
        <div>No theatres available</div>
      )}
    </div>
  );
}

export default TheatreTable;
