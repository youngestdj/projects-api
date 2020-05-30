module.exports = (sequelize, DataTypes) => {
  const userSchema = {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exists',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
  const User = sequelize.define('User', userSchema, {});
  User.associate = (models) => {
    User.hasMany(models.Project, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Task, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
