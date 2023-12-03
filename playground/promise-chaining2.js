require("../src/db/mongoose");
const Task = require("../src/models/task");

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("652e933d3c693a3c38623b9a")
  .then((count) => {
    console.log("result", count);
  })
  .catch((e) => {
    console.log("e", e);
  });
