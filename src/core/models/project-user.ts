import { Model } from "sequelize";

interface ProjectUserAttributes {
  id?: number | string;
  projectId: number | string;
  userId: number | string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class ProjectUser extends Model<ProjectUserAttributes> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      ProjectUser.belongsTo(models.user);
      ProjectUser.belongsTo(models.project);
    }
  }
  ProjectUser.init(
    {
      projectId: DataTypes.UUID,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "project_user",
    }
  );
  return ProjectUser;
};
