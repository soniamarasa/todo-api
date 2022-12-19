import express from 'express';
import {
  renderTasks,
  filterListTasks,
  filterDateTasks,
  newTask,
  editTask,
  priority,
  deleteTask,
  deleteCompleted,
} from '../services/TaskService.js';
import {
  createAccount,
  login,
  logout,
  recoverPassword,
  resetPassword,
  getUser,
  updateUser,
  authorization,
} from '../services/userService.js';

const router = express.Router();

//User Routes

router.post('/createAccount', createAccount);
router.post('/login', login);
router.post('/logout', logout);
router.post('/retrievePassword', recoverPassword);
router.post('/resetPassword', authorization, resetPassword);
router.get('/user/:userId', authorization, getUser);
router.put('/updateUser/:id', authorization, updateUser);

//Tasks Routes

router.get('/getTasks/:userId', authorization, renderTasks);
router.get('/getTasks/:userId/:list', authorization, filterListTasks);
router.get('/getTasks/:userId/:date', authorization, filterDateTasks);
router.post('/postTask/:userId', authorization, newTask);
router.put('/editTask/:userId/:id', authorization, editTask);
router.put('/priority/:userId/:id', authorization, priority);
router.delete('/deleteTask/:userId/:id', authorization, deleteTask);
router.delete('/:userId/deleteCompleted', authorization, deleteCompleted);

export default router;
