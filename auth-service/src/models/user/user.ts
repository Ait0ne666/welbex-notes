import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../database/db";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {

    declare id: CreationOptional<number>;
    declare password: string;
    declare email: string;
    declare createdAt: Date;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: Date | null;
}


User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
      createdAt: {
          type:DataTypes.DATE,
          allowNull: false
        },
      updatedAt: DataTypes.DATE,
      deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null
      }

    },
    {
      tableName: 'users',
      sequelize: sequelize 
    }
  );


export default User