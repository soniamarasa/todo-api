import TaskModel from '../models/TaskModel.js';

const renderTasks = async (req, res) => {
  const userId = req.params.userId;
  try {
    const getTasks = await TaskModel.find({
      userId: userId,
    });
    res.send(getTasks);
  } catch (error) {
    res.send(500).send({
      message: 'An error occurred while searching for Tasks.' + error,
    });
  }
};

const filterListTasks = async (req, res) => {
  let filterList = req.params.list;
  const userId = req.params.userId;
  filterList.toString();

  try {
    const getTasks = await TaskModel.find({
      userId: userId,
      where: filterList,
    });
    if (!getTasks) {
      res.send({ message: 'No Tasks found' });
    } else {
      res.send(getTasks);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occurred while searching for tasks' + error });
  }
};

const filterDateTasks = async (req, res) => {
    let filterDate = req.params.list;
    const userId = req.params.userId;
    filterList.toString();
  
    try {
      const getTasks = await TaskModel.find({
        userId: userId,
        where: filterList,
      });
      if (!getTasks) {
        res.send({ message: 'No Tasks found' });
      } else {
        res.send(getTasks);
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: 'An error occurred while searching for tasks' + error });
    }
  };

const newTask = async (req, res) => {
  const { name, list, date, description } = req.body;
  const userId = req.params.userId;
  let Task;
  let TasksArray = [];
  for (let i = 0; i < where.length; i++) {
    Task = new TaskModel({
      userId,
      name,
      list,
      date,
      description,
      priority: false,
      completed: false,
    });
    TasksArray.push(Task);

    try {
      await Task.save();
    } catch (error) {
      res.status(500).send({
        message: 'An error occurred while registering the Task.' + error,
      });
    }
  }
  res.send(TasksArray);
};

const editTask = async (req, res) => {
  const userId = req.params.userId;
  const id = req.params.id;
  const { description, type, where, obs } = req.body;

  const TaskEdit = {
    description,
    type,
    where,
    obs,
    userId,
  };

  try {
    const Task = await TaskModel.findById({
      _id: id,
    });
    if (Task.userId !== userId) {
      return res
        .status(500)
        .send({ message: 'You do not have permission to edit this Task.' });
    }

    const TaskEdited = await TaskModel.findByIdAndUpdate(
      {
        _id: id,
      },
      TaskEdit,
      {
        new: true
      }
    );

    if (!TaskEdited) {
      res.send({
        message: 'Task not found.',
      });
    } else {
      res.send(TaskEdited);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occurred while editing the Task.' + error });
  }
};

const priority = async (req, res) => {
  const userId = req.params.userId;
  const id = req.params.id;
  const { priority } = req.body;

  const TaskClassUpdate = {
    priority
  };

  try {
    const Task = await TaskModel.findById({
      _id: id,
    });
    if (Task.userId !== userId) {
      return res.status(500).send({
        message:
          'You do not have permission to change the status of this task.',
      });
    }
    const classUpdate = await TaskModel.findByIdAndUpdate(
      {
        _id: id,
      },
      TaskClassUpdate,
      {
        new: true,
      }
    );

    if (!classUpdate) {
      res.send({
        message: 'Task not found.',
      });
    } else {
      res.send(classUpdate);
    }
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while updating the status.' + error,
    });
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  const userId = req.params.userId;

  try {
    const Task = await TaskModel.findById({
      _id: id,
    });
    if (Task.userId !== userId) {
      return res.status(500).send({
        message: "You don't have permission to delete this Task.",
      });
    }

    const dataId = await TaskModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Task not found.',
      });
    } else {
      res.send({ message: 'Successfully deleted Task!' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occurred while deleting the Task.' + error });
  }
};

const deleteCompleted = async (req, res) => {
  const userId = req.userId;

  try {
    await TaskModel.deleteMany({ userId: userId, completed: true });
    res.send({ message: 'Tasks were successfully deleted' });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occurred while deleting the tasks' + error });
  }
};

export {
  renderTasks,
  filterListTasks,
  filterDateTasks,
  newTask,
  editTask,
  priority,
  deleteTask,
  deleteCompleted,
};
