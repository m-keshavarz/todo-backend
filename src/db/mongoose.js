const mongoose = require("mongoose");

mongoose.connect(
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/task-manager-api",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
