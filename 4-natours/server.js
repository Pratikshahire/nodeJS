const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("db connection successful!");
  });

// console.log(process.env);
// console.log(process.env.NODE_ENV);

console.log(app.get("env"));
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});

//Handling unhandled rejections
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION 💥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

