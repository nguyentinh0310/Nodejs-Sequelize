import { Model } from "sequelize";

interface ProjectAttributes {
  id?: number | string;
  name:  string;
  description:  string;
  startDate: string
  customerId: string | number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Project extends Model<ProjectAttributes> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Project.belongsTo(models.customer)
      Project.belongsToMany(models.user, {through: 'project_user'})
    }
  }
  Project.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      startDate: DataTypes.STRING,
      customerId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "project",
    }
  );
  return Project;
};
