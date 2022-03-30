import { Model } from "sequelize";

interface CustomerAttributes {
  id?: number | string;
  name: string;
  info: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Customer extends Model<CustomerAttributes> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Customer.hasMany(models.project, { foreignKey: "customerId" });
    }
  }
  Customer.init(
    {
      name: DataTypes.STRING,
      info: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "customer",
    }
  );
  return Customer;
};
