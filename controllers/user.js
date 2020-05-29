import { User } from '../models';

/**
 * @class UserController
 * @override
 * @export
 */
export default class UserController {
  /**
   * @description Create a new user
   * @static
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @memberof UserController
   * @returns {object} Class instance
   */
  static async registerUser(req, res) {
    const {
      body: { email, name, surname },
    } = req;
    try {
      const user = await User.create({ email, name, surname });
      return res.status(201).json({
        message: 'You have signed up successfully',
        user,
      });
    } catch (err) {
      return res.status(409).json({
        err,
      });
    }
  }
}
