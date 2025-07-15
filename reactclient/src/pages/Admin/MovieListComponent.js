import React, { use, useEffect, useState } from "react";
import { Table, Button } from "antd";
import MovieForm from "./MovieForm";
import DeleteMovieModal from "./DeleteMovieModal";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import {
  getAllMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../../api/movies";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

function MovieList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formType, setFormType] = useState("add");
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, data) => {
        return <img width={50} height={50} src={data.poster} alt={text} />;
      },
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      key: "releaseDate",
      render: (text, data) => {
        return moment(data.releaseDate).format("MM-DD-YYY");
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text) => `${text} mins`,
    },
    {
      title: "Language",
      dataIndex: "Language",
      key: "Language",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, data) => (
        <div className="d-flex gap-2">
          <Button
            onClick={() => {
              setSelectedMovie(data);
              setFormType("edit");
              setIsModalOpen(true);
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            onClick={() => {
              setSelectedMovie(data);
            }}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const fakeMovies = [
    {
      key: "1",
      title: "Deadpool",
      description: "A fun and action-packed superhero movie.",
      duration: "2h 1m",
      genre: "Action",
      Language: "English",
      releaseDate: "2023-01-01",
      rating: 4.5,
    },
    {
      key: "2",
      title: "Inception",
      description: "A mind-bending thriller that explores dreams.",
      duration: "2h 28m",
      genre: "Sci-Fi",
      Language: "English",
      releaseDate: "2023-02-15",
      rating: 4.8,
    },
  ];

  const getData = async () => {
    dispatch(ShowLoading());
    const response = await getAllMovies();
    const allMovies = response.data.map((movie) => ({
      ...movie,
      key: movie._id, // Assuming _id is the unique identifier for each movie
    }));
    setMovies(allMovies);
    dispatch(HideLoading());
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2>Movie List</h2>
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setFormType("add");
        }}
      >
        Add Movie
      </Button>
      <Table dataSource={fakeMovies} columns={columns} rowKey="key" />
      {isModalOpen && (
        <MovieForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
          setFormType={setFormType}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMovieModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}
    </div>
  );
}

export default MovieList;
