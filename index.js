const express = require("express");
const cors = require('cors')

require("./src/db/mongoose");


const userRouter = require("./src/routers/user");
const taskRouter = require("./src/routers/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("server is up on port ", port);
});
