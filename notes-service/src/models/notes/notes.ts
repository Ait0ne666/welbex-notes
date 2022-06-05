import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../database/db";

class Note extends Model<InferAttributes<Note>, InferCreationAttributes<Note>> {

    declare id: CreationOptional<number>;
    declare userId: number;
    declare text: string;
    declare title: string | null;
    declare createdAt: Date;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: Date | null;
}


Note.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      text: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
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
      tableName: 'notes',
      sequelize: sequelize 
    }
  );


export interface NewNote {
    userId: number;
    text: string;
    title?: string;
}

export interface UpdateNote {
    text?: string;
    title?: string;
}


export default Note