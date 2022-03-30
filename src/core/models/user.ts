import { Model } from "sequelize";

interface UserAttributes {
  id?: number | string;
  email: string;
  password: string;
  fullname: string;
  projectId: number | string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      User.belongsToMany(models.project, {through: 'project_user', foreignKey: "userId"})
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullname: DataTypes.STRING,
      projectId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return User;
};
