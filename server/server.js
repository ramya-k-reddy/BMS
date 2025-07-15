const express = require("express");
const app = express();
require("dotenv").config();

const userRouter = require("./routes/userRoutes");

const connectDB = require("./config/db");
const movieRouter = require("./routes/movieRoutes");
const theatreRouter = require("./routes/theatreRoutes");
connectDB();

/* Routes*/
app.use("/api/users", userRouter);
// Middleware to parse JSON bodies
app.listen(8082, () => {
  console.log("Server is running on port 8082");
});

app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
