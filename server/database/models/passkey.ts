import * as Sequelize from "sequelize";
import { DataTypes, Model, CreationOptional } from "sequelize";

export class Passkey extends Model<
  Sequelize.InferAttributes<Passkey>,
  Sequelize.InferCreationAttributes<Passkey>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare passkeyId: number;
  declare credential: string;
  declare device?: string;
  declare createdAt: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Passkey {
    return Passkey.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },

        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "user_id",
        },

        passkeyId: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        credential: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        device: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        tableName: "passkey",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
