import { useDispatch } from "react-redux";
import { useState } from "react";
import { Modal, message } from "antd";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { deleteMovie } from "../../api/movies";

const DeleteMovieModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedMovie,
  setSelectedMovie,
  getData,
}) => {
  const dispatch = useDispatch();

  const handleOk = async () => {
    try {
      dispatch(ShowLoading());
      await deleteMovie(selectedMovie._id);
      dispatch(HideLoading());
      message.success("Movie deleted successfully");
      setIsDeleteModalOpen(false);
      getData();
    } catch (error) {
      dispatch(HideLoading());
      setIsDeleteModalOpen(false);
      message.error("Failed to delete movie");
    }
    setSelectedMovie(null);
    setIsDeleteModalOpen(false);
    dispatch(HideLoading());
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <Modal
      title="Delete Movie"
      open={isDeleteModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <p className="pt-3 fs-18">
        Are you sure you want to delete the movie "{selectedMovie?.title}"?
      </p>
      <p className="pb-3 fs-18">
        This action cannot be undone. Please confirm to proceed with the
        deletion.
      </p>
    </Modal>
  );
};

export default DeleteMovieModal;
