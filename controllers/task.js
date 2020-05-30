import { Op } from 'sequelize';
import { Task, User, Project } from '../models';

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

  static generateFilters(query) {
    const {
      name,
      description,
      status,
      assignerName,
      assignerSurname,
      assigneeName,
      assigneeSurname,
      assigneeId,
      score,
    } = query;

    const taskFilter = {};
    if (name) taskFilter.name = name;
    if (description) taskFilter.description = description;
    if (status) {
      taskFilter.status = status;
      if (Array.isArray(status)) taskFilter.status = { [Op.or]: status };
    }
    if (assigneeId) taskFilter.userId = assigneeId;
    if (score) taskFilter.score = score;

    const assigneeFilter = {};
    if (assigneeId) assigneeFilter.id = assigneeId;
    if (assigneeName) assigneeFilter.name = assigneeName;
    if (assigneeSurname) assigneeFilter.surname = assigneeSurname;

    const assignerFilter = {};
    if (assignerName) assignerFilter.name = assignerName;
    if (assignerSurname) assignerFilter.surname = assignerSurname;

    return { taskFilter, assigneeFilter, assignerFilter };
  }

  /**
   * @description Get a list of tasks
   * @static
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @memberof TaskController
   * @returns {object} Class instance
   */
  static async getTasks(req, res) {
    const {
      taskFilter,
      assigneeFilter,
      assignerFilter,
    } = TaskController.generateFilters(req.query);

    try {
      const tasks = await Task.findAndCountAll({
        where: taskFilter,
        include: [
          {
            model: User,
            as: 'assignee',
            where: assigneeFilter,
            attributes: ['id', 'name', 'surname'],
          },
          {
            model: Project,
            include: [
              {
                model: User,
                as: 'assigner',
                where: assignerFilter,
                attributes: ['id', 'name', 'surname'],
              },
            ],
          },
        ],
      });
      return res.json({
        tasks,
      });
    } catch (err) {
      return res.json({
        err: [err.message],
      });
    }
  }
}
