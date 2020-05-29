import express from 'express';
import UserController from './controllers/user';
import {
  validateSignup,
  returnValidationErrors,
  validateProject,
  validateUser,
} from './middlewares/validation';
import ProjectController from './controllers/project';

const router = express.Router();
router.route('/test').get((req, res) => {
  return res.status(200).json({
    message: 'Everything is ok',
  });
});

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
export default router;
