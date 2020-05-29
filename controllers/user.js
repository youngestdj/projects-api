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
        message: 'You have signed up successfully.',
        user,
      });
    } catch (err) {
      const errors = [];
      if (err.errors && err.errors[0].path === 'email') {
        errors.push(err.errors[0].message);
      }
      return res.status(409).json({
        errors,
      });
    }
  }

  /**
   * @description Get a list of users
   * @static
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @memberof UserController
   * @returns {object} Class instance
   */
  static async getUsers(req, res) {
    const {
      query: { name, surname },
    } = req;
    const filterParams = {};
    if (name) filterParams.name = name;
    if (surname) filterParams.surname = surname;

    try {
      const users = await User.findAndCountAll({
        where: Object.keys(filterParams).length ? filterParams : {},
      });
      return res.status(200).json({
        users,
      });
    } catch (err) {
      return res.status(500).json({
        errors: ['Something went wrong'],
      });
    }
  }
}
