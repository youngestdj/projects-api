module.exports = (sequelize, DataTypes) => {
  const projectSchema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['active', 'inactive', 'declined', 'completed'],
      defaultValue: 'inactive',
    },
  };
  const Project = sequelize.define('Project', projectSchema, {});
  Project.associate = (models) => {
    Project.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'assigner',
    });
    Project.hasMany(models.Task, {
      foreignKey: 'projectId',
      onDelete: 'CASCADE',
    });
  };
  return Project;
};
