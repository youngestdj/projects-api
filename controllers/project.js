import { Project } from '../models';

/**
 * @class ProjectController
 * @override
 * @export
 */
export default class ProjectController {
  /**
   * @description Create a new project
   * @static
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @memberof ProjectController
   * @returns {object} Class instance
   */
  static async createProject(req, res) {
    const {
      body: { body, name, status, userId },
    } = req;
    try {
      const project = await Project.create({ body, name, status, userId });
      return res.status(201).json({
        message: 'Project added successfully.',
        project,
      });
    } catch (err) {
      return res.status(409).json({
        err,
      });
    }
  }
}
