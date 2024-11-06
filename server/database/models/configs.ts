import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export class Configs extends Model<
 Sequelize.InferAttributes<Configs>,
 Sequelize.InferCreationAttributes<Configs>
> {
   declare id: number;
   declare supportEmail?: string;
   declare createdAt?: Date;
   declare updatedAt?: Date;

   static initModel(sequelize: Sequelize.Sequelize): typeof Configs {
      return Configs.init({
      id: {
         autoIncrement: true,
         type: DataTypes.INTEGER.UNSIGNED,
         allowNull: false,
         primaryKey: true
      },

      supportEmail: {
         type: DataTypes.STRING(255),
         allowNull: true,
         field: 'support_email'
      },

      createdAt: {
         type: DataTypes.DATE,
         allowNull: true,
         field: 'created_at'
      },

      updatedAt: {
         type: DataTypes.DATE,
         allowNull: true,
         field: 'updated_at'
      },
   }, {
      sequelize,
      tableName: 'configs',
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      indexes: [
         {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
               { name: "id" },
            ]
         },
      ]
   });
   }

}
