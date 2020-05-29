import express from 'express';
import UserController from './controllers/user';
import {
  validateSignup,
  returnValidationErrors,
} from './middlewares/validation';

const router = express.Router();
router.route('/test').get((req, res) => {
  return res.status(200).json({
    message: 'Everything is ok',
  });
});

router
  .route('/users')
  .post(validateSignup, returnValidationErrors, UserController.registerUser);
export default router;
