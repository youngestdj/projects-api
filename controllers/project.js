import { Op } from 'sequelize';
import { Project, Task, User } from '../models';

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
   * @returns {object} Json respose
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

  static generateFilters(query) {
    const {
      name,
      body,
      status,
      assignerName,
      assignerSurname,
      assigneeName,
      assigneeSurname,
      assigneeId,
      taskScore,
    } = query;

    const projectFilter = {};
    if (name) projectFilter.name = name;
    if (body) projectFilter.body = body;
    if (status) {
      projectFilter.status = status;
      if (Array.isArray(status)) projectFilter.status = { [Op.or]: status };
    }
    if (assigneeId) projectFilter.userId = assigneeId;

    const assigneeFilter = {};
    if (assigneeId) assigneeFilter.id = assigneeId;
    if (assigneeName) assigneeFilter.name = assigneeName;
    if (assigneeSurname) assigneeFilter.surname = assigneeSurname;

    const assignerFilter = {};
    if (assignerName) assignerFilter.name = assignerName;
    if (assignerSurname) assignerFilter.surname = assignerSurname;

    return { projectFilter, assigneeFilter, assignerFilter, taskScore };
  }

  /**
   * @description Get a list of projects
   * @static
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @memberof ProjectController
   * @returns {object} Json response
   */
  static async getProjects(req, res) {
    const {
      projectFilter,
      assignerFilter,
      assigneeFilter,
      taskScore,
    } = ProjectController.generateFilters(req.query);

    try {
      const projects = await Project.findAndCountAll({
        where: projectFilter,
        include: [
          {
            model: User,
            as: 'assigner',
            where: assignerFilter,
            attributes: ['id', 'name', 'surname'],
          },
          {
            model: Task,
            ...(taskScore && { where: { score: taskScore } }),
            include: [
              {
                model: User,
                as: 'assignee',
                where: assigneeFilter,
                attributes: ['id', 'name', 'surname'],
              },
            ],
          },
        ],
        distinct: true,
      });
      return res.status(200).json({
        projects,
      });
    } catch (err) {
      return res.status(500).json({
        err: [err.message],
      });
    }
  }
}
