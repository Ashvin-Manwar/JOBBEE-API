const express = require("express");
const app = express();

const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

const errorMiddleware = require("./middlewares/errors");
const ErrorHandler = require("./utils/errorHandler");
const catchAsyncErrors = require("./middlewares/catchAsyncErrors");

//setting up config.env file variable
dotenv.config({ path: "./config/config.env" });

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down due to uncaught exception.");
  process.exit(1);
});

//connecting to database
connectDatabase();

//Setting up body parser
app.use(express.json());

//Importing all routes
const jobs = require("./routes/jobs");
const auth = require("./routes/auth");

app.use("/api/v1", jobs);
app.use("/api/v1", auth);

// Handle unhandled routes
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

// ??Middleware to handle errors
app.use(errorMiddleware);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(
    `Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
// Handling Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled promise rejection.");
  server.close(() => {
    process.exit(1);
  });
});

// console.log(gfjhedf);

//Creating own middleware
// const middleware = (req, res, next) => {
//   console.log("Hello from Middleware");
//   //setting up user variable globally
//   req.requestMethod = req.method;
//   next();
// };
// app.use(middleware);
