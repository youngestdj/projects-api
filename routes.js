import express from 'express';
import UserController from './controllers/user';
import {
  validateSignup,
  returnValidationErrors,
  validateProject,
  validateUser,
  validateTask,
  validateProjectId,
} from './middlewares/validation';
import ProjectController from './controllers/project';
import TaskController from './controllers/task';

const router = express.Router();

router
  .route('/users')
  .post(validateSignup, returnValidationErrors, UserController.registerUser);

router
  .route('/projects')
  .post(
    validateProject,
    returnValidationErrors,
    validateUser,
    ProjectController.createProject
  );
router
  .route('/tasks')
  .post(
    validateTask,
    returnValidationErrors,
    validateUser,
    validateProjectId,
    TaskController.createTask
  )
  .get(TaskController.getTasks);
router.route('/users').get(UserController.getUsers);
export default router;
