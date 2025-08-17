import { useDispatch } from "react-redux";
import { useState } from "react";
import { Modal, message } from "antd";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { deleteTheatre } from "../../api/theatreApi";

const DeleteTheatreModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedTheatre,
  setSelectedTheatre,
  getData,
}) => {
  const dispatch = useDispatch();

  const handleOk = async () => {
    try {
      dispatch(ShowLoading());
      const theatreId = selectedTheatre._id;
      const response = await deleteTheatre(theatreId);
      dispatch(HideLoading());
      if (response.success) {
        message.success("Theatre deleted successfully");
      }
      setIsDeleteModalOpen(false);
      getData();
    } catch (error) {
      dispatch(HideLoading());
      setIsDeleteModalOpen(false);
      message.error("Failed to delete movie");
    }
    setSelectedTheatre(null);
    setIsDeleteModalOpen(false);
    dispatch(HideLoading());
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedTheatre(null);
  };

  return (
    <Modal
      title="Delete Movie"
      open={isDeleteModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <p className="pt-3 fs-18">
        Are you sure you want to delete the movie "{selectedTheatre?.title}"?
      </p>
      <p className="pb-3 fs-18">
        This action cannot be undone. Please confirm to proceed with the
        deletion.
      </p>
    </Modal>
  );
};

export default DeleteTheatreModal;
