import { Task } from '../models';

/**
 * @class TaskController
 * @override
 * @export
 */
export default class TaskController {
  /**
   * @description Create a new task
   * @static
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @memberof TaskController
   * @returns {object} Class instance
   */
  static async createTask(req, res) {
    const {
      body: { description, name, status, score, userId, projectId },
    } = req;
    try {
      const task = await Task.create({
        description,
        name,
        status,
        score,
        userId,
        projectId,
      });
      return res.status(201).json({
        message: 'Task added successfully.',
        task,
      });
    } catch (err) {
      return res.status(409).json({
        err,
      });
    }
  }
}
