module.exports = (sequelize, DataTypes) => {
  const taskSchema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
  const Task = sequelize.define('Task', taskSchema, {});
  Task.associate = (models) => {
    Task.belongsTo(models.Project, {
      foreignKey: 'projectId',
    });
    Task.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Task;
};
